#!/bin/bash

# Fetch data from the API
curl "https://oldschool.runescape.wiki/api.php?action=ask&format=json&query=%5B%5BQuest%20JSON%3A%3A%2B%5D%5D%7C%3FQuest%20JSON%7Climit%3D10000&api_version=2" > ./data_output.json

# Decode HTML entities and fix formatting
input=$(cat ./data/data_output.json | jq '.query.results | with_entries(.value |= .printouts."Quest JSON"[0])')

# Decode HTML entities
decoded=$(echo "$input" |
    sed 's/&#123;/{/g' |          # Replace &#123; with {
    sed 's/&#125;/}/g' |          # Replace &#125; with }
    sed 's/&#91;&#91;/[[/g' |     # Replace &#91;&#91; with [[
    sed 's/&#93;&#93;/]]/g' |     # Replace &#93;&#93; with ]]
    sed 's/&#61;/=/g')            # Replace &#61; with =

# Parse the JSON string value for each key
parsed=$(echo "$decoded" | jq 'with_entries(.value |= fromjson)')

# Save the cleaned and parsed JSON to a file
echo "$parsed" > ./data/cleaned.json

# Print success message
echo "Cleaned and parsed JSON saved to ./data/cleaned.json"
