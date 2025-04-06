import { normalizeQuestName } from './utils.js';

/**
 * @typedef {Object} Infobox
 * @property {string} name - The name of the quest
 * @property {string} number - The quest number in the game
 * @property {string} image - The quest's image URL
 * @property {string} release - The release date of the quest
 * @property {string} update - The update that introduced the quest
 * @property {string} [aka] - Alternative names for the quest (optional)
 * @property {boolean} members - Whether the quest is members-only
 * @property {string} series - The quest series this quest belongs to
 * @property {string} developer - The developer who created the quest
 */

/**
 * @typedef {Object} QuestRewards
 * @property {number} questPoints - The number of quest points awarded
 * @property {Array<{skill: string, amount: number}>} experienceRewards - Array of experience rewards with skill and amount
 * @property {string[]} otherRewards - Array of other rewards (items, access, etc.)
 */

/**
 * @typedef {Object} QuestRequirements
 * @property {Array<{skill: string, level: number, boostable: boolean}>} requirements - Array of skill requirements
 * @property {Array<string>} quests - Array of top-level quest ids to be completed before this quest 
 * @property {Array<string>} other - Array of other requirements (e.g. items, access, etc.)
*/

/**
 * @typedef {Object} QuestDetails
 * @property {string} start - The quest start location
 * @property {string} [startmap] - The map coordinates for the start location (optional)
 * @property {string} difficulty - Official quest difficulty (Novice, Intermediate, Experienced, Master, Grandmaster, Special)
 * @property {string} length - Official quest length (Very Short, Short, Medium, Long, Very Long)
 * @property {QuestRequirements} requirements - Requirements for the quest
 * @property {string} description - The quest description
 * @property {string[]} items - Array of required items
 * @property {string[]} recommended - Array of recommended items/information
 * @property {string[]} kills - Array of enemies to defeat
 * @property {string[]} ironman - Array of ironman-specific concerns
 * @property {string} leagueRegion - The league region of the quest
 */

/**
 * Extracts the infobox data from the quest's raw data
 * @param {string} questData - The raw quest data from the cache
 * @returns {Infobox} The parsed infobox data
 */

export function getInfobox(questData) {
  const infobox = {};
  
  // Extract infobox template content
  const infoboxMatch = questData.match(/\{\{Infobox Quest\n([\s\S]*?)\}\}/);
  if (infoboxMatch) {
    const infoboxContent = infoboxMatch[1];
    const lines = infoboxContent.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const [key, ...valueParts] = line.split('=').map(s => s.trim());
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        const cleanKey = key.replace('|', '').trim();
        
        let cleanValue;
        
        // Special handling for image field
        if (cleanKey === 'image') {
          const imageMatch = value.match(/\[\[File:(.*?)\]\]/);
          cleanValue = imageMatch ? imageMatch[1] : value;
        } else {
          // Handle other fields
          cleanValue = value
            .replace(/\[\[(?:File:)?([^\]]+)\]\]/g, (match, content) => {
              return content.split('|').pop();
            })
            .replace(/^['"]|['"]$/g, '')
            .trim();
        }
        
        // Special handling for number field
        if (cleanKey === 'number') {
          const numValue = parseInt(cleanValue);
          infobox[cleanKey] = isNaN(numValue) ? 0 : numValue;
        } else if (cleanKey === 'members') {
          infobox[cleanKey] = cleanValue === 'Yes' ? true : false;
        } else {
          infobox[cleanKey] = cleanValue;
        }
      }
    }
  }
  
  return infobox;
}

/**
 * Extracts the rewards from the quest's raw data
 * @param {string} questData - The raw quest data from the cache
 * @returns {QuestRewards} The parsed rewards data
 */

export function getQuestRewards(questData) {
  const rewards = {
    questPoints: 0,
    experienceRewards: [],
    otherRewards: [],
  };

  // Extract rewards template content with a more precise pattern that stops at the next template
  const rewardsMatch = questData.match(/{{Quest rewards\n((.*\n)+)(?=}})}}/);
  if (rewardsMatch) {
    const rewardsContent = rewardsMatch[1];
    
    // Extract quest points
    const qpMatch = rewardsContent.match(/\|qp\s*=\s*(\d+)/);
    if (qpMatch) {
      rewards.questPoints = parseInt(qpMatch[1]);
    }

    // Extract experience rewards using a more precise pattern
    const expMatches = rewardsContent.matchAll(/\*{{SCP\|(\w+)\|(\d+,?\d+)\|?(link=.*)?}}.+experience/g);
    for (const match of expMatches) {
      const [, skill, amount] = match;
      rewards.experienceRewards.push({
        skill: skill.trim(),
        amount: parseInt(amount.replace(/,/g, ''))
      });
    }

    // Extract other rewards
    const lines = rewardsContent.split('\n');
    for (const line of lines) {
      // Skip empty lines, metadata, and experience rewards
      if (!line.trim() || 
          line.includes('|qp') || 
          line.includes('|name') || 
          line.includes('|image') || 
          line.includes('experience') ||
          line.includes('|rewards') ||
          line.includes('}}')) continue;

      // Clean up the reward text
      const cleanReward = line.trim().substring(1);

      if (line.startsWith('==') && line.endsWith('==')) {
        break;
      }

      rewards.otherRewards.push(cleanReward);
    }
  }

  return rewards;
}

/**
 * Parses quest requirements from requirement lines
 * @param {string[]} requirementLines - Array of requirement lines to parse
 * @returns {QuestRequirements} The parsed quest requirements
 */
function parseQuestRequirements(requirementLines) {
  /** @type {QuestRequirements} */
  const requirements = {
    skills: [],
    quests: [],
    other: []
  };

  for (const reqLine of requirementLines) {
    // Check for skill requirements (e.g. *{{SCP|Combat|85}} [[Combat level|Combat]])
    // optionally, the SCP tag can include a link tag that is a yes field. (e.g. *{{SCP|Combat|85|link=yes}} [[Combat level|Combat]])
    const skillMatch = reqLine.match(/{{SCP\|(.+)\|(\d+)(?:\|link=?.*)?}}(?:\s+(\[\[.+\]\])?)/);
    if (skillMatch) {
      requirements.skills.push({
        skill: skillMatch[1].trim(),
        level: parseInt(skillMatch[2]),
        boostable: reqLine.includes('{{Boostable|yes}}'),
        required: reqLine.includes('{{Questreqstart|yes}}'),
        link: skillMatch[3] || `[[${skillMatch[1].trim()} level|${skillMatch[1].trim()}]]`
      });
      continue;
    }

    // Check for top-level quest requirements (lines starting with ** followed by [[Quest Name]])
    // Only match lines with single ** to get top-level requirements
    const questMatch = reqLine.match(/^\*\*(\s+)?\[\[(.*?)\]\]/);
    if (questMatch && !reqLine.includes('***')) {
      // Convert quest name to snake_case id and remove special characters
      const questId = normalizeQuestName(questMatch[2]);
      requirements.quests.push(questId);
      continue;
    }

    // If line doesn't match skills or quests, and isn't a quest requirement, it's an "other" requirement
    if (reqLine.startsWith('*') && !reqLine.includes('Completion of') && !reqLine.includes('[[')) {
      requirements.other.push(reqLine.substring(1).trim());
    }
  }

  return requirements;
}

/**
 * Parses items from the quest details
 * @param {string[]} lines - Array of lines from the quest details section
 * @returns {string[]} The parsed items
 */
function parseItems(lines) {
  const items = [];
  
  // Process each line
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;

    // If line starts with **, it's a part of a sublist of items, so we can ignore
    if(line.startsWith('**')) {
      continue;
    }
    
    // If line starts with *, it's an item
    if (line.startsWith('*')) {
      items.push(line.substring(1).trim());
    }
  }

  return items;
}

/**
 * Parses kills from the quest details
 * @param {string[]} lines - Array of lines from the quest details section
 * @returns {string[]} The parsed kills
 */
function parseKills(lines) {
  const kills = [];
  
  // Process each line
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // If line starts with *, it's a kill requirement
    if (line.startsWith('*')) {
      kills.push(line.substring(1).trim());
    }
  }

  return kills;
}

/**
 * Parses ironman-specific concerns from the quest details
 * @param {string[]} lines - Array of lines from the quest details section
 * @returns {string[]} The parsed ironman concerns
 */
function parseIronman(lines) {
  const ironman = [];
  
  // Process each line
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // If line starts with *, it's an ironman concern
    if (line.startsWith('*')) {
      ironman.push(line.substring(1).trim());
    } else {
      ironman.push(line.trim());
    }
  }

  return ironman;
}

/**
 * Parses league region from the quest details
 * @param {string[]} lines - Array of lines from the quest details section
 * @returns {string} The parsed league region
 */
function parseLeagueRegion(lines) {
  // Join all lines and trim the result
  return lines.join('').trim();
}

/**
  * Extracts the quest details from the quest's raw data
  * @param {string} questData - The raw quest data from the cache
  * @returns {QuestDetails} The parsed quest details
  */
export function getQuestDetails(questData) {
  /** @type {QuestDetails} */  
  const details = {
    start: '',
    startmap: '',
    difficulty: '',
    description: '',
    length: '',
    requirements: {
      skills: [],
      quests: [],
      other: []
    },
    items: [],
    recommended: [],
    kills: [],
    ironman: [],
    leagueRegion: ''
  };

  // Extract quest details template content with a more precise pattern that stops at the next template
  const detailsMatch = questData.match(/{{Quest details\n((.*\n)+)(?=}})}}/);

  const singleLineKeys = ['start', 'startmap', 'difficulty', 'length'];
  if (detailsMatch) {
    const detailsContent = detailsMatch[1];
    const lines = detailsContent.split('\n').filter(line => line.trim());

    for (const line of lines) {
      const [key, ...valueParts] = line.split('=').map(s => s.trim());
      if (singleLineKeys.includes(key.substring(1))) {
         details[key.substring(1)] = valueParts.join('');
       }

      // Handle description section which can span multiple lines
      if (key.substring(1) === 'description') {
        // Initialize description array to collect all lines
        const descriptionLines = [];
        descriptionLines.push(valueParts.join(''));
        let currentIndex = lines.indexOf(line) + 1;

        // Keep collecting lines until we hit another section or end of content
        while (currentIndex < lines.length && 
               !lines[currentIndex].trim().startsWith('==') &&
               !lines[currentIndex].trim().startsWith('|') &&
               lines[currentIndex].trim() !== '}}') {
          descriptionLines.push(lines[currentIndex].trim());
          currentIndex++;
        }

        // Parse the description using the dedicated function
        details.description =descriptionLines.join(' ');
      }

      // Handle requirements section which can span multiple lines
      if (key.substring(1) === 'requirements') {
        // Initialize requirements array to collect all lines
        const requirementLines = [];
        requirementLines.push(valueParts.join(''));
        let currentIndex = lines.indexOf(line) + 1;
        
        // Keep collecting lines until we hit another section or end of content
        while (currentIndex < lines.length && 
               !lines[currentIndex].trim().startsWith('==') &&
               !lines[currentIndex].trim().startsWith('|') &&
               lines[currentIndex].trim() !== '}}') {
          requirementLines.push(lines[currentIndex].trim());
          currentIndex++;
        }

        // Parse the requirements using the dedicated function
        details.requirements = parseQuestRequirements(requirementLines);
      }

      // Handle items section
      if (key.substring(1) === 'items') {
        // Initialize items array to collect all lines
        const itemLines = [];
        itemLines.push(valueParts.join(''));
        let currentIndex = lines.indexOf(line) + 1;
        
        // Keep collecting lines until we hit another section or end of content
        while (currentIndex < lines.length && 
               !lines[currentIndex].trim().startsWith('|') &&
               !lines[currentIndex].trim().startsWith('==') &&
               lines[currentIndex].trim() !== '}}') {
          itemLines.push(lines[currentIndex].trim());
          currentIndex++;
        }

        // Parse the items using the dedicated function
        details.items = parseItems(itemLines);
      }

      // Handle kills section
      if (key.substring(1) === 'kills') {
        // Initialize kills array to collect all lines
        const killLines = [];
        killLines.push(valueParts.join(''));
        let currentIndex = lines.indexOf(line) + 1;
        
        // Keep collecting lines until we hit another section or end of content
        while (currentIndex < lines.length && 
               !lines[currentIndex].trim().startsWith('|') &&
               !lines[currentIndex].trim().startsWith('==') &&
               lines[currentIndex].trim() !== '}}') {
          killLines.push(lines[currentIndex].trim());
          currentIndex++;
        }

        // Parse the kills using the dedicated function
        details.kills = parseKills(killLines);
      }

      // Handle ironman section
      if (key.substring(1) === 'ironman') {
        // Initialize ironman array to collect all lines
        const ironmanLines = [];
        ironmanLines.push(valueParts.join(''));
        let currentIndex = lines.indexOf(line) + 1;
        
        // Keep collecting lines until we hit another section or end of content
        while (currentIndex < lines.length && 
               !lines[currentIndex].trim().startsWith('|') &&
               !lines[currentIndex].trim().startsWith('==') &&
               lines[currentIndex].trim() !== '}}') {
          ironmanLines.push(lines[currentIndex].trim());
          currentIndex++;
        }

        // Parse the ironman concerns using the dedicated function
        details.ironman = parseIronman(ironmanLines);
      }

      // Handle league region section
      if (key.substring(1) === 'leagueRegion') {
        // Initialize league region array to collect all lines
        const leagueRegionLines = [];
        leagueRegionLines.push(valueParts.join(''));
        let currentIndex = lines.indexOf(line) + 1;
        
        // Keep collecting lines until we hit another section or end of content
        while (currentIndex < lines.length && 
               !lines[currentIndex].trim().startsWith('|') &&
               lines[currentIndex].trim() !== '}}') {
          leagueRegionLines.push(lines[currentIndex].trim());
          currentIndex++;
        }

        // Parse the league region using the dedicated function
        details.leagueRegion = parseLeagueRegion(leagueRegionLines);
      }
    }
  }

  return details;
}

