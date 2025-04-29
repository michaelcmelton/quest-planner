# Quest Data Collection Scripts

This directory contains scripts for collecting and processing quest data from the Old School RuneScape Wiki.

## Scripts Overview

### `fetch-quests.js`
- Fetches quest data from the OSRS Wiki API
- Caches the raw wiki data in `quests-cache.json`
- Handles API requests with proper rate limiting and error handling
- Uses a custom user agent for API requests

### `generate-quest-data.js`
- Processes the cached wiki data into a structured format
- Extracts quest information including:
  - Quest requirements
  - Rewards
  - Details
- Outputs the processed data to `src/lib/data/quests.json`

### `download-skill-icons.js`
- Downloads skill icons from the OSRS Wiki
- Saves icons to `static/icons/skills/`
- Handles all OSRS skills including special cases for Quests and Combat level (utilizing the multicombat icon)

### `parser.js`
- Contains the core parsing logic for quest data
- Extracts structured information from wiki markup
- Includes functions for parsing:
  - Quest infoboxes
  - Quest rewards
  - Quest details

### `parser.test.js`
- Unit tests for the parser functionality
- Ensures accurate parsing of quest data

### `utils.js`
- Contains utility functions used across scripts
- Includes functions for normalizing quest names and other common operations

### `constants.js`
- Defines constants used across scripts
- Contains:
  - List of OSRS skills
  - Wiki API URLs
  - File paths
  - User agent information

## Usage

You can run these scripts using npm commands:

1. Fetch quest data from the OSRS Wiki:
```bash
npm run quests:fetch
```

2. Generate processed quest data:
```bash
npm run quests:generate
```

3. Download skill icons:
```bash
npm run quests:icons
```

4. Run all quest data updates in sequence:
```bash
npm run quests:update
```

Alternatively, you can run the scripts directly:

```bash
node scripts/fetch-quests.js
node scripts/generate-quest-data.js
node scripts/download-skill-icons.js
```

## Dependencies

These scripts require Node.js and use the following built-in modules:
- `fs`
- `path`
- `https`
- `url`

## Data Flow

1. `fetch-quests.js` → `quests-cache.json` (raw wiki data)
2. `generate-quest-data.js` → `src/lib/data/quests.json` (processed quest data)
3. `download-skill-icons.js` → `static/icons/skills/` (skill icons)

## Notes

- The scripts use the OSRS Wiki API with proper rate limiting
- All API requests include a custom user agent
- Data is cached to minimize API calls
- The parser handles various wiki markup formats 