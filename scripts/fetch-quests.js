import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WIKI_API_URL = 'https://oldschool.runescape.wiki/api.php?action=ask&format=json&query=%5B%5BQuest%20JSON%3A%3A%2B%5D%5D%7C%3FQuest%20JSON%7Climit%3D10000&api_version=2';
const USER_AGENT = 'quest-planner';
const LOCAL_DATA_PATH = path.join(process.cwd(), 'src', 'lib', 'data', 'data_output.json');

function decodeHtmlEntities(str) {
    return str.replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&#123;/g, '{')
              .replace(/&#125;/g, '}')
              .replace(/&#91;/g, '[')
              .replace(/&#93;/g, ']');
}

function generateQuestId(name) {
    // Replace spaces with underscores and remove all other special characters
    return name
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove all special characters except spaces
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .toLowerCase(); // Convert to lowercase
}

async function fetchQuests() {
    const response = await fetch(WIKI_API_URL, {
        headers: {
            'User-Agent': USER_AGENT
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch quest data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Debug the API response
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (data.error) {
        throw new Error(`API Error: ${data.error.info}`);
    }
    
    return data;
}

function parseQuestData(rawData) {
    const quests = [];
    
    for (const [id, data] of Object.entries(rawData)) {
        try {
            // Extract quest points from the details field
            const qpMatch = data.details.match(/\|qp\s*=\s*(\d+)/);
            const questPoints = qpMatch ? parseInt(qpMatch[1]) : 1; // Default to 1 if not found

            // Extract rewards from the details field
            const rewardsMatch = data.details.match(/\|rewards\s*=\s*([^}]+)/);
            const rewards = rewardsMatch ? rewardsMatch[1].trim() : '';

            const quest = {
                id,
                name: data.name,
                description: data.description,
                difficulty: data.difficulty,
                length: data.length,
                questPoints,
                rewards,
                start: data.start,
                ironman: data.ironman || false
            };
            
            quests.push(quest);
        } catch (error) {
            console.error(`Error processing quest ${id}:`, error);
        }
    }
    
    return quests;
}

async function main() {
    console.log('Fetching quest data from OSRS Wiki...');
    
    try {
        const rawData = await fetchQuests();
        console.log('Successfully fetched data from wiki');
        
        // Parse the data
        const questData = parseQuestData(rawData);
        
        // Write to output file
        const outputPath = path.join(process.cwd(), 'src', 'lib', 'data', 'quests.json');
        fs.writeFileSync(outputPath, JSON.stringify(questData, null, 2));
        
        console.log(`Successfully processed ${Object.keys(questData).length} quests`);
        console.log(`Data written to ${outputPath}`);
    } catch (error) {
        console.error('Failed to fetch or process quest data:', error);
        process.exit(1);
    }
}

main().catch(console.error); 