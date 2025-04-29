import { writable, derived } from 'svelte/store';
import type { QuestsData } from '../types/quests';
import questsData from '../data/quests.json';

// Create a writable store with the quest data
const quests = writable<QuestsData>(questsData);

// Create derived stores for common operations
export const questList = derived(quests, ($quests) => 
    Object.values($quests).sort((a, b) => a.number - b.number)
);

export const questById = (id: string) => 
    derived(quests, ($quests) => $quests[id]);

// Export the main store
export { quests }; 