
export type QuestData = {
    requirements: string;
    desc?: string;
    difficulty?: string;
    kills?: string;
    name: string;
    start: string;
    length: string;
    items: string;
    ironman?: string;
    quests?: Array<string>;
    id?: string;
};

export type QuestPayload = Record<string, QuestData>;