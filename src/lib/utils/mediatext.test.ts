import { describe, it, expect } from 'vitest';
import { parseMediaText } from './mediatext';

describe('parseMediaText', () => {
    it('should handle empty or None values', () => {
        expect(parseMediaText('')).toBe('');
        expect(parseMediaText('None')).toBe('None');
        expect(parseMediaText(undefined as any)).toBe(undefined);
    });

    it('should parse wiki links with display text', () => {
        const input = 'Talk to [[Dragon Slayer II|Alec Kincade]] to start the quest.';
        const expected = 'Talk to <a href="https://oldschool.runescape.wiki/w/Dragon_Slayer_II" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Alec Kincade</a> to start the quest.';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse simple wiki links', () => {
        const input = 'You need [[Dragon Slayer]] completed.';
        const expected = 'You need <a href="https://oldschool.runescape.wiki/w/Dragon_Slayer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Dragon Slayer</a> completed.';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse bold text', () => {
        const input = "'''Important:''' You must have completed the quest.";
        const expected = "<strong>Important:</strong> You must have completed the quest.";
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse italic text', () => {
        const input = "This item is ''very rare''.";
        const expected = "This item is <em>very rare</em>.";
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse bullet lists', () => {
        const input = 'Required items:\n* [[Hammer]]\n* 3 [[Steel bar]]s\n* Some [[coins]]';
        const expected = 'Required items:<ul class="list-disc list-inside my-2"><li><a href="https://oldschool.runescape.wiki/w/Hammer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Hammer</a></li><li>3 <a href="https://oldschool.runescape.wiki/w/Steel_bar" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Steel bar</a>s</li><li>Some <a href="https://oldschool.runescape.wiki/w/coins" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">coins</a></li></ul>';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should handle line breaks', () => {
        const input = 'First line\nSecond line\nThird line';
        const expected = 'First line<br>Second line<br>Third line';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should handle complex mixed content', () => {
        const input = "'''Quest Requirements:'''\n* [[Dragon Slayer|DS1]] completed\n* Level 50 [[Mining]]\n\n''Optional items:''\n* [[Stamina potion]] ''(recommended)''";
        const expected = "<strong>Quest Requirements:</strong><ul class=\"list-disc list-inside my-2\"><li><a href=\"https://oldschool.runescape.wiki/w/Dragon_Slayer\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">DS1</a> completed</li><li>Level 50 <a href=\"https://oldschool.runescape.wiki/w/Mining\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Mining</a></li></ul><em>Optional items:</em><ul class=\"list-disc list-inside my-2\"><li><a href=\"https://oldschool.runescape.wiki/w/Stamina_potion\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Stamina potion</a> <em>(recommended)</em></li></ul>";
        expect(parseMediaText(input)).toBe(expected);
    });
}); 