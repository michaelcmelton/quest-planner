#! /usr/bin/sh
curl https://oldschool.runescape.wiki/api.php\?action\=ask\&format\=json\&query\=%5B%5BQuest%20JSON%3A%3A%2B%5D%5D%7C%3FQuest%20JSON%7Climit%3D10000\&formatversion\=2 > quest_json.json

cat quest_json.json | perl -CS -MHTML::Entities -ne 'print decode_entities($_)' | sed 's/\'\'\'/'/g; s/\\n/\n/g; s/\\"/"/g; s/\\\\//g; s/\n/\\n/g; s/\[\[//g; s/\]\]//g; s/\["//g; s/"\]//g' | sed -E '' > quest_output.json