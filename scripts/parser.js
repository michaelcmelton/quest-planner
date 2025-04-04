/**
 * @typedef {Object} Infobox
 * @property {string} name - The name of the quest
 * @property {string} number - The quest number in the game
 * @property {string} image - The quest's image URL
 * @property {string} release - The release date of the quest
 * @property {string} update - The update that introduced the quest
 * @property {string} [aka] - Alternative names for the quest (optional)
 * @property {string} members - Whether the quest is members-only
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
 * @property {Array<string>} quests - Array of quest names to be completed before this quest 
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
        const cleanKey = key.replace('|', '');
        
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
    const expMatches = rewardsContent.matchAll(/\*{{SCP\|(.*)\|(.*)}}.* experience/g);
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
      rewards.otherRewards.push(cleanReward);
    }
  }

  return rewards;
}

// /**
//  * Extracts the quest details from the quest's raw data
//  * @param {string} questData - The raw quest data from the cache
//  * @returns {QuestDetails} The parsed quest details
//  */

// export function getQuestDetails(questData) {
//   /** @type {QuestDetails} */
//   const details = {
//     start: '',
//     difficulty: '',
//     length: '',
//     description: '',
//     requirements: {
//       skills: [],
//       quests: []
//     },
//     items: [],
//     recommended: [],
//     kills: [],
//     ironman: []
//   };

//   // Extract quest details template content
//   const detailsMatch = questData.match(/{{Quest details\n((.*\n)+)(?=}})}}/);
//   console.log(`details match: ${detailsMatch}`);
//   if (detailsMatch) {
//     const detailsContent = detailsMatch[1];
//     const lines = detailsContent.split('\n').filter(line => line.trim());
    
//     for (const line of lines) {
//       const [key, ...valueParts] = line.split('=').map(s => s.trim());
//       if (key && valueParts.length > 0) {
//         const value = valueParts.join('=').trim();
//         const cleanKey = key.replace('|', '');
        
//         switch (cleanKey) {
//           case 'start':
//             details.start = value.replace(/\[\[(?:File:)?([^\]]+)\]\]/g, '$1').trim();
//             break;
//           case 'startmap':
//             details.startmap = value.trim();
//             break;
//           case 'difficulty':
//             details.difficulty = value.trim();
//             break;
//           case 'length':
//             details.length = value.trim();
//             break;
//           case 'requirements':
//             // Parse skill requirements
//             const reqMatches = value.matchAll(/\*\{\{SCP\|([^}]+)\|(\d+)\}\}\s*(?:{{Boostable\|}})?/g);
//             for (const match of reqMatches) {
//               const [, skill, level] = match;
//               details.requirements.push({
//                 skill: skill.trim(),
//                 level: parseInt(level),
//                 boostable: value.includes('{{Boostable|}}')
//               });
//             }
//             break;
//           case 'items':
//             details.items = value.split('*').filter(Boolean).map(item => item.trim());
//             break;
//           case 'recommended':
//             details.recommended = value.split('*').filter(Boolean).map(item => item.trim());
//             break;
//           case 'kills':
//             details.kills = value.split('*').filter(Boolean).map(item => item.trim());
//             break;
//           case 'ironman':
//             details.ironman = value.split('*').filter(Boolean).map(item => item.trim());
//             break;
//         }
//       }
//     }
//   }

//   return details;
// }
