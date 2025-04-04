/** 
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { getInfobox, getQuestRewards } from './parser.js';

describe('getInfobox', () => {
  it('should parse complete infobox data correctly', () => {
    const mockQuestData = `{{Infobox Quest
|name = Cook's Assistant
|number = 1
|image = Cook's Assistant.png
|release = 4 January 2001
|update = Update 2
|aka = Cooking Quest
|members = false
|series = Cooking
|developer = Andrew Gower
}}`;

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Cook\'s Assistant',
      number: 1,
      image: 'Cook\'s Assistant.png',
      release: '4 January 2001',
      update: 'Update 2',
      aka: 'Cooking Quest',
      members: 'false',
      series: 'Cooking',
      developer: 'Andrew Gower'
    });
  });

  it('should handle missing infobox data', () => {
    const mockQuestData = 'Some other content without infobox'

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({});
  });

  it('should handle partial infobox data', () => {
    const mockQuestData = `{{Infobox Quest
|name = Dragon Slayer
|members = true
}}`

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Dragon Slayer',
      members: 'true'
    });
  });

  it('should handle invalid number format', () => {
    const mockQuestData = `{{Infobox Quest
|number = invalid
}}`
    const result = getInfobox(mockQuestData);

    expect(result.number).toBe(0);
  });

  it('should handle quoted values', () => {
    const mockQuestData =  `{{Infobox Quest
|name = "Cook's Assistant"
|series = "Cooking Series"
}}`

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Cook\'s Assistant',
      series: 'Cooking Series'
    });
  });

  it('should correctly parse the DT I infobox', () => {
    const mockQuestData = `{{Infobox Quest
|name = Desert Treasure I
|number = 77
|image = [[File:Desert Treasure I.png|300px]]
|release = [[18 April]] [[2005]]
|update = Desert Treasure
|aka = DT, DT1
|members = Yes
|series = [[Quests/Series#Mahjarrat|Mahjarrat]], #7
|developer = James B
}}`

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Desert Treasure I',
      number: 77,
      image: 'Desert Treasure I.png|300px',
      release: '18 April 2005',
      update: 'Desert Treasure',
      aka: 'DT, DT1',
      members: 'Yes',
      series: 'Mahjarrat, #7',
      developer: 'James B'
    });
  });
});

describe('getQuestRewards', () => {
  it('should return the correct quest rewards', () => {
    const mockQuestData = `{{Quest rewards
|name = Monkey Madness II
|image = [[File:Monkey Madness II reward scroll.png]]
|qp = 4
|rewards =
*{{SCP|Quest|4}} [[Quest points]]
*{{SCP|Slayer|25,000}} [[Slayer]] experience
*{{SCP|Agility|20,000}} [[Agility]] experience
*{{SCP|Thieving|15,000}} [[Thieving]] experience
*{{SCP|Hunter|15,000}} [[Hunter]] experience
*Access to the [[Crash Site Cavern]]
*The ability to communicate with monkeys in [[Ape Atoll]] without the [[M'speak amulet]].
*All NPCs on the surface of [[Ape Atoll]] will be non-aggressive without requiring the use of [[Monkey greegree]]s. 
*Access to [[Ape Atoll]] bank and [[Oobapohk's Javelin Store]]. 
*Access to new glider spot directly to Ape Atoll.
*2x 50,000 [[Experience]] rewards from [[Duke]] in your choice of [[Magic]], [[Ranged]], [[Attack]], [[Defence]], [[Strength]] or [[Hitpoints]]. Found on the hill east of main gate of Ape Atoll. (Walk up west hill, and climb the ladder to reach the east hill.)
*Ability to wield the [[Heavy Ballista]].
*A [[Royal seed pod]], which provides unlimited teleports to the [[Grand Tree]] (Up to level 30 wilderness).
*A [[Monkey (Monkey Madness II)|Monkey]] can be found in one of the crates at the Crash Site. It is purely cosmetic and can be equipped in the cape slot.
*The ability to re-fight [[Glough]] by gazing into the [[Burning brazier]] in [[Zooknock]]s house.
*Access to a new [[Maniacal monkey (Hunter)|maniacal monkey]] hunting area where Glough's laboratory used to be in [[Kruk's Dungeon]].
}}`;

    const result = getQuestRewards(mockQuestData);

    expect(result).toEqual({
      questPoints: 4,
      experienceRewards: [
        { skill: 'Slayer', amount: 25000 },
        { skill: 'Agility', amount: 20000 },
        { skill: 'Thieving', amount: 15000 },
        { skill: 'Hunter', amount: 15000 },
      ],
      otherRewards: [
        'Access to the [[Crash Site Cavern]]',
        'The ability to communicate with monkeys in [[Ape Atoll]] without the [[M\'speak amulet]].',
        'All NPCs on the surface of [[Ape Atoll]] will be non-aggressive without requiring the use of [[Monkey greegree]]s.',
        'Access to [[Ape Atoll]] bank and [[Oobapohk\'s Javelin Store]].',
        'Access to new glider spot directly to Ape Atoll.',
        '2x 50,000 [[Experience]] rewards from [[Duke]] in your choice of [[Magic]], [[Ranged]], [[Attack]], [[Defence]], [[Strength]] or [[Hitpoints]]. Found on the hill east of main gate of Ape Atoll. (Walk up west hill, and climb the ladder to reach the east hill.)',
        'Ability to wield the [[Heavy Ballista]].',
        'A [[Royal seed pod]], which provides unlimited teleports to the [[Grand Tree]] (Up to level 30 wilderness).',
        'A [[Monkey (Monkey Madness II)|Monkey]] can be found in one of the crates at the Crash Site. It is purely cosmetic and can be equipped in the cape slot.',
        'The ability to re-fight [[Glough]] by gazing into the [[Burning brazier]] in [[Zooknock]]s house.',
        'Access to a new [[Maniacal monkey (Hunter)|maniacal monkey]] hunting area where Glough\'s laboratory used to be in [[Kruk\'s Dungeon]].',
      ],
    });
  });
});

// describe('getQuestDetails', () => {
//   it('should parse complete quest details correctly', () => {
//     const mockQuestData = `{{Quest details
// |start = [[File:Quest start location.png|30x30px]] [[Quest start location]]
// |startmap = 4444,4444,plane:1
// |difficulty = Master
// |length = Long
// |requirements = *{{SCP|Thieving|54|link=yes}} {{Boostable|}}
// *{{SCP|Woodcutting|52|link=yes}} {{Boostable|}}
// *{{SCP|Herblore|49|link=yes}}
// |items = *[[Rope]]
// *[[Tinderbox]]
// *[[Bucket]]
// |recommended = *[[Combat equipment]]
// *[[Food]]
// *[[Prayer potion]]
// |kills = *[[Giant rat]]
// *[[Skeleton]]
// |ironman = *Bring your own supplies
// *Consider using [[Prayer potion]]s
// }}`;

//     const result = getQuestDetails(mockQuestData);

//     expect(result).toEqual({
//       start: 'Quest start location',
//       startmap: '4444,4444,plane:1',
//       difficulty: 'Master',
//       length: 'Long',
//       requirements: [
//         { skill: 'Thieving', level: 54, boostable: true },
//         { skill: 'Woodcutting', level: 52, boostable: true },
//         { skill: 'Herblore', level: 49, boostable: false }
//       ],
//       items: ['Rope', 'Tinderbox', 'Bucket'],
//       recommended: ['Combat equipment', 'Food', 'Prayer potion'],
//       kills: ['Giant rat', 'Skeleton'],
//       ironman: ['Bring your own supplies', 'Consider using Prayer potions']
//     });
//   });

//   it('should handle missing quest details data', () => {
//     const mockQuestData = 'Some other content without quest details';
//     const result = getQuestDetails(mockQuestData);

//     expect(result).toEqual({
//       start: '',
//       difficulty: '',
//       length: '',
//       requirements: [],
//       items: [],
//       recommended: [],
//       kills: [],
//       ironman: []
//     });
//   });

//   it('should handle partial quest details data', () => {
//     const mockQuestData = `{{Quest details
// |start = [[Quest start location]]
// |difficulty = Novice
// |length = Very Short
// |requirements = *{{SCP|Cooking|1}}
// |items = *[[Bucket]]
// }}`;

//     const result = getQuestDetails(mockQuestData);

//     expect(result).toEqual({
//       start: 'Quest start location',
//       difficulty: 'Novice',
//       length: 'Very Short',
//       requirements: [
//         { skill: 'Cooking', level: 1, boostable: false }
//       ],
//       items: ['Bucket'],
//       recommended: [],
//       kills: [],
//       ironman: []
//     });
//   });

//   it('should handle empty values in quest details', () => {
//     const mockQuestData = `{{Quest details
// |start = 
// |difficulty = 
// |length = 
// |requirements = 
// |items = 
// |recommended = 
// |kills = 
// |ironman = 
// }}`;

//     const result = getQuestDetails(mockQuestData);

//     expect(result).toEqual({
//       start: '',
//       difficulty: '',
//       length: '',
//       requirements: [],
//       items: [],
//       recommended: [],
//       kills: [],
//       ironman: []
//     });
//   });

//   it('should handle malformed skill requirements', () => {
//     const mockQuestData = `{{Quest details
// |requirements = *Invalid format
// *{{SCP|Valid|50}}
// }}`;

//     const result = getQuestDetails(mockQuestData);

//     expect(result.requirements).toEqual([
//       { skill: 'Valid', level: 50, boostable: false }
//     ]);
//   });

//   it('should correctly parse the quest requirements for DT II', () => {
//     const mockQuestData = `{{Quest details
// |start = Investigate the [[Ancient Vault]] north-east of [[Nardah]].
// |startmap = 3511,2971
// |difficulty = Grandmaster
// |description = During Gielinor's Second Age, the world was dominated by an empire the likes of which had never been seen. The areas now known as Asgarnia, Misthalin and even the Wilderness all once flourished under the banner of the Empty Lord. With the grand city of Senntisten at its heart, this civilisation washed over Gielinor like an unstoppable tide, pushing the boundaries of magic and science, while crushing any who stood in their way.

// Fast forward to today, the Fifth Age, and you won't find much trace of this ancient empire. Indeed, Saradominists and Zamorakians alike have spent many lifetimes purging all remnants of it. However, small fragments of this fallen empire remain, for those who know where to look.

// Perhaps you’ve already encountered some of these remains. Maybe you’ve met the monstrous Nex, sealed behind the Frozen Door for millennia. Or perhaps you’ve visited the bandits of the Kharidian Desert, the final human followers of the Empty Lord. You might even have encountered some mysterious Mahjarrat hidden away beneath those same sands. However, there are other parts of this forgotten empire that even you won’t have encountered yet. For example, this story begins deep in the desert, within a mysterious vault...
// |length = Very Long
// |requirements = * {{SCP|Firemaking|75|link=yes}} {{Boostable|no}} {{Questreqstart|yes}}
// * {{SCP|Magic|75|link=yes}} {{Boostable|no}} {{Questreqstart|yes}}
// * {{SCP|Thieving|70|link=yes}} {{Boostable|no}} {{Questreqstart|yes}}
// * {{SCP|Herblore|62|link=yes}} {{Boostable|no}} {{Questreqstart|yes}}
// * {{SCP|Runecraft|60|link=yes}} {{Boostable|no}} {{Questreqstart|yes}}
// * {{SCP|Construction|60|link=yes}} {{Boostable|no}} {{Questreqstart|yes}}
// *Completion of the following quests:
// **[[Desert Treasure I]]
// ***[[The Dig Site]]
// ***[[Temple of Ikov]]
// ***[[The Tourist Trap]]
// ***[[Troll Stronghold]]
// ****[[Death Plateau]]
// ***[[Priest in Peril]]
// ***[[Waterfall Quest]]
// **[[Secrets of the North]]
// ***[[Making Friends with My Arm]]
// ****[[My Arm's Big Adventure]]
// *****[[Eadgar's Ruse]]
// ******[[Druidic Ritual]]
// ******[[Troll Stronghold]]
// *******[[Death Plateau]]
// *****[[The Feud]]
// *****[[Jungle Potion]]
// ****[[Swan Song]]
// *****[[One Small Favour]]
// ******[[Rune Mysteries]]
// ******[[Shilo Village]]
// *****[[Garden of Tranquillity]]
// ******[[Creature of Fenkenstrain]]
// *******[[Priest in Peril]]
// *******[[The Restless Ghost]]
// ****[[Cold War]]
// ****[[Romeo & Juliet]]
// ***[[The General's Shadow]]
// ****[[Curse of the Empty Lord]], for full [[ghostly robes]]
// ****[[Fight Arena]]
// ***[[Devious Minds]]
// ****[[Wanted!]]
// *****[[Recruitment Drive]]
// ******[[Black Knights' Fortress]]
// ******[[Druidic Ritual]]
// *****[[The Lost Tribe]]
// ******[[Goblin Diplomacy]]
// ******[[Rune Mysteries]]
// *****[[Priest in Peril]]
// ****[[Troll Stronghold]]
// *****[[Death Plateau]]
// ****[[Doric's Quest]]
// ****[[Enter the Abyss]]
// ***[[Hazeel Cult]]
// **[[Enakhra's Lament]]
// **[[Temple of the Eye]]
// ***[[Enter the Abyss]]
// ****[[Rune Mysteries]]
// **[[The Garden of Death]]
// **[[Below Ice Mountain]]
// **[[His Faithful Servants]]
// ***[[Priest in Peril]]
// |items = * Be on the [[Ancient Magicks]] spellbook
// * Runes to cast [[Blood Burst]], [[Ice Burst]], [[Smoke Burst]], and [[Shadow Burst]]
// **8 [[Death rune]]s 
// **16 [[Chaos rune]]s 
// **2 [[Fire rune]]s 
// **3 [[Air rune]]s 
// **4 [[Water rune]]s 
// **2 [[Soul rune]]s 
// **2 [[Blood rune]]s
// * [[Ring of visibility]]
// * [[Tinderbox]] (can be obtained during quest)
// * [[Pestle and mortar]] (can be obtained during quest)
// * [[Pickaxe]] (can be obtained during quest)
// * Facemask or Slayer helm
// |recommended = * {{SCP|Combat|100|link=yes}}
// * [[Digsite teleport]]
// * [[Desert heat]] protection
// * [[Desert amulet 4]] or [[Nardah teleport]]
// * [[Xeric's talisman]] or access to it in [[POH]]
// * [[Stamina potion]]s
// |kills = * [[Ancient Guardian (Desert Treasure II)|Ancient Guardian]] (level 153)
// * [[Vardorvis]] (level 572)
// * [[Kasonde]] (level 193)
// * A number of lesser demons, black demons, and abyssal creatures
// * [[The Leviathan]] (level 593)
// * [[Jhallan]] (level 491)
// * [[Duke Sucellus]] (level 538)
// * [[The Whisperer]] (level 587)
// * [[Mysterious Figure]] (level 271)
// * [[The Forsaken Assassin]] (level 252)
// * [[Ketla the Unworthy]] (level 236)
// * [[Kasonde the Craven]] (level 221)
// * [[Persten the Deceitful]] (level 264)
// |leagueRegion = <poem>
// Unlocking {{RE|Desert}} {{okay}} will auto-complete the quest
// Access to [[The Whisperer]] in {{RE|Asgarnia}}, [[Duke Sucellus]] in {{RE|Fremennik}}, and [[Vardorvis]] in {{RE|Varlamore}} do not require {{RE|Desert}} to be unlocked
// </poem>
// }}`

//     const result = getQuestDetails(mockQuestData);

//     expect(result).toEqual({
//       start: 'Investigate the [[Ancient Vault]] north-east of [[Nardah]].',
//       startmap: '3511,2971',
//       difficulty: 'Grandmaster',
//       length: 'Very Long',
//       requirements: {
//         skills: [
//           { skill: 'Firemaking', level: 75, boostable: false },
//           { skill: 'Magic', level: 75, boostable: false },
//           { skill: 'Thieving', level: 70, boostable: false },
//           { skill: 'Herblore', level: 62, boostable: false },
//           { skill: 'Runecraft', level: 60, boostable: false },
//           { skill: 'Construction', level: 60, boostable: false },
//         ],
//         quests: [
//           'desert_treasure_i',
//           'secrets_of_the_north',
//           'enakhras_lament',
//           'temple_of_the_eye',
//           'the_garden_of_death',
//           'below_ice_mountain',
//           'his_faithful_servants',
//         ]
//       },
//       items: [
//         'Be on the [[Ancient Magicks]] spellbook',
//         'Runes to cast [[Blood Burst]], [[Ice Burst]], [[Smoke Burst]], and [[Shadow Burst]]',
//         '[[Ring of visibility]]',
//         '[[Tinderbox]] (can be obtained during quest)',
//         '[[Pestle and mortar]] (can be obtained during quest)',
//         '[[Pickaxe]] (can be obtained during quest)',
//         'Facemask or Slayer helm',
//       ],
//       recommended: {
//         skills: [
//           { skill: 'Combat', level: 100, boostable: false },
//         ],
//         items: [
//           '[[Digsite teleport]]',
//           '[[Desert heat]] protection',
//           '[[Desert amulet 4]] or [[Nardah teleport]]',
//           '[[Xeric\'s talisman]] or access to it in [[POH]]',
//           '[[Stamina potion]]s',
//         ],
//       },
//       kills: [
//         '[[Ancient Guardian (Desert Treasure II)|Ancient Guardian]] (level 153)',
//         '[[Vardorvis]] (level 572)',
//         '[[Kasonde]] (level 193)',
//         'A number of lesser demons, black demons, and abyssal creatures',
//         '[[The Leviathan]] (level 593)',
//         '[[Jhallan]] (level 491)',
//         '[[Duke Sucellus]] (level 538)',
//         '[[The Whisperer]] (level 587)',
//         '[[Mysterious Figure]] (level 271)',
//         '[[The Forsaken Assassin]] (level 252)',
//         '[[Ketla the Unworthy]] (level 236)',
//         '[[Kasonde the Craven]] (level 221)',
//         '[[Persten the Deceitful]] (level 264)',
//       ],
//       leagueRegion: '<poem>Unlocking {{RE|Desert}} {{okay}} will auto-complete the questAccess to [[The Whisperer]] in {{RE|Asgarnia}}, [[Duke Sucellus]] in {{RE|Fremennik}}, and [[Vardorvis]] in {{RE|Varlamore}} do not require {{RE|Desert}} to be unlocked</poem>',
//     }) 
//   })
// });