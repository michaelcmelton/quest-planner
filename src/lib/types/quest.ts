export interface QuestData {
  name: string;
  number: number;
  image: string;
  release: string;
  update: string;
  members: string;
  series: string;
  developer: string;
  rewards: {
    questPoints: number;
    experienceRewards: Array<{
      skill: string;
      amount: number;
    }>;
    otherRewards: string[];
  };
  start: string;
  startmap: string;
  difficulty: string;
  description: string;
  length: string;
  requirements?: {
    skills?: Array<{
      skill: string;
      level: number;
      boostable: boolean;
      required: boolean;
      link?: string;
    }>;
    quests?: string[];
    other?: string[];
  };
  items?: string[];
  enemies?: Array<{
    name: string;
    level: number;
    quantity: number;
  }>;
  recommended?: {
    skills?: Array<{
      skill: string;
      level: number;
    }>;
    items?: string[];
  };
  walkthrough?: string[];
  notes?: string[];
  trivia?: string[];
  gallery?: Array<{
    image: string;
    caption: string;
  }>;
  leagueRegion?: string;
}

export interface QuestSummaryProps {
  name: string;
  difficulty: 'Novice' | 'Intermediate' | 'Experienced' | 'Master' | 'Grandmaster';
  length: 'Very Short' | 'Short' | 'Medium' | 'Long' | 'Very Long';
  questPoints: number;
  requirements: {
    quests?: string[];
    skills?: Array<{ name: string; level: number }>;
    items?: string[];
  };
  isCompleted?: boolean;
} 