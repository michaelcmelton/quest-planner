import { describe, it, expect, beforeEach } from 'vitest';
import { questStore } from './questStore.svelte';
import type { QuestsData, Quest } from '../types/quests';

const mockQuests: QuestsData = {
    'quest1': {
        id: 'quest1',
        name: 'Test Quest 1',
        number: 1,
        image: '',
        release: '',
        update: '',
        members: true,
        series: '',
        developer: '',
        rewards: {
            questPoints: 1,
            experienceRewards: [],
            otherRewards: []
        },
        start: '',
        startmap: '',
        difficulty: '',
        description: '',
        length: '',
        requirements: {
            skills: [],
            quests: [],
            other: []
        },
        items: [],
        recommended: [],
        kills: [],
        ironman: [],
        leagueRegion: ''
    },
    'quest2': {
        id: 'quest2',
        name: 'Test Quest 2',
        number: 2,
        image: '',
        release: '',
        update: '',
        members: true,
        series: '',
        developer: '',
        rewards: {
            questPoints: 1,
            experienceRewards: [],
            otherRewards: []
        },
        start: '',
        startmap: '',
        difficulty: '',
        description: '',
        length: '',
        requirements: {
            skills: [],
            quests: [],
            other: []
        },
        items: [],
        recommended: [],
        kills: [],
        ironman: [],
        leagueRegion: ''
    }
};

describe('questStore', () => {
    beforeEach(() => {
        questStore.setQuests(mockQuests);
    });

    it('should provide access to quest data', () => {
        let state: { quests: QuestsData, questList: Quest[] };
        questStore.subscribe((s) => state = s);
        
        expect(state!.quests).toBeDefined();
        expect(state!.questList).toBeDefined();
        expect(Array.isArray(state!.questList)).toBe(true);
        expect(state!.questList.length).toBe(2);
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
        expect(questById!.id).toBe(firstQuest.id);
    });
}); 