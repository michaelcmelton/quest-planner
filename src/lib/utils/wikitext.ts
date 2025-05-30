/**
 * Parses MediaWiki text and returns HTML with appropriate links
 * @param text The MediaWiki text to parse
 * @returns HTML string with parsed links
 */
export function parseWikiText(text: string): string {
  if (!text) return '';
  
  // Replace [[Link|Display Text]] with <a href="/wiki/Link">Display Text</a>
  // Replace [[Link]] with <a href="/wiki/Link">Link</a>
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, display) => {
    const displayText = display || link;
    const linkUrl = link.replace(/ /g, '_');
    return `<a href="https://oldschool.runescape.wiki/w/${encodeURIComponent(linkUrl)}" target="_blank" rel="noopener noreferrer">${displayText}</a>`;
  });
} 