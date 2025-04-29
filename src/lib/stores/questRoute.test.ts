import { describe, it, expect, beforeEach } from 'vitest';
import { questRoute } from './questRoute.svelte';
import type { QuestRouteState } from './questRoute.svelte';

describe('questRoute store', () => {
    beforeEach(() => {
        questRoute.clear();
    });

    it('should initialize with empty state', () => {
        let state: QuestRouteState;
        questRoute.subscribe((s: QuestRouteState) => state = s);
        expect(state!.nodes).toHaveLength(0);
        expect(state!.isValid).toBe(true);
        expect(state!.validationErrors).toHaveLength(0);
    });

    it('should add a quest to the route', () => {
        questRoute.addQuest('test-quest');
        let state: QuestRouteState;
        questRoute.subscribe((s: QuestRouteState) => state = s);
        expect(state!.nodes).toHaveLength(1);
        expect(state!.nodes[0].questId).toBe('test-quest');
    });

    it('should add a custom node to the route', () => {
        questRoute.addCustomNode('Train Agility to 56');
        let state: QuestRouteState;
        questRoute.subscribe((s: QuestRouteState) => state = s);
        expect(state!.nodes).toHaveLength(1);
        expect(state!.nodes[0].questId).toBe('custom');
        expect(state!.nodes[0].customNote).toBe('Train Agility to 56');
    });

    it('should remove a quest from the route', () => {
        questRoute.addQuest('test-quest');
        let state: QuestRouteState;
        questRoute.subscribe((s: QuestRouteState) => state = s);
        const nodeId = state!.nodes[0].id;
        questRoute.removeQuest(nodeId);
        questRoute.subscribe((s: QuestRouteState) => state = s);
        expect(state!.nodes).toHaveLength(0);
    });

    it('should move a quest in the route', () => {
        questRoute.addQuest('quest-1');
        questRoute.addQuest('quest-2');
        questRoute.addQuest('quest-3');
        
        let state: QuestRouteState;
        questRoute.subscribe((s: QuestRouteState) => state = s);
        const nodeId = state!.nodes[0].id;
        questRoute.moveNode(nodeId, 2);
        
        questRoute.subscribe((s: QuestRouteState) => state = s);
        expect(state!.nodes[2].questId).toBe('quest-1');
        expect(state!.nodes[0].questId).toBe('quest-2');
    });

    it('should clear the route', () => {
        questRoute.addQuest('test-quest');
        questRoute.addCustomNode('Train Agility');
        questRoute.clear();
        
        let state: QuestRouteState;
        questRoute.subscribe((s: QuestRouteState) => state = s);
        expect(state!.nodes).toHaveLength(0);
        expect(state!.isValid).toBe(true);
        expect(state!.validationErrors).toHaveLength(0);
    });
}); 