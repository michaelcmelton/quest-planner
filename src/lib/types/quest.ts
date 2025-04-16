export interface ExperienceReward {
  skill: string;
  amount: number;
}

export interface Rewards {
  questPoints: number;
  experienceRewards: ExperienceReward[];
  otherRewards: string[];
}

export interface SkillRequirement {
  skill: string;
  level: number;
  boostable: boolean;
  required: boolean;
  link: string;
}

export interface Requirements {
  skills: SkillRequirement[];
  quests: string[];
  other: string[];
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
  rewards: Rewards;
  start: string;
  startmap: string;
  difficulty: string;
  description: string;
  length: string;
  requirements: Requirements;
  items: string[];
  recommended: string[];
  kills: string[];
  ironman: string[];
  leagueRegion: string;
}

export interface QuestData {
  [key: string]: Quest;
} 

export type QuestKey = keyof QuestData & string;