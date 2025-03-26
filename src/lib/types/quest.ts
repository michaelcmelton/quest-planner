export interface QuestRequirement {
    id: string;
    name: string;
}

export interface QuestRequirements {
    quests?: QuestRequirement[];
    skills?: {
        name: string;
        level: number;
    }[];
    items?: {
        name: string;
        quantity: number;
    }[];
    kills?: {
        name: string;
        quantity: number;
    }[];
}

export interface Quest {
    id: string;
    name: string;
    description: string;
    difficulty: 'Novice' | 'Intermediate' | 'Experienced' | 'Master' | 'Grandmaster';
    length: 'Short' | 'Medium' | 'Long' | 'Very Long';
    questPoints: number;
    requirements?: QuestRequirements;
    start?: string;
    ironman?: boolean;
} 