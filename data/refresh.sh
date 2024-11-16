#! /bin/sh

# Get JSON
curl https://oldschool.runescape.wiki/api.php\?action\=ask\&format\=json\&query\=%5B%5BQuest%20JSON%3A%3A%2B%5D%5D%7C%3FQuest%20JSON%7Climit%3D10000\&formatversion\=2 > ./quest_json.json

# prevent the printing of the directory with command substitution
sed -iE 's/\* /*/g' "./quest_json.json"

echo $(cat ./quest_json.json | jq '.query.results') > ./quest_json.json

# Replace HTML Enitities with proper characters
FILE_CONTENTS=$(cat quest_json.json | perl -CS -MHTML::Entities -ne 'print decode_entities($_)') 

# Replace ''' with '
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/\'\'\'/'/g')

# Replace \\" with "
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/\\"/"/g')

# Delete occurences of \\ 
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/\\\\//g')

# Delete occurences of [[
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/\[\[//g')

# Delete occurences of ]]
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/\]\]//g')

# Delete ocurrences of ["
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/\[ "//g')

# Delete occurences of "]
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/" \]//g')

# CSS escape fixes
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/class="([a-z0-9 -]+)"/class=\\"\1\\"/g')
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/data\-level="([0-9\/]+)"/data\-level=\\"\1\\"/g')
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/data\-skill="([A-Za-z;0-9 ]+)"/data\-skill=\\"\1\\"/g')
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/title="([a-zA-Z 0-9;]+)"/title=\\"\1\\"/g')
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/style="([a-zA-Z:; 0-9-]+)"/style=\\"\1\\"/g')
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E "s/\'\"\`UNIQ.+\`\"\'//g")
FILE_CONTENTS=$(echo $FILE_CONTENTS | sed -E 's/SMW\\Serializers\\QueryResultSerializer/SMW\\\\Serializers\\\\QueryResultSerializer/g')
echo "$FILE_CONTENTS" > ./updated.json

echo $(cat updated.json | jq 'with_entries(.value |= .printouts."Quest JSON")') > ./updated.json