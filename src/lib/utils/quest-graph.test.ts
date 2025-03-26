import { describe, it, expect } from 'vitest';
import { QuestGraph } from './quest-graph';
import type { Quest } from '$lib/types/quest';

describe('QuestGraph', () => {
    const sampleQuests: Quest[] = [
        {
            id: 'quest1',
            name: 'Quest 1',
            description: 'First quest',
            difficulty: 'Novice',
            length: 'Short',
            questPoints: 1
        },
        {
            id: 'quest2',
            name: 'Quest 2',
            description: 'Second quest',
            difficulty: 'Intermediate',
            length: 'Medium',
            questPoints: 2,
            requirements: {
                quests: [{ id: 'quest1', name: 'Quest 1' }]
            }
        },
        {
            id: 'quest3',
            name: 'Quest 3',
            description: 'Third quest',
            difficulty: 'Experienced',
            length: 'Long',
            questPoints: 3,
            requirements: {
                quests: [
                    { id: 'quest1', name: 'Quest 1' },
                    { id: 'quest2', name: 'Quest 2' }
                ]
            }
        }
    ];

    it('should create a valid quest graph', () => {
        const graph = new QuestGraph(sampleQuests);
        
        // Check dependencies
        expect(graph.getDependencyQuests('quest2')).toEqual(['quest1']);
        expect(graph.getDependencyQuests('quest3')).toEqual(['quest1', 'quest2']);
        expect(graph.getDependencyQuests('quest1')).toEqual([]);

        // Check dependents
        expect(graph.getDependentQuests('quest1')).toEqual(['quest2', 'quest3']);
        expect(graph.getDependentQuests('quest2')).toEqual(['quest3']);
        expect(graph.getDependentQuests('quest3')).toEqual([]);
    });

    it('should validate quest requirements correctly', () => {
        const graph = new QuestGraph(sampleQuests);
        
        // Empty set of completed quests
        const emptyCompleted = new Set<string>();
        expect(graph.validateRequirements(emptyCompleted, 'quest1')).toBe(true);
        expect(graph.validateRequirements(emptyCompleted, 'quest2')).toBe(false);
        expect(graph.validateRequirements(emptyCompleted, 'quest3')).toBe(false);

        // Quest 1 completed
        const quest1Completed = new Set(['quest1']);
        expect(graph.validateRequirements(quest1Completed, 'quest1')).toBe(true);
        expect(graph.validateRequirements(quest1Completed, 'quest2')).toBe(true);
        expect(graph.validateRequirements(quest1Completed, 'quest3')).toBe(false);

        // Quest 1 and 2 completed
        const quest1And2Completed = new Set(['quest1', 'quest2']);
        expect(graph.validateRequirements(quest1And2Completed, 'quest1')).toBe(true);
        expect(graph.validateRequirements(quest1And2Completed, 'quest2')).toBe(true);
        expect(graph.validateRequirements(quest1And2Completed, 'quest3')).toBe(true);
    });

    it('should get available quests correctly', () => {
        const graph = new QuestGraph(sampleQuests);
        
        // Empty set of completed quests
        const emptyCompleted = new Set<string>();
        expect(graph.getAvailableQuests(emptyCompleted)).toEqual(['quest1']);

        // Quest 1 completed
        const quest1Completed = new Set(['quest1']);
        expect(graph.getAvailableQuests(quest1Completed)).toEqual(['quest2']);

        // Quest 1 and 2 completed
        const quest1And2Completed = new Set(['quest1', 'quest2']);
        expect(graph.getAvailableQuests(quest1And2Completed)).toEqual(['quest3']);
    });

    it('should detect circular dependencies', () => {
        const circularQuests: Quest[] = [
            {
                id: 'quest1',
                name: 'Quest 1',
                description: 'First quest',
                difficulty: 'Novice',
                length: 'Short',
                questPoints: 1,
                requirements: {
                    quests: [{ id: 'quest2', name: 'Quest 2' }]
                }
            },
            {
                id: 'quest2',
                name: 'Quest 2',
                description: 'Second quest',
                difficulty: 'Intermediate',
                length: 'Medium',
                questPoints: 2,
                requirements: {
                    quests: [{ id: 'quest1', name: 'Quest 1' }]
                }
            }
        ];

        const graph = new QuestGraph(circularQuests);
        expect(graph.hasCircularDependencies()).toBe(true);
    });

    it('should get topological sort correctly', () => {
        const graph = new QuestGraph(sampleQuests);
        const order = graph.getTopologicalSort();
        
        // Check that quest1 comes before quest2 and quest3
        expect(order.indexOf('quest1')).toBeLessThan(order.indexOf('quest2'));
        expect(order.indexOf('quest2')).toBeLessThan(order.indexOf('quest3'));
    });
});
