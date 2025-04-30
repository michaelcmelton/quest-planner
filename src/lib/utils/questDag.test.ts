import { describe, it, expect } from 'vitest';
import { QuestDAG } from './questDag';
import type { QuestsData } from '../types/quests';

describe('QuestDAG', () => {
    const mockQuests: QuestsData = {
        'quest1': {
            id: 'quest1',
            name: 'Quest 1',
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
            name: 'Quest 2',
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
                quests: ['quest1'],
                other: []
            },
            items: [],
            recommended: [],
            kills: [],
            ironman: [],
            leagueRegion: ''
        },
        'quest3': {
            id: 'quest3',
            name: 'Quest 3',
            number: 3,
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
                quests: ['quest2'],
                other: []
            },
            items: [],
            recommended: [],
            kills: [],
            ironman: [],
            leagueRegion: ''
        }
    };

    it('should build a graph from quest prerequisites', () => {
        const dag = new QuestDAG(mockQuests);
        const result = dag.validateRoute(['quest1', 'quest2', 'quest3']);
        expect(result.isValid).toBe(true);
    });

    it('should detect invalid quest order', () => {
        const dag = new QuestDAG(mockQuests);
        const result = dag.validateRoute(['quest2', 'quest1', 'quest3']);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('"Quest 2" requires "Quest 1" to be completed first');
    });

    it('should detect missing quests', () => {
        const dag = new QuestDAG(mockQuests);
        const result = dag.validateRoute(['quest1', 'quest4', 'quest3']);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Quest "quest4" not found in quest database');
    });

    it('should get available quests based on completed quests', () => {
        const dag = new QuestDAG(mockQuests);
        
        // Initially, only quest1 should be available
        let available = dag.getAvailableQuests(new Set());
        expect(available).toEqual(['quest1']);

        // After completing quest1, quest2 should be available
        available = dag.getAvailableQuests(new Set(['quest1']));
        expect(available).toEqual(['quest2']);

        // After completing quest2, quest3 should be available
        available = dag.getAvailableQuests(new Set(['quest1', 'quest2']));
        expect(available).toEqual(['quest3']);
    });
}); 