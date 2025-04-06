/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { QuestGraph } from './graph';
import type { QuestData } from '$lib/types/quest';
import fs from 'fs';

describe('QuestGraph', () => {
  let questData: QuestData;
  beforeEach(() => {
    questData = JSON.parse(fs.readFileSync('./src/lib/data/quests.json', 'utf8'));
  }); 

  it('should detect no circular dependencies', () => {
    const graph = new QuestGraph(Object.values(questData));
    expect(graph.hasCircularDependencies()).toBe(false);
  });

  it('should validate quest ordering if incorrect', () => {
    const invalidQuestRoute = [
      questData['desert_treasure_ii_the_fallen_empire'],
      questData['desert_treasure_i'],
    ]
    const graph = new QuestGraph(invalidQuestRoute);
    expect(graph.validateRouteWithDetails(invalidQuestRoute).isValid).toBe(false);
    expect(graph.validateRouteWithDetails(invalidQuestRoute).hasCycles).toBe(false);
    expect(graph.validateRouteWithDetails(invalidQuestRoute).invalidQuests.length).toBe(2);
    expect(graph.validateRouteWithDetails(invalidQuestRoute).invalidQuests[0].questId).toBe('desert_treasure_ii_the_fallen_empire');
  });

  it('should validate quest ordering if correct', () => {
    const validQuestRoute = [
      questData['the_dig_site'],
      questData['temple_of_ikov'],
      questData['the_tourist_trap'],
      questData['troll_stronghold'],
      questData['priest_in_peril'],
      questData['waterfall_quest'],
      questData['desert_treasure_i']
    ]
    const graph = new QuestGraph(validQuestRoute);
    expect(graph.validateRouteWithDetails(validQuestRoute).isValid).toBe(true);
    expect(graph.validateRouteWithDetails(validQuestRoute).hasCycles).toBe(false);
    expect(graph.validateRouteWithDetails(validQuestRoute).invalidQuests.length).toBe(0);
  });
});
