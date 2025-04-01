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
 * Extracts the infobox data from the quest's raw data
 * @param {Object} questData - The raw quest data from the cache
 * @returns {Infobox} The parsed infobox data
 */
export function getInfobox(questData) {
  const infobox = {};
  
  // Extract infobox template content
  const infoboxMatch = questData.text?.match(/\{\{Infobox Quest\n([\s\S]*?)\}\}/);
  if (infoboxMatch) {
    const infoboxContent = infoboxMatch[1];
    const lines = infoboxContent.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const [key, value] = line.split('=').map(s => s.trim());
      if (key && value) {
        // Remove leading/trailing whitespace and any quotes
        infobox[key] = value.replace(/^['"]|['"]$/g, '').trim();
      }
    }
  }
  
  return infobox;
} 