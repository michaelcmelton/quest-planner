export interface QuestRouteNode {
    id: string;
    questId: string;
    customNote?: string;
}

export interface QuestRouteState {
    nodes: QuestRouteNode[];
    isValid: boolean;
    validationErrors: string[];
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const nodes = $state<QuestRouteNode[]>([]);
const isValid = $derived(true); // TODO: Implement validation logic
const validationErrors = $derived<string[]>([]); // TODO: Implement validation errors

export const questRoute = {
    subscribe: (callback: (state: QuestRouteState) => void) => {
        // Initial call
        callback({
            nodes,
            isValid,
            validationErrors
        });

        // Setup effect for reactivity
        $effect(() => {
            callback({
                nodes,
                isValid,
                validationErrors
            });
        });

        // Return unsubscribe function
        return () => {};
    },
    
    addQuest: (questId: string) => {
        nodes.push({
            id: generateId(),
            questId
        });
    },
    
    addCustomNode: (note: string) => {
        nodes.push({
            id: generateId(),
            questId: 'custom',
            customNote: note
        });
    },
    
    removeQuest: (nodeId: string) => {
        const index = nodes.findIndex(node => node.id === nodeId);
        if (index !== -1) {
            nodes.splice(index, 1);
        }
    },
    
    moveNode: (nodeId: string, newIndex: number) => {
        const currentIndex = nodes.findIndex(node => node.id === nodeId);
        if (currentIndex === -1 || newIndex < 0 || newIndex >= nodes.length) {
            return;
        }
        
        const [node] = nodes.splice(currentIndex, 1);
        nodes.splice(newIndex, 0, node);
    },
    
    clear: () => {
        nodes.length = 0;
    }
}; 