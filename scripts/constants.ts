import path from 'path';

const SKILLS = [
    'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged', 'Prayer',
    'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking',
    'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving',
    'Slayer', 'Farming', 'Runecraft', 'Hunter', 'Construction'
];

const WIKI_STATIC_URL = 'https://oldschool.runescape.wiki/images';

const SKILL_ICONS = SKILLS.map(skill => `${WIKI_STATIC_URL}/u/${skill.toLowerCase()}.png`);

const USER_AGENT = 'Quest Planner/1.0 (https://github.com/michaelcmelton/quest-planner)';

const ICON_DIRECTORY = path.join(process.cwd(), 'static', 'icons', 'skills');

const UNRELEASED_QUESTS = [
    'Pandemonium',
    'The Blood Moon Rises',
    'The Final Dawn',
]

export { SKILLS, SKILL_ICONS, WIKI_STATIC_URL, USER_AGENT, ICON_DIRECTORY, UNRELEASED_QUESTS };
