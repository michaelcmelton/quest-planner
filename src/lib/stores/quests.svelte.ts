import questsData from '../data/quests.json';
import type { QuestData } from '../types/quest';

// Create a read-only store with the quest data
export const quests = $state<QuestData>(questsData);