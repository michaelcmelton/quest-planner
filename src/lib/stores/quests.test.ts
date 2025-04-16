import { describe, it, expect } from 'vitest';
import { quests } from './quests.svelte';
import type { Quest } from '../types/quest';

describe('quests store', () => {
    it('should load quest data correctly', () => {
        // Check that we have quest data
        expect(quests).toBeDefined();
        expect(Object.keys(quests).length).toBeGreaterThan(0);
        
        // Check the structure of a quest
        const firstQuest = Object.values(quests)[0] as Quest;
        expect(firstQuest).toHaveProperty('id');
        expect(firstQuest).toHaveProperty('name');
        expect(firstQuest).toHaveProperty('number');
        expect(firstQuest).toHaveProperty('rewards');
        expect(firstQuest).toHaveProperty('requirements');
    });

    it('should have correct quest data types', () => {
        const firstQuest = Object.values(quests)[0] as Quest;
        
        expect(typeof firstQuest.id).toBe('string');
        expect(typeof firstQuest.name).toBe('string');
        expect(typeof firstQuest.number).toBe('number');
        expect(typeof firstQuest.members).toBe('boolean');
        expect(Array.isArray(firstQuest.rewards.experienceRewards)).toBe(true);
        expect(Array.isArray(firstQuest.requirements.skills)).toBe(true);
    });
}); 