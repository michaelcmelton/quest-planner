import { describe, it, expect } from 'vitest';
import { RouteValidator } from './routeValidation';
import type { Quest } from '../types/quest';
import type { Route } from '../types/routes';

describe('RouteValidator', () => {
    // Helper function to create a simple quest
    const createQuest = (id: string, prerequisites: string[] = []): Quest => ({
        id,
        name: `Quest ${id}`,
        number: parseInt(id),
        image: '',
        release: '',
        update: '',
        members: true,
        series: 'Test Series',
        developer: 'Test Developer',
        rewards: {
            questPoints: 1,
            experienceRewards: [],
            otherRewards: []
        },
        start: '',
        startmap: '',
        difficulty: 'Novice',
        description: `Description for Quest ${id}`,
        length: 'Short',
        requirements: {
            skills: [],
            quests: prerequisites,
            other: []
        },
        items: [],
        recommended: [],
        kills: [],
        ironman: [],
        leagueRegion: ''
    });

    // Helper function to create a simple route
    const createRoute = (nodes: Route['nodes']): Route => ({
        id: 'test-route',
        name: 'Test Route',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        nodes,
        progress: {
            completedQuests: 0,
            totalQuests: nodes.filter(node => node.type === 'quest').length
        },
        validationState: {
            isValid: true
        }
    });

    it('should validate a route with valid quest sequence', () => {
        const quests = [
            createQuest('1'),
            createQuest('2', ['1']),
            createQuest('3', ['2'])
        ];

        const validator = new RouteValidator(quests);
        const route = createRoute([
            { id: '1', type: 'quest', questId: '1', content: 'Quest 1', completed: false },
            { id: '2', type: 'quest', questId: '2', content: 'Quest 2', completed: false },
            { id: '3', type: 'quest', questId: '3', content: 'Quest 3', completed: false }
        ]);

        const result = validator.validateRoute(route);
        expect(result.isValid).toBe(true);
        expect(result.missingPrerequisites).toHaveLength(0);
    });

    it('should detect invalid quest sequence', () => {
        const quests = [
            createQuest('1'),
            createQuest('2', ['1']),
            createQuest('3', ['2'])
        ];

        const validator = new RouteValidator(quests);
        const route = createRoute([
            { id: '2', type: 'quest', questId: '2', content: 'Quest 2', completed: false },
            { id: '1', type: 'quest', questId: '1', content: 'Quest 1', completed: false },
            { id: '3', type: 'quest', questId: '3', content: 'Quest 3', completed: false }
        ]);

        const result = validator.validateRoute(route);
        expect(result.isValid).toBe(false);
        expect(result.missingPrerequisites).toContain('1');
    });

    it('should update route validation state', () => {
        const quests = [
            createQuest('1'),
            createQuest('2', ['1']),
            createQuest('3', ['2'])
        ];

        const validator = new RouteValidator(quests);
        const route = createRoute([
            { id: '2', type: 'quest', questId: '2', content: 'Quest 2', completed: false },
            { id: '1', type: 'quest', questId: '1', content: 'Quest 1', completed: false },
            { id: '3', type: 'quest', questId: '3', content: 'Quest 3', completed: false }
        ]);

        const updatedRoute = validator.updateRouteValidation(route);
        expect(updatedRoute.validationState.isValid).toBe(false);
        expect(updatedRoute.validationState.errors).toBeDefined();
        expect(updatedRoute.validationState.errors?.[0]).toContain('Missing prerequisites');
    });

    it('should handle routes with custom nodes', () => {
        const quests = [
            createQuest('1'),
            createQuest('2', ['1'])
        ];

        const validator = new RouteValidator(quests);
        const route = createRoute([
            { id: '1', type: 'quest', questId: '1', content: 'Quest 1', completed: false },
            { id: 'custom', type: 'custom', content: 'Train some skills' },
            { id: '2', type: 'quest', questId: '2', content: 'Quest 2', completed: false }
        ]);

        const result = validator.validateRoute(route);
        expect(result.isValid).toBe(true);
        expect(result.missingPrerequisites).toHaveLength(0);
    });
}); 