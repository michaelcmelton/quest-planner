/**
 * Generate quest data file from the quest data cache
 */

import { CACHE_FILE, QUEST_DATA_FILE } from './constants.js';
import fs from 'fs';
import { getInfobox, getQuestRewards, getQuestDetails } from './parser.js';
async function main() {
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    const questData = {};

    for (const questName in cache) {
      const unparsedQuestData = cache[questName];
      const infobox = getInfobox(unparsedQuestData);
      const questRewards = getQuestRewards(unparsedQuestData);
      const questDetails = getQuestDetails(unparsedQuestData);
      const singleQuestData = {
        id: questName,
        ...infobox,
        rewards: questRewards,
        ...questDetails,
      };
      questData[questName] = singleQuestData;
    }
    fs.writeFileSync(QUEST_DATA_FILE, JSON.stringify(questData, null, 2));
  } catch (error) {
    console.error(error)
  }
}

main().catch(console.error);