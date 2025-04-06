import type { Quest } from "../types/quest";

export class QuestGraph {
  private nodes: Map<string, Quest>;
  private edges: Map<string, Set<string>>;
  private questRoute: Quest[];
  
  constructor(questRoute: Quest[]) {
    this.nodes = new Map();
    this.edges = new Map();
    this.questRoute = questRoute;

    for (const quest of questRoute) {
      this.nodes.set(quest.id, quest);
      this.edges.set(quest.id, new Set(quest.requirements.quests));
    }
  }

  hasCircularDependencies(): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = (questId: string): boolean => {
      if (recursionStack.has(questId)) return true;
      if (visited.has(questId)) return false;

      visited.add(questId);
      recursionStack.add(questId);

      const dependencies = this.edges.get(questId) || new Set();
      for (const dep of dependencies) {
        if (dfs(dep)) return true;
      }

      recursionStack.delete(questId);
      return false;
    };

    for (const questId of this.nodes.keys()) {
      if (dfs(questId)) return true;
    }

    return false;
  }

  /**
   * Generates a valid topological order for the quests
   * @returns Array of quest IDs in valid topological order
   */
  getTopologicalOrder(): string[] {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const order: string[] = [];

    const visit = (questId: string): boolean => {
      if (temp.has(questId)) return false; // Cycle detected
      if (visited.has(questId)) return true;

      temp.add(questId);
      const quest = this.nodes.get(questId);
      
      if (quest) {
        for (const reqId of quest.requirements.quests) {
          if (!visit(reqId)) return false;
        }
      }

      temp.delete(questId);
      visited.add(questId);
      order.push(questId);
      return true;
    };

    for (const questId of this.nodes.keys()) {
      if (!visited.has(questId)) {
        if (!visit(questId)) {
          throw new Error('Quest requirements contain a cycle');
        }
      }
    }

    return order.reverse();
  }

  /**
   * Finds all quests in a route that violate their requirements
   * @param route - Array of quest IDs in the proposed order
   * @returns Array of objects containing the violating quest and its missing requirements
   */
  findInvalidQuests(route: Quest[]): Array<{
    questId: string;
    missingRequirements: string[];
  }> {
    const positionMap = new Map<string, number>();
    route.forEach((quest, index) => {
      positionMap.set(quest.id, index);
    });

    const invalidQuests: Array<{
      questId: string;
      missingRequirements: string[];
    }> = [];

    for (const quest of route) {
      const questId = quest.id;

      const missingRequirements: string[] = [];
      const currentPosition = positionMap.get(questId);

      // Check each requirement
      for (const requiredQuestId of quest.requirements.quests) {
        const requiredPosition = positionMap.get(requiredQuestId);
        
        // If required quest is not in the route or comes after current quest
        if (requiredPosition === undefined || requiredPosition > currentPosition!) {
          missingRequirements.push(requiredQuestId);
        }
      }

      if (missingRequirements.length > 0) {
        invalidQuests.push({
          questId,
          missingRequirements
        });
      }
    }

    return invalidQuests;
  }

  /**
   * Validates the entire quest graph structure
   * @returns Object containing validation result and details about any cycles found
   */
  validateGraphStructure(): {
    hasCycles: boolean;
    cycles: string[][];  // Array of quest ID arrays representing cycles
  } {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const cycles: string[][] = [];

    const dfs = (questId: string, path: string[]): boolean => {
      if (recursionStack.has(questId)) {
        // Found a cycle, add it to cycles array
        const cycleStart = path.indexOf(questId);
        cycles.push(path.slice(cycleStart));
        return true;
      }
      if (visited.has(questId)) return false;

      visited.add(questId);
      recursionStack.add(questId);
      path.push(questId);

      const quest = this.nodes.get(questId);
      if (quest) {
        for (const dep of quest.requirements.quests) {
          dfs(dep, [...path]);
        }
      }

      recursionStack.delete(questId);
      path.pop();
      return false;
    };

    for (const questId of this.nodes.keys()) {
      if (!visited.has(questId)) {
        dfs(questId, []);
      }
    }

    return {
      hasCycles: cycles.length > 0,
      cycles
    };
  }

  /**
   * Validates if a given quest route is in a valid topological order
   * @param route - Array of quest IDs in the proposed order
   * @returns Object containing validation result and details about invalid quests
   */
  validateRouteWithDetails(route: Quest[]): {
    isValid: boolean;
    invalidQuests: Array<{
      questId: string;
      missingRequirements: string[];
    }>;
    hasCycles: boolean;
    cycles?: string[][];
  } {
    // First check for cycles in the graph
    const graphValidation = this.validateGraphStructure();
    
    // Then check the specific route
    const invalidQuests = this.findInvalidQuests(route);

    return {
      isValid: invalidQuests.length === 0 && !graphValidation.hasCycles,
      invalidQuests,
      hasCycles: graphValidation.hasCycles,
      cycles: graphValidation.cycles
    };
  }
}

