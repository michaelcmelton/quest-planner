import type { Quest, QuestsData } from '../types/quests';

let quests = $state<QuestsData>({});
let questList = $state<Quest[]>([]);

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
