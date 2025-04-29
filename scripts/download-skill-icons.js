import fs from 'fs';
import path from 'path';
import https from 'https';
import { SKILLS, WIKI_STATIC_URL, USER_AGENT } from './constants.js';

const options = {
    headers: {
        'User-Agent': USER_AGENT,
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
        let url = `${WIKI_STATIC_URL}/${skill}_icon.png`;

        if (skill === 'Quests' || skill === 'Multicombat') {
            url = `${WIKI_STATIC_URL}/${skill}.png`;
        }   

        try {
            console.log(`Downloading ${skill} icon at ${url}...`);
            await downloadImage(url, filepath);
            console.log(`✓ Downloaded ${skill} icon`);
        } catch (error) {
            console.error(`✗ Failed to download ${skill} icon:`, error.message);
        }
    }

    console.log('\nDownload complete!');
}

main().catch(console.error);

