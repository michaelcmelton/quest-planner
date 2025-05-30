import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import AvailableQuestsPanel from './AvailableQuestsPanel.svelte';

// Mock the quests data
vi.mock('$lib/data/quests.json', () => ({
  default: {
    test_quest: {
      id: 'test_quest',
      name: 'Test Quest',
      description: 'Test quest description',
      difficulty: 'Intermediate',
      members: true,
      requirements: {
        skills: [],
        quests: [],
        other: []
      },
      rewards: {
        questPoints: 2,
        experienceRewards: [],
        otherRewards: []
      }
    },
    another_quest: {
      id: 'another_quest',
      name: 'Another Quest',
      description: 'Another quest description',
      difficulty: 'Novice',
      members: false,
      requirements: {
        skills: [],
        quests: [],
        other: []
      },
      rewards: {
        questPoints: 1,
        experienceRewards: [],
        otherRewards: []
      }
    }
  }
}));

describe('AvailableQuestsPanel', () => {
  it('renders all quests by default', () => {
    render(AvailableQuestsPanel);
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.getByText('Another Quest')).toBeInTheDocument();
  });

  it('filters quests by search term', async () => {
    render(AvailableQuestsPanel);
    const searchInput = screen.getByPlaceholderText('Search quests...');
    await fireEvent.input(searchInput, { target: { value: 'Test' } });
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('filters quests by difficulty', async () => {
    render(AvailableQuestsPanel);
    const difficultySelect = screen.getByTestId('difficulty-select');
    await fireEvent.change(difficultySelect, { target: { value: 'Novice' } });
    expect(screen.queryByText('Test Quest')).not.toBeInTheDocument();
    expect(screen.getByText('Another Quest')).toBeInTheDocument();
  });

  it('filters quests by membership', async () => {
    render(AvailableQuestsPanel);
    const membershipSelect = screen.getByTestId('membership-select');
    await fireEvent.change(membershipSelect, { target: { value: 'Members' } });
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('shows no quests found message when no quests match filters', async () => {
    render(AvailableQuestsPanel);
    const searchInput = screen.getByPlaceholderText('Search quests...');
    await fireEvent.input(searchInput, { target: { value: 'No Match' } });
    expect(screen.getByText('No quests found matching your criteria.')).toBeInTheDocument();
  });
}); 