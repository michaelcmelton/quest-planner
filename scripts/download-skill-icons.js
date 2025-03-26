import fs from 'fs';
import path from 'path';
import https from 'https';

const SKILLS = [
    'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged', 'Prayer',
    'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking',
    'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving',
    'Slayer', 'Farming', 'Runecraft', 'Hunter', 'Construction'
];

const WIKI_STATIC_URL = 'https://oldschool.runescape.wiki/images';

const options = {
    headers: {
        'User-Agent': 'Quest Planner/1.0 (https://github.com/yourusername/quest-planner)',
        'Accept': 'image/png'
    }
};

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (response) => {
            if (response.statusCode === 200) {
                response.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                response.resume();
                reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
            }
        });
    });
}

async function main() {
    const outputDir = path.join(process.cwd(), 'static', 'icons', 'skills');
    
    // Create the skills directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('Downloading skill icons...');

    for (const skill of SKILLS) {
        const filename = `${skill.toLowerCase()}-icon.png`;
        const filepath = path.join(outputDir, filename);
        const url = `${WIKI_STATIC_URL}/${skill}_icon.png`;

        try {
            console.log(`Downloading ${skill} icon...`);
            await downloadImage(url, filepath);
            console.log(`✓ Downloaded ${skill} icon`);
        } catch (error) {
            console.error(`✗ Failed to download ${skill} icon:`, error.message);
        }
    }

    console.log('\nDownload complete!');
}

main().catch(console.error);

