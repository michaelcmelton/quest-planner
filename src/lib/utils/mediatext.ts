/**
 * Utility functions for parsing MediaText markup from OSRS Wiki
 */

const OSRS_WIKI_BASE_URL = 'https://oldschool.runescape.wiki';

/**
 * Parses MediaText markup into HTML
 * Handles basic wiki markup like [[links]], '''bold''', ''italic'', etc.
 * @param text The MediaText markup to parse
 * @returns Parsed HTML string
 */
export function parseMediaText(text: string): string {
    if (!text || text === 'None') return text;

    let parsed = text;

    // Clean up skill requirements format
    parsed = parsed.replace(/<span[^>]*?data-skill="([^"]+)"[^>]*?data-level="(\d+)"[^>]*?>.*?<\/span>/g, (match, skill, level) => {
        const url = `${OSRS_WIKI_BASE_URL}/w/${encodeURIComponent(skill.replace(/ /g, '_'))}`;
        const iconPath = `/icons/skills/${skill.toLowerCase()}-icon.png`;
        return `<span class="inline-flex items-center gap-1"><img src="${iconPath}" alt="${skill}" class="w-4 h-4" /><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">${skill}</a> ${level}</span>`;
    });

    // Handle wiki links with display text: [[page|display]]
    parsed = parsed.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, page, display) => {
        const url = `${OSRS_WIKI_BASE_URL}/w/${encodeURIComponent(page.replace(/ /g, '_'))}`;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">${display}</a>`;
    });

    // Handle simple wiki links: [[page]]
    parsed = parsed.replace(/\[\[([^\]]+)\]\]/g, (_, page) => {
        const url = `${OSRS_WIKI_BASE_URL}/w/${encodeURIComponent(page.replace(/ /g, '_'))}`;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline dark:text-blue-400">${page}</a>`;
    });

    // Handle bold text: '''text'''
    parsed = parsed.replace(/'''([^']+)'''/g, '<strong>$1</strong>');

    // Handle italic text: ''text''
    parsed = parsed.replace(/''([^']+)''/g, '<em>$1</em>');

    // Split into lines and process lists
    const lines = parsed.split('\n').map(line => line.trim()).filter(line => line);
    const processedLines = [];
    let listStack = [];
    let currentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const asteriskMatch = line.match(/^(\*+)\s*(.*)/);
        
        if (asteriskMatch) {
            const [, asterisks, content] = asteriskMatch;
            const level = asterisks.length;

            // Close deeper nested lists if we're going back up
            while (currentLevel > level) {
                processedLines.push('</ul>');
                listStack.pop();
                currentLevel--;
            }

            // Open new lists if we're going deeper
            while (currentLevel < level) {
                if (currentLevel === 0) {
                    processedLines.push('<ul class="list-disc list-inside my-2">');
                } else {
                    processedLines.push('<ul class="list-disc list-inside ml-4">');
                }
                listStack.push('ul');
                currentLevel++;
            }

            processedLines.push(`<li>${content}</li>`);
        } else {
            // Close all open lists when we hit a non-list line
            while (currentLevel > 0) {
                processedLines.push('</ul>');
                listStack.pop();
                currentLevel--;
            }
            processedLines.push(line);
            
            // Add line break if not the last line and next line isn't a list
            if (i < lines.length - 1 && !lines[i + 1].match(/^\*/)) {
                processedLines.push('<br>');
            }
        }
    }

    // Close any remaining open lists
    while (currentLevel > 0) {
        processedLines.push('</ul>');
        listStack.pop();
        currentLevel--;
    }

    // Join lines and clean up any extra whitespace
    return processedLines.join('').replace(/\s+/g, ' ').trim();
}