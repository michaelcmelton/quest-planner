import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import QuestSummary from './QuestSummary.svelte';
import type { QuestSummaryProps } from './QuestSummary.svelte';

describe('QuestSummary Component', () => {
  const mockQuest: QuestSummaryProps = {
    name: "Cook's Assistant",
    difficulty: 'Novice',
    length: 'Very Short',
    questPoints: 1,
    requirements: {
      quests: ['None'],
      skills: [],
      items: ['Bucket of milk', 'Pot of flour', 'Egg']
    },
    isCompleted: false
  };

  it('renders the quest name', () => {
    render(QuestSummary, { quest: mockQuest });
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument();
  });

  it('displays the difficulty level', () => {
    render(QuestSummary, { quest: mockQuest });
    expect(screen.getByText('Difficulty:')).toBeInTheDocument();
    expect(screen.getByText('Novice')).toBeInTheDocument();
  });

  it('displays the quest length', () => {
    render(QuestSummary, { quest: mockQuest });
    expect(screen.getByText('Length:')).toBeInTheDocument();
    expect(screen.getByText('Very Short')).toBeInTheDocument();
  });

  it('displays the quest points', () => {
    render(QuestSummary, { quest: mockQuest });
    expect(screen.getByText('Quest Points:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows completion status', () => {
    render(QuestSummary, { quest: mockQuest });
    expect(screen.getByText('Incomplete')).toBeInTheDocument();
  });

  it('displays required quests when present', () => {
    const questWithRequirements: QuestSummaryProps = {
      ...mockQuest,
      requirements: {
        ...mockQuest.requirements,
        quests: ['Dragon Slayer', 'Lost City']
      }
    };
    render(QuestSummary, { quest: questWithRequirements });
    expect(screen.getByText('Required Quests:')).toBeInTheDocument();
    expect(screen.getByText('Dragon Slayer')).toBeInTheDocument();
    expect(screen.getByText('Lost City')).toBeInTheDocument();
  });
}); 