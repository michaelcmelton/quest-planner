import { assert } from 'console';
import { normalizeQuestName } from './utils.js';
import { WIKI_API_URL, USER_AGENT, CACHE_FILE } from './constants.js';
import fs from 'fs';

/**
 * @typedef {Object} WikiPage
 * @property {number} pageid - The unique identifier for the wiki page
 * @property {number} ns - The namespace number of the wiki page
 * @property {string} title - The title of the wiki page
 */

/** 
 * @typedef {Object} QuestPagesAPIResponse
 * @property {boolean} batchcomplete - Whether the batch request was successful
 * @property {Object} query - The query object
 * @property {WikiPage[]} query.categorymembers - The list of wiki pages
 */

/**
 * @typedef {Object} WikiWarning
 * @property {string} warnings - The warning message
 */

/**
 * @typedef {Object} WikiRevision
 * @property {string} contentformat - The format of the content (e.g. "text/x-wiki")
 * @property {string} contentmodel - The model of the content (e.g. "wikitext") 
 * @property {string} content - The actual wiki content
 */

/**
 * @typedef {Object} WikiPageDetail
 * @property {number} pageid - The unique identifier for the wiki page
 * @property {number} ns - The namespace number
 * @property {string} title - The title of the page
 * @property {WikiRevision[]} revisions - Array of page revisions
 */

/**
 * @typedef {Object} QuestDataAPIResponse
 * @property {boolean} batchcomplete - Whether the batch request was complete
 * @property {Object} warnings - Warning messages from the API
 * @property {WikiWarning} warnings.main - Main warnings
 * @property {WikiWarning} warnings.revisions - Revision-specific warnings
 * @property {Object} query - The query results
 * @property {WikiPageDetail[]} query.pages - Array of page details
 */

async function main() {
  try {
    const questNames = await getQuestNames();
    
    assert(questNames.length === 170, `Expected 170 quests, got ${questNames.length}\n${questNames.join('\n')}`);
    for (const questName of questNames) {
      const normalizedQuestName = normalizeQuestName(questName);
      const cachedQuestData = await getCachedQuestData();

      if(cachedQuestData && cachedQuestData[normalizedQuestName]) {
        console.log(`${questName} found in cache; skipping...`);
        continue;
      }

      console.log(`Fetching data for ${questName}...`);
      const questData = await getQuestData(questName);
      await writeQuestDataToCache(normalizedQuestName, questData);
      console.log(`Data for ${questName} fetch and saved to cache.`);
    }
  } catch(error) {
    throw new Error(`Failed to fetch quests: ${error}`);
  }
}

/**
 * Get the names of all quests from the wiki
 * @returns {Promise<string[]>}
 */
async function getQuestNames() {
    try {
      //https://oldschool.runescape.wiki/api.php?action=query&format=json&prop=&list=categorymembers&formatversion=2&cmtitle=Category%3AQuests&cmlimit=500
      const url = new URL(WIKI_API_URL);
      const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        list: 'categorymembers',
        formatversion: '2',
        cmtitle: 'Category:Quests',
        cmlimit: '500',
      });
      url.search = params.toString();
      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
        },
      });
      /** @type {QuestPagesAPIResponse} */
      const data = await response.json();
      return filterQuestNames(data.query.categorymembers.map(page => page.title));
    } catch (error) {
      throw new Error(`Failed to get quest names: ${error}`);
    }
}

/**
 * Filter the quest names to only include quests that are in the quest list
 * @param {string[]} questNames
 * @returns {Promise<string[]>}
 */
async function filterQuestNames(questNames) {
  return questNames
  // These quests are not quests just wiki pages not needed in search results.
  .filter(questName => !questName.startsWith('Category:'))
  .filter(questName => !questName.startsWith('Quest'))
  .filter(questName => !questName.startsWith('Recipe for Disaster/'))
  .filter(questName => questName !== 'User:Jayden/Sandbox')
  // These quests are unreleased
  .filter(questName => questName !== 'Pandemonium')
  .filter(questName => questName !== 'The Blood Moon Rises')
  .filter(questName => questName !== 'The Final Dawn')
  // This quest is a guide, not a quest
  .filter(questName => questName !== 'Optimal quest guide')
  // This quest is a page, not a quest
  .filter(questName => questName !== 'Cutscene')
}

/**
 * Get the data for a quest from the wiki
 * @param {string} questName
 * @returns {Promise<QuestData>}
 */
async function getQuestData(questName) {
  try {
    // https://oldschool.runescape.wiki/api.php?action=query&format=json&prop=revisions&titles=Cook's%20Assistant&formatversion=2&rvprop=content
    const url = new URL(WIKI_API_URL);
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      prop: 'revisions',
      titles: questName,
      formatversion: '2',
      rvprop: 'content',
    })
    url.search = params.toString();
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    /** @type {QuestDataAPIResponse} */
    const data = await response.json();
    return data.query.pages[0].revisions[0].content;
  } catch (error) {
    throw new Error(`Failed to get quest data: ${error}`);
  }
}

async function getCachedQuestData() {
  if (!fs.existsSync(CACHE_FILE)) {
    return null;
  }
  const cache = fs.readFileSync(CACHE_FILE, 'utf8');
  return JSON.parse(cache);
}

async function writeQuestDataToCache(normalizedQuestName, questData) {
  let cache = {}
  if (fs.existsSync(CACHE_FILE)) {  
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  }
  cache[normalizedQuestName] = questData;
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

main().catch(console.error);