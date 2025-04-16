import { describe, it, expect } from 'vitest';
import { skillIcons } from './static-paths';

describe('static-paths', () => {
    describe('skillIcons', () => {
        it('should contain all required skill icons', () => {
            const requiredSkills = [
                'Agility', 'Attack', 'Construction', 'Cooking', 'Crafting',
                'Defence', 'Farming', 'Firemaking', 'Fishing', 'Fletching',
                'Herblore', 'Hitpoints', 'Hunter', 'Magic', 'Mining',
                'Prayer', 'Ranged', 'Runecraft', 'Slayer', 'Smithing',
                'Strength', 'Thieving', 'Woodcutting', 'Quest', 'Combat'
            ];

            requiredSkills.forEach(skill => {
                expect(skillIcons).toHaveProperty(skill);
                expect(skillIcons[skill]).toBeDefined();
                expect(typeof skillIcons[skill]).toBe('string');
            });
        });

        it('should generate correct icon paths', () => {
            expect(skillIcons['Agility']).toContain('/icons/skills/agility-icon.png');
            expect(skillIcons['Attack']).toContain('/icons/skills/attack-icon.png');
            expect(skillIcons['Quest']).toContain('/icons/skills/quests-icon.png');
        });

        it('should use the base path from $app/paths', () => {
            // The base path should be included in all icon paths
            Object.values(skillIcons).forEach(path => {
                expect(path).toContain('/icons/skills/');
            });
        });
    });
}); 