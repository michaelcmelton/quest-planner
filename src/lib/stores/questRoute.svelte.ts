import { QuestDAG } from '../utils/questDag';
import type { QuestRouteNode, QuestsData } from '../types/quests';
import { questStore } from './questStore.svelte';

export interface QuestRouteState {
    nodes: QuestRouteNode[];
    isValid: boolean;
    validationErrors: string[];
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const nodes = $state<QuestRouteNode[]>([]);
let _isValid = $state(true);
let _validationErrors = $state<string[]>([]);

const isValid = $derived(_isValid);
const validationErrors = $derived(_validationErrors);

// Create QuestDAG instance
let questDag: QuestDAG | null = null;

// Function to update validation state
const updateValidation = () => {
    if (!questDag) return;

    const questIds = nodes
        .filter(node => node.questId !== 'custom')
        .map(node => node.questId);

    const { isValid: routeIsValid, errors } = questDag.validateRoute(questIds);
    _isValid = routeIsValid;
    _validationErrors = errors;
};

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

    initialize: (quests: QuestsData) => {
        questDag = new QuestDAG(quests);
        updateValidation();
    },
    
    addQuest: (questId: string) => {
        nodes.push({
            id: generateId(),
            type: 'quest',
            questId,
            name: questStore.getQuestById(questId)?.name || '',
            number: questStore.getQuestById(questId)?.number || 0
        });
        updateValidation();
    },
    
    addCustomNode: (note: string) => {
        nodes.push({
            id: generateId(),
            questId: 'custom',
            name: 'Custom Note',
            type: 'custom',
            number: nodes.length + 1,
            customNote: note
        });
        updateValidation();
    },
    
    removeQuest: (nodeId: string) => {
        const index = nodes.findIndex(node => node.id === nodeId);
        if (index !== -1) {
            nodes.splice(index, 1);
            updateValidation();
        }
    },
    
    moveNode: (nodeId: string, newIndex: number) => {
        const currentIndex = nodes.findIndex(node => node.id === nodeId);
        if (currentIndex === -1 || newIndex < 0 || newIndex >= nodes.length) {
            return;
        }
        
        const [node] = nodes.splice(currentIndex, 1);
        nodes.splice(newIndex, 0, node);
        updateValidation();
    },
    
    clear: () => {
        nodes.length = 0;
        updateValidation();
    }
}; 