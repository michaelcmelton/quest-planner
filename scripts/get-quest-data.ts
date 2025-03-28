import fetch from 'node-fetch';
import { UNRELEASED_QUESTS } from './constants.js';

interface CategoryMember {
    title: string;
    ns: number;
    pageid: number;
}

interface MediaWikiResponse {
    query: {
        categorymembers: CategoryMember[];
    };
}

export async function fetchQuestNames(): Promise<string[]> {
    try {
        // MediaWiki API endpoint for OSRS Wiki
        const apiUrl = 'https://oldschool.runescape.wiki/api.php';
        
        // Parameters for the API request
        const params = new URLSearchParams({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:Quests',
            cmlimit: '500', // Max limit to ensure we get all quests
            format: 'json',
            origin: '*'
        });

        const response = await fetch(`${apiUrl}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as MediaWikiResponse;
        
        // Extract quest names from the response
        const quests = data.query.categorymembers.map((quest) => quest.title);
        
        return quests;
    } catch (error) {
        console.error('Error fetching quest names:', error);
        throw error;
    }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
    fetchQuestNames()
        .then((quests) => {
            const filteredQuests =  quests.filter(quest => !quest.startsWith('Category:') && 
            !quest.startsWith('Quest') && 
            !quest.includes('/') &&
            quest !== 'Cutscene' &&
            quest !== 'Optimal quest guide' &&
            !UNRELEASED_QUESTS.includes(quest)
            );

            for (const quest of filteredQuests) {
                console.log(quest);
            }
        })
        .catch(console.error);
}

