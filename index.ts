import fs from 'fs';

type TSkillRequirement = {
    name: string;
    level: number;
    experienceValue: number;
}

type TQuestRequirement = {
    skills: TSkillRequirement[];
    quests: TQuest[];
}

type TQuest = {
    name: string;
    id: string;
    requirements: any[];
    rawText: string;
    difficulty: string;
    length: string;
    description: string;
    url: string;
}