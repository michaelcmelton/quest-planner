import { describe, it, expect } from 'vitest';
import { QuestGraph } from './questGraph';
import type { Quest } from '../types/quest';

describe('QuestGraph', () => {
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

    it('should create an empty graph', () => {
        const graph = new QuestGraph();
        expect(graph.getNodes()).toHaveLength(0);
        expect(graph.getEdges()).toHaveLength(0);
    });

    it('should add quests as nodes', () => {
        const graph = new QuestGraph();
        const quest1 = createQuest('1');
        const quest2 = createQuest('2');

        graph.addQuest(quest1);
        graph.addQuest(quest2);

        expect(graph.getNodes()).toHaveLength(2);
        expect(graph.getNode('1')).toBeDefined();
        expect(graph.getNode('2')).toBeDefined();
    });

    it('should add prerequisite relationships as edges', () => {
        const graph = new QuestGraph();
        const quest1 = createQuest('1');
        const quest2 = createQuest('2', ['1']);

        graph.addQuest(quest1);
        graph.addQuest(quest2);

        expect(graph.getEdges()).toHaveLength(1);
        expect(graph.getEdges()[0].from).toBe('1');
        expect(graph.getEdges()[0].to).toBe('2');
    });

    it('should detect cycles in the graph', () => {
        const graph = new QuestGraph();
        const quest1 = createQuest('1', ['3']);
        const quest2 = createQuest('2', ['1']);
        const quest3 = createQuest('3', ['2']);

        graph.addQuest(quest1);
        graph.addQuest(quest2);
        graph.addQuest(quest3);

        expect(graph.hasCycles()).toBe(true);
    });

    it('should validate a valid quest sequence', () => {
        const graph = new QuestGraph();
        const quest1 = createQuest('1');
        const quest2 = createQuest('2', ['1']);
        const quest3 = createQuest('3', ['2']);

        graph.addQuest(quest1);
        graph.addQuest(quest2);
        graph.addQuest(quest3);

        const sequence = ['1', '2', '3'];
        expect(graph.isValidSequence(sequence)).toBe(true);
    });

    it('should detect invalid quest sequences', () => {
        const graph = new QuestGraph();
        const quest1 = createQuest('1');
        const quest2 = createQuest('2', ['1']);
        const quest3 = createQuest('3', ['2']);

        graph.addQuest(quest1);
        graph.addQuest(quest2);
        graph.addQuest(quest3);

        const sequence = ['2', '1', '3']; // Invalid because 2 requires 1
        expect(graph.isValidSequence(sequence)).toBe(false);
    });

    it('should find missing prerequisites for a quest', () => {
        const graph = new QuestGraph();
        const quest1 = createQuest('1');
        const quest2 = createQuest('2', ['1']);
        const quest3 = createQuest('3', ['1', '2']);

        graph.addQuest(quest1);
        graph.addQuest(quest2);
        graph.addQuest(quest3);

        const sequence = ['3']; // Missing prerequisites 1 and 2
        const missing = graph.getMissingPrerequisites(sequence);
        expect(missing).toContain('1');
        expect(missing).toContain('2');
    });
}); 