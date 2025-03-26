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
    console.log('Raw data structure:', Object.keys(rawData));
    if (rawData.query) {
        console.log('Query structure:', Object.keys(rawData.query));
    }
    
    const quests = {};
    const questResults = rawData.query?.results;

    if (!questResults) {
        console.error('No quest results found in data');
        console.error('Raw data:', JSON.stringify(rawData, null, 2));
        return quests;
    }

    // Each key in questResults is a quest name
    for (const [questName, questData] of Object.entries(questResults)) {
        console.log('Processing quest:', questName);
        
        // Create a quest ID from the name
        const questId = generateQuestId(questName);
        
        // Get the actual quest data from printouts["Quest JSON"]
        if (!questData.printouts || !questData.printouts["Quest JSON"]) {
            console.warn(`No Quest JSON data found for ${questName}`);
            continue;
        }

        try {
            const decodedJson = decodeHtmlEntities(questData.printouts["Quest JSON"][0]);
            const questJson = JSON.parse(decodedJson);
            
            // Parse requirements
            const requirements = {};

            // Parse quest requirements
            if (questJson.requirements?.quests?.length > 0) {
                requirements.quests = questJson.requirements.quests.map(quest => ({
                    id: generateQuestId(quest.name),
                    name: quest.name
                }));
            }

            // Parse skill requirements
            if (questJson.requirements?.skills?.length > 0) {
                requirements.skills = questJson.requirements.skills.map(skill => ({
                    name: skill.skill,
                    level: skill.level
                }));
            }

            // Parse item requirements
            if (questJson.requirements?.items?.length > 0) {
                requirements.items = questJson.requirements.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity || 1
                }));
            }

            // Parse kill requirements
            if (questJson.requirements?.kills?.length > 0) {
                requirements.kills = questJson.requirements.kills.map(kill => ({
                    name: kill.name,
                    quantity: kill.quantity || 1
                }));
            }

            // Create the quest object
            quests[questId] = {
                id: questId,
                name: questName, // Use the original quest name from the key
                description: questJson.desc || '', // Use desc field from Quest JSON
                difficulty: questJson.difficulty || 'Novice',
                length: questJson.length || 'Medium',
                questPoints: questJson.questPoints || 0,
                requirements: Object.keys(requirements).length > 0 ? requirements : undefined,
                start: questJson.start || undefined,
                ironman: questJson.ironman || false
            };
        } catch (error) {
            console.error(`Error processing quest ${questName}:`, error);
            console.error('Raw JSON:', questData.printouts["Quest JSON"][0]);
            continue;
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