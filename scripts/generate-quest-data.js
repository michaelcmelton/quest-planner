/**
 * Generate quest data file from the quest data cache
 */

import { CACHE_FILE } from './constants.js';
import fs from 'fs';

async function main() {
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    const questData = {};

    for (const questName in cache) {
      const unparsedQuestData = cache[questName];
      const infobox = getInfobox(unparsedQuestData);
      const questRewards = getQuestRewards(unparsedQuestData);
      const questRequirements = getQuestRequirements(unparsedQuestData);
      const questDescription = getQuestDescription(unparsedQuestData);
      const questData = {
        name: questName,
        ...infobox,
        rewards: questRewards,
        requirements: questRequirements,
        description: questDescription,
      };
      questData[questName] = questData;
    }
    fs.writeFileSync(QUEST_DATA_FILE, JSON.stringify(questData, null, 2));
  } catch (error) {
    console.error(error)
  }
}

main().catch(console.error);