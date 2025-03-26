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

    it('should parse simple bullet lists', () => {
        const input = 'Required items:\n* [[Hammer]]\n* 3 [[Steel bar]]s\n* Some [[coins]]';
        const expected = 'Required items:<ul class="list-disc list-inside my-2"><li><a href="https://oldschool.runescape.wiki/w/Hammer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Hammer</a></li><li>3 <a href="https://oldschool.runescape.wiki/w/Steel_bar" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Steel bar</a>s</li><li>Some <a href="https://oldschool.runescape.wiki/w/coins" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">coins</a></li></ul>';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse nested bullet lists', () => {
        const input = 'Requirements:\n* Level 50 [[Mining]]\n* Completion of:\n** [[Dragon Slayer]]\n** [[Heroes Quest]]\n*** [[Shield of Arrav]]\n*** [[Lost City]]\n* 1000 [[coins]]';
        const expected = 'Requirements:<ul class="list-disc list-inside my-2"><li>Level 50 <a href="https://oldschool.runescape.wiki/w/Mining" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Mining</a></li><li>Completion of:</li><ul class="list-disc list-inside ml-4"><li><a href="https://oldschool.runescape.wiki/w/Dragon_Slayer" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Dragon Slayer</a></li><li><a href="https://oldschool.runescape.wiki/w/Heroes_Quest" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Heroes Quest</a></li><ul class="list-disc list-inside ml-4"><li><a href="https://oldschool.runescape.wiki/w/Shield_of_Arrav" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Shield of Arrav</a></li><li><a href="https://oldschool.runescape.wiki/w/Lost_City" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Lost City</a></li></ul></ul><li>1000 <a href="https://oldschool.runescape.wiki/w/coins" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">coins</a></li></ul>';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse mixed content with nested lists', () => {
        const input = "'''Required items:'''\n* [[Mithril axe]] (required to obtain the [[blessed axe]]; no other type of axe will do)\n* 5 [[iron bar]]s\n* [[Ghostspeak amulet]] ([[Morytania legs]] will not work)\n\n''Optional items:''\n* [[Stamina potion]]\n** 1 dose is enough\n** Can be obtained from the [[Grand Exchange]]";
        const expected = "<strong>Required items:</strong><ul class=\"list-disc list-inside my-2\"><li><a href=\"https://oldschool.runescape.wiki/w/Mithril_axe\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Mithril axe</a> (required to obtain the <a href=\"https://oldschool.runescape.wiki/w/blessed_axe\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">blessed axe</a>; no other type of axe will do)</li><li>5 <a href=\"https://oldschool.runescape.wiki/w/iron_bar\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">iron bar</a>s</li><li><a href=\"https://oldschool.runescape.wiki/w/Ghostspeak_amulet\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Ghostspeak amulet</a> (<a href=\"https://oldschool.runescape.wiki/w/Morytania_legs\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Morytania legs</a> will not work)</li></ul><em>Optional items:</em><ul class=\"list-disc list-inside my-2\"><li><a href=\"https://oldschool.runescape.wiki/w/Stamina_potion\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Stamina potion</a></li><ul class=\"list-disc list-inside ml-4\"><li>1 dose is enough</li><li>Can be obtained from the <a href=\"https://oldschool.runescape.wiki/w/Grand_Exchange\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline dark:text-blue-400\">Grand Exchange</a></li></ul></ul>";
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should handle line breaks', () => {
        const input = 'First line\nSecond line\nThird line';
        const expected = 'First line<br>Second line<br>Third line';
        expect(parseMediaText(input)).toBe(expected);
    });

    it('should parse skill requirements', () => {
        const input = '<span class="scp" data-skill="Crafting" data-level="19" style="position:relative;display:inline-block;height:1em;"><a href="https://oldschool.runescape.wiki/w/File%3ACrafting_icon.png" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">link=Crafting|alt=Crafting</a> 19 <a href="https://oldschool.runescape.wiki/w/Crafting" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Crafting</a></span>';
        const expected = '<span class="inline-flex items-center gap-1"><img src="/icons/skills/crafting-icon.png" alt="Crafting" class="w-4 h-4" /><a href="https://oldschool.runescape.wiki/w/Crafting" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">Crafting</a> 19</span>';
        expect(parseMediaText(input)).toBe(expected);
    });
});