import type { Quest, QuestsData } from '../types/quests';
import questsData from '../data/quests.json';

let quests = $state<QuestsData>(questsData);
let questList = $state<Quest[]>(Object.values(questsData).sort((a, b) => a.number - b.number));

export const questStore = {
    subscribe(callback: (state: { quests: QuestsData; questList: Quest[] }) => void) {
        callback({ quests, questList });
        return () => {};
    },
    setQuests(data: QuestsData) {
        quests = data;
        questList = Object.values(data).sort((a, b) => a.number - b.number);
    },
    getQuestById(id: string): Quest | undefined {
        return quests[id];
    }
};
