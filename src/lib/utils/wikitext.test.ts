import { describe, it, expect } from 'vitest';
import { formatWikitext } from './wikitext';

describe('formatWikitext', () => {
    it('should format a basic wikitext link', () => {
        const input = '[[Dragon Slayer]]';
        const expected = '<a href="https://oldschool.runescape.wiki/w/Dragon_Slayer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Dragon Slayer</a>';
        expect(formatWikitext(input)).toBe(expected);
    });

    it('should format a link with custom display text', () => {
        const input = '[[Dragon Slayer|this awesome quest]]';
        const expected = '<a href="https://oldschool.runescape.wiki/w/Dragon_Slayer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">this awesome quest</a>';
        expect(formatWikitext(input)).toBe(expected);
    });

    it('should handle spaces in page names correctly', () => {
        const input = '[[Dragon Slayer II]]';
        const expected = '<a href="https://oldschool.runescape.wiki/w/Dragon_Slayer_II" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Dragon Slayer II</a>';
        expect(formatWikitext(input)).toBe(expected);
    });

    it('should format multiple links in the same text', () => {
        const input = 'Complete [[Dragon Slayer]] and [[Monkey Madness]] for good rewards!';
        const expected = 'Complete <a href="https://oldschool.runescape.wiki/w/Dragon_Slayer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Dragon Slayer</a> and <a href="https://oldschool.runescape.wiki/w/Monkey_Madness" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Monkey Madness</a> for good rewards!';
        expect(formatWikitext(input)).toBe(expected);
    });

    it('should return unchanged text when no links are present', () => {
        const input = 'This text has no links';
        expect(formatWikitext(input)).toBe(input);
    });

    it('should handle links with extra whitespace', () => {
        const input = '[[ Dragon Slayer  |  My Quest  ]]';
        const expected = '<a href="https://oldschool.runescape.wiki/w/Dragon_Slayer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">My Quest</a>';
        expect(formatWikitext(input)).toBe(expected);
    });
}); 