/**
 * Utility functions for handling quest dependencies as a Directed Acyclic Graph (DAG)
 */

import type { Quest } from '$lib/types/quest';

interface QuestNode {
    quest: Quest;
    dependencies: Set<string>; // Quest IDs that this quest depends on
    dependents: Set<string>;   // Quest IDs that depend on this quest
}

export class QuestGraph {
    private nodes: Map<string, QuestNode>;

    constructor(quests: Quest[]) {
        this.nodes = new Map();
        
        // Initialize nodes
        for (const quest of quests) {
            this.nodes.set(quest.id, {
                quest,
                dependencies: new Set(),
                dependents: new Set()
            });
        }

        // Build dependency relationships
        for (const quest of quests) {
            if (quest.requirements?.quests) {
                for (const req of quest.requirements.quests) {
                    const questId = req.id;
                    if (this.nodes.has(questId)) {
                        this.nodes.get(quest.id)!.dependencies.add(questId);
                        this.nodes.get(questId)!.dependents.add(quest.id);
                    }
                }
            }
        }
    }

    /**
     * Validates that the quest requirements are met for a given set of completed quests
     * @param completedQuestIds Set of completed quest IDs
     * @param questId The quest to validate
     * @returns true if all requirements are met, false otherwise
     */
    validateRequirements(completedQuestIds: Set<string>, questId: string): boolean {
        const node = this.nodes.get(questId);
        if (!node) return false;

        // Check if all dependencies are completed
        for (const depId of node.dependencies) {
            if (!completedQuestIds.has(depId)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Gets all quests that can be started with the current set of completed quests
     * @param completedQuestIds Set of completed quest IDs
     * @returns Array of quest IDs that can be started
     */
    getAvailableQuests(completedQuestIds: Set<string>): string[] {
        const available: string[] = [];

        for (const [questId, node] of this.nodes) {
            if (!completedQuestIds.has(questId) && this.validateRequirements(completedQuestIds, questId)) {
                available.push(questId);
            }
        }

        return available;
    }

    /**
     * Gets all quests that depend on a given quest
     * @param questId The quest ID to check
     * @returns Array of quest IDs that depend on the given quest
     */
    getDependentQuests(questId: string): string[] {
        const node = this.nodes.get(questId);
        return node ? Array.from(node.dependents) : [];
    }

    /**
     * Gets all quests that the given quest depends on
     * @param questId The quest ID to check
     * @returns Array of quest IDs that the given quest depends on
     */
    getDependencyQuests(questId: string): string[] {
        const node = this.nodes.get(questId);
        return node ? Array.from(node.dependencies) : [];
    }

    /**
     * Checks if there are any circular dependencies in the quest graph
     * @returns true if there are circular dependencies, false otherwise
     */
    hasCircularDependencies(): boolean {
        const visited = new Set<string>();
        const recursionStack = new Set<string>();

        const hasCycle = (questId: string): boolean => {
            if (!visited.has(questId)) {
                visited.add(questId);
                recursionStack.add(questId);

                const node = this.nodes.get(questId);
                if (node) {
                    for (const depId of node.dependencies) {
                        if (!visited.has(depId) && hasCycle(depId)) {
                            return true;
                        } else if (recursionStack.has(depId)) {
                            return true;
                        }
                    }
                }
            }

            recursionStack.delete(questId);
            return false;
        };

        for (const questId of this.nodes.keys()) {
            if (hasCycle(questId)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Gets a topological sort of the quest graph
     * @returns Array of quest IDs in a valid completion order
     */
    getTopologicalSort(): string[] {
        const visited = new Set<string>();
        const temp = new Set<string>();
        const order: string[] = [];

        const visit = (questId: string): void => {
            if (temp.has(questId)) {
                throw new Error('Circular dependency detected');
            }

            if (!visited.has(questId)) {
                temp.add(questId);
                const node = this.nodes.get(questId);
                if (node) {
                    for (const depId of node.dependencies) {
                        visit(depId);
                    }
                }
                temp.delete(questId);
                visited.add(questId);
                order.push(questId);
            }
        };

        for (const questId of this.nodes.keys()) {
            if (!visited.has(questId)) {
                visit(questId);
            }
        }

        return order;
    }
}
