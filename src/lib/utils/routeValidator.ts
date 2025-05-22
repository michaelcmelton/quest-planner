import type { QuestsData } from '../types/quests';
import quests from '../data/quests.json';

export class RouteValidator {
    private quests: QuestsData;
    private globaldag: Map<string, string[]>;

    constructor() {
      this.quests = quests;
      this.globaldag = new Map();

      for (const quest of Object.values(this.quests)) {
        this.globaldag.set(quest.id, quest.requirements.quests);
      }

      if (this.hasCycle()) {
        throw new Error('Cycle detected in quest dependencies');
      }      
    }

    private hasCycle() {
      const visited = new Set<string>();
      const onPath = new Set<string>();

      const visit = (questId: string) => {
        if (onPath.has(questId)) {
          return true;
        }

        if (visited.has(questId)) {
          return false;
        }

        visited.add(questId);
        onPath.add(questId);

        for (const dependency of this.globaldag.get(questId) || []) {
          if (visit(dependency)) {
            return true;
          }
        }

        onPath.delete(questId);
        return false;
      };

      for (const questId of this.globaldag.keys()) {
        if (visit(questId)) {
          return true;
        }
      }

      return false;
    }


  /**
   * Check if a user's route is valid based on quest prerequisites.
   * @param route An array of quest IDs in the order the user plans to complete them.
   * @returns An object with valid: boolean and optionally errors: string[].
   */
  public validateUserRoute(route: string[]): { valid: boolean; errors?: string[] } {
    const completed = new Set<string>();
    const errors: string[] = [];

    for (const questId of route) {
      if (!this.globaldag.has(questId)) {
        errors.push(`Quest "${questId}" does not exist.`);
        continue;
      }

      const prerequisites = this.globaldag.get(questId) || [];
      for (const prereq of prerequisites) {
        if (!completed.has(prereq)) {
          errors.push(`Quest "${questId}" requires prerequisite "${prereq}" to be completed first.`);
        }
      }
      completed.add(questId);
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    } else {
      return { valid: true };
    }
  }

  /**
   * Generate alternative routes based on quest dependencies.
   * @param limit Maximum number of alternative routes to generate.
   * @returns An array of alternative route arrays.
   */
   generateAlternativeRoutes(limit = 3): string[][] {
    const inDegree = new Map<string, number>();
    for (const node of this.globaldag.keys()) inDegree.set(node, 0);
    for (const neighbors of this.globaldag.values()) {
      for (const neigh of neighbors) {
        inDegree.set(neigh, (inDegree.get(neigh) || 0) + 1);
      }
    }

    const result: string[][] = [];
    const visited = new Set<string>();
    const current: string[] = [];

    const backtrack = () => {
      if (result.length >= limit) return;

      if (current.length === this.globaldag.size) {
        result.push([...current]);
        return;
      }

      for (const node of this.globaldag.keys()) {
        if (!visited.has(node) && (inDegree.get(node) || 0) === 0) {
          // Choose
          visited.add(node);
          current.push(node);
          for (const neigh of this.globaldag.get(node) || []) {
            inDegree.set(neigh, (inDegree.get(neigh) || 0) - 1);
          }

          backtrack();

          // Undo
          visited.delete(node);
          current.pop();
          for (const neigh of this.globaldag.get(node) || []) {
            inDegree.set(neigh, (inDegree.get(neigh) || 0) + 1);
          }
        }
      }
    };

    backtrack();
    return result;
  }

}