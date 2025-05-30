import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import QuestListItem from './QuestListItem.svelte';
import type { Quest } from '$lib/types/quests';

describe('QuestListItem', () => {
  const mockQuest: Quest = {
    id: 'test_quest',
    name: 'Test Quest',
    number: 1,
    image: 'test.png',
    release: '2024-01-01',
    update: 'Test Update',
    members: true,
    series: 'Test Series',
    developer: 'Test Developer',
    rewards: {
      questPoints: 2,
      experienceRewards: [],
      otherRewards: []
    },
    start: 'Start location',
    startmap: '0,0',
    difficulty: 'Intermediate',
    description: 'Test quest description',
    length: 'Short',
    requirements: {
      skills: [
        {
          skill: 'Attack',
          level: 30,
          boostable: true,
          required: true,
          link: '[[Attack level|Attack]]'
        },
        {
          skill: 'Strength',
          level: 20,
          boostable: false,
          required: false,
          link: '[[Strength level|Strength]]'
        }
      ],
      quests: ['test_prereq'],
      other: []
    },
    items: [],
    recommended: [],
    kills: [],
    ironman: [],
    leagueRegion: ''
  };

  it('renders quest name and description', () => {
    render(QuestListItem, { props: { quest: mockQuest } });
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.getByText('Test quest description')).toBeInTheDocument();
  });

  it('displays members badge for members quest', () => {
    render(QuestListItem, { props: { quest: mockQuest } });
    expect(screen.getByText('Members')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    render(QuestListItem, { props: { quest: mockQuest } });
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });

  it('shows quest requirements summary', () => {
    render(QuestListItem, { props: { quest: mockQuest } });
    expect(screen.getByText('1 quest required')).toBeInTheDocument();
    expect(screen.getByText('• 1 skill required')).toBeInTheDocument();
  });

  it('shows only skill requirements if no quest requirements exist', () => {
    const questWithoutReqs = {
      ...mockQuest,
      requirements: {
        skills: [{ skill: 'Attack', level: 30, boostable: true, required: true, link: '[[Attack level|Attack]]' }],
        quests: [],
        other: []
      }
    };
    render(QuestListItem, { props: { quest: questWithoutReqs } });
    expect(screen.getByText('1 skill required')).toBeInTheDocument();
    expect(screen.queryByText('•')).not.toBeInTheDocument();
    expect(screen.queryByText(/quest required/)).not.toBeInTheDocument();
  });

  it('does not show requirements section if no requirements exist', () => {
    const questWithoutReqs = {
      ...mockQuest,
      requirements: {
        skills: [],
        quests: [],
        other: []
      }
    };
    render(QuestListItem, { props: { quest: questWithoutReqs } });
    expect(screen.queryByText(/quest required/)).not.toBeInTheDocument();
    expect(screen.queryByText(/skill required/)).not.toBeInTheDocument();
  });
}); 