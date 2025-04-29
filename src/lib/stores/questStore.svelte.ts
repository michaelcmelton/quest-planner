import type { QuestsData } from '../types/quests';
import questsData from '../data/quests.json';

// Create state with the quest data
const quests = $state<QuestsData>(questsData);

// Create derived values for common operations
const questList = $derived(
    Object.values(quests).sort((a, b) => a.number - b.number)
);

// Export the store interface
export const questStore = {
    subscribe: (callback: (state: { quests: QuestsData, questList: typeof questList }) => void) => {
        // Initial call
        callback({
            quests,
            questList
        });

        // Setup effect for reactivity
        $effect(() => {
            callback({
                quests,
                questList
            });
        });

        // Return unsubscribe function
        return () => {};
    },

    getQuestById: (id: string) => quests[id]
};
