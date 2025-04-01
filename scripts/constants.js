import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from "path";
    
const __dirname = dirname(fileURLToPath(import.meta.url));

export const SKILLS = [
    'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged', 'Prayer',
    'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking',
    'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving',
    'Slayer', 'Farming', 'Runecraft', 'Hunter', 'Construction'
];
export const WIKI_STATIC_URL = 'https://oldschool.runescape.wiki/images';
export const WIKI_BASE_URL = 'https://oldschool.runescape.wiki';
export const USER_AGENT = 'Quest Planner/1.0 (https://github.com/michaelcmelton/quest-planner)';
export const WIKI_API_URL = 'https://oldschool.runescape.wiki/api.php';
export const CACHE_FILE = path.join(__dirname, 'quests-cache.json');
export const QUEST_DATA_FILE = path.join("src", "lib", "data", "quests.json");