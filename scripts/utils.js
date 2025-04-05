/**
 * Normalize a quest name to use as an ID
 * @param {string} questName
 * @returns {string}
return questName
 */
export function normalizeQuestName(questName) {
  return questName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_');
}