import type { Quest } from '../types/quest';

interface GraphNode {
    id: string;
    quest: Quest;
}

interface GraphEdge {
    from: string;
    to: string;
}

export class QuestGraph {
    private nodes: Map<string, GraphNode>;
    private edges: GraphEdge[];

    constructor() {
        this.nodes = new Map();
        this.edges = [];
    }

    addQuest(quest: Quest): void {
        this.nodes.set(quest.id, { id: quest.id, quest });
        
        // Add edges for prerequisites
        quest.requirements.quests.forEach((prereqId: string) => {
            this.edges.push({ from: prereqId, to: quest.id });
        });
    }

    getNode(id: string): GraphNode | undefined {
        return this.nodes.get(id);
    }

    getNodes(): GraphNode[] {
        return Array.from(this.nodes.values());
    }

    getEdges(): GraphEdge[] {
        return [...this.edges];
    }

    hasCycles(): boolean {
        const visited = new Set<string>();
        const recursionStack = new Set<string>();

        const hasCycleUtil = (nodeId: string): boolean => {
            if (recursionStack.has(nodeId)) return true;
            if (visited.has(nodeId)) return false;

            visited.add(nodeId);
            recursionStack.add(nodeId);

            const outgoingEdges = this.edges.filter(edge => edge.from === nodeId);
            for (const edge of outgoingEdges) {
                if (hasCycleUtil(edge.to)) return true;
            }

            recursionStack.delete(nodeId);
            return false;
        };

        for (const node of this.nodes.values()) {
            if (!visited.has(node.id) && hasCycleUtil(node.id)) {
                return true;
            }
        }

        return false;
    }

    isValidSequence(sequence: string[]): boolean {
        const completedQuests = new Set<string>();

        for (const questId of sequence) {
            const node = this.getNode(questId);
            if (!node) return false;

            // Check if all prerequisites are completed
            const prerequisites = node.quest.requirements.quests;
            const missingPrerequisites = prerequisites.filter((prereq: string) => !completedQuests.has(prereq));
            
            if (missingPrerequisites.length > 0) {
                return false;
            }

            completedQuests.add(questId);
        }

        return true;
    }

    getMissingPrerequisites(sequence: string[]): string[] {
        const completedQuests = new Set<string>();
        const missingPrerequisites = new Set<string>();

        for (const questId of sequence) {
            const node = this.getNode(questId);
            if (!node) continue;

            const prerequisites = node.quest.requirements.quests;
            prerequisites.forEach((prereq: string) => {
                if (!completedQuests.has(prereq)) {
                    missingPrerequisites.add(prereq);
                }
            });

            completedQuests.add(questId);
        }

        return Array.from(missingPrerequisites);
    }
} 