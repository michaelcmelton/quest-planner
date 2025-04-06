/**
 * Formats wikitext links into HTML links
 * @param text The text containing wikitext links
 * @returns The text with wikitext links converted to HTML links
 */
export function formatWikitext(text: string): string {
	return text.replace(
		/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
		(_, page, display) => {
			const pageName = page.trim();
			const displayText = display?.trim() || pageName;
			const url = `https://oldschool.runescape.wiki/w/${pageName.replace(/ /g, '_')}`;
			return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">${displayText}</a>`;
		}
	);
} 