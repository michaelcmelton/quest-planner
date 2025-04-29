import { describe, it, expect } from 'vitest';
import { questStore } from './questStore.svelte';
import type { QuestsData, Quest } from '../types/quests';

describe('questStore', () => {
    it('should provide access to quest data', () => {
        let state: { quests: QuestsData, questList: Quest[] };
        questStore.subscribe((s) => state = s);
        
        expect(state!.quests).toBeDefined();
        expect(state!.questList).toBeDefined();
        expect(Array.isArray(state!.questList)).toBe(true);
    });

    it('should sort quests by number', () => {
        let state: { quests: QuestsData, questList: Quest[] };
        questStore.subscribe((s) => state = s);
        
        const questNumbers = state!.questList.map(quest => quest.number);
        expect(questNumbers).toEqual([...questNumbers].sort((a, b) => a - b));
    });

    it('should get quest by ID', () => {
        let state: { quests: QuestsData, questList: Quest[] };
        questStore.subscribe((s) => state = s);
        
        const firstQuest = state!.questList[0];
        const questById = questStore.getQuestById(firstQuest.id);
        
        expect(questById).toBeDefined();
        expect(questById.id).toBe(firstQuest.id);
    });
}); 