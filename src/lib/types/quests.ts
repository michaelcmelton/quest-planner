export interface QuestReward {
    skill: string;
    amount: number;
}

export interface QuestRequirement {
    skill: string;
    level: number;
    boostable: boolean;
    required: boolean;
    link: string;
}

export interface Quest {
    id: string;
    name: string;
    number: number;
    image: string;
    release: string;
    update: string;
    members: boolean;
    series: string;
    developer: string;
    rewards: {
        questPoints: number;
        experienceRewards: QuestReward[];
        otherRewards: string[];
    };
    start: string;
    startmap: string;
    difficulty: string;
    description: string;
    length: string;
    requirements: {
        skills: QuestRequirement[];
        quests: string[];
        other: string[];
    };
    items: string[];
    recommended: string[];
    kills: string[];
    ironman: string[];
    leagueRegion: string;
}

export interface QuestsData {
    [key: string]: Quest;
} 