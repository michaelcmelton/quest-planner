import type { QuestsData } from '../types/quests';

export class QuestDAG {
    private graph: Map<string, Set<string>>;
    private quests: QuestsData;

    constructor(quests: QuestsData) {
        this.quests = quests;
        this.graph = new Map();
        this.buildGraph();
    }

    private buildGraph() {
        // Initialize graph with all quests as nodes
        Object.keys(this.quests).forEach(questId => {
            this.graph.set(questId, new Set());
        });

        // Add edges based on prerequisites
        Object.entries(this.quests).forEach(([questId, quest]) => {
            if (quest.requirements.quests) {
                quest.requirements.quests.forEach(prereq => {
                    if (this.graph.has(prereq)) {
                        this.graph.get(questId)!.add(prereq);
                    }
                });
            }
        });
    }

    /**
     * Checks if a given quest route is a valid topological sort of the DAG
     * @param route Array of quest IDs in the order they are to be completed
     * @returns { isValid: boolean, errors: string[] }
     */
    validateRoute(route: string[]): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];
        const completed = new Set<string>();

        for (let i = 0; i < route.length; i++) {
            const questId = route[i];
            const prerequisites = this.graph.get(questId);

            if (!prerequisites) {
                errors.push(`Quest ${questId} not found in quest database`);
                continue;
            }

            // Check if all prerequisites are completed
            for (const prereq of prerequisites) {
                if (!completed.has(prereq)) {
                    errors.push(`Quest ${questId} requires ${prereq} to be completed first`);
                }
            }

            completed.add(questId);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Returns all quests that can be completed next based on completed quests
     * @param completed Set of completed quest IDs
     * @returns Array of quest IDs that can be completed next
     */
    getAvailableQuests(completed: Set<string>): string[] {
        const available: string[] = [];

        for (const [questId, prerequisites] of this.graph.entries()) {
            if (completed.has(questId)) continue;

            let canComplete = true;
            for (const prereq of prerequisites) {
                if (!completed.has(prereq)) {
                    canComplete = false;
                    break;
                }
            }

            if (canComplete) {
                available.push(questId);
            }
        }

        return available;
    }
} 