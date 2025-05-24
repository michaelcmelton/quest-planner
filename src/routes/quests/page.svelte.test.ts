import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Page from './+page.svelte';

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
        skills: [
          {
            skill: 'Attack',
            level: 30,
            boostable: true,
            required: true,
            link: '[[Attack level|Attack]]'
          }
        ],
        quests: [],
        other: []
      },
      rewards: {
        questPoints: 2,
        experienceRewards: [
          { skill: 'Attack', amount: 1000 }
        ],
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

describe('Quests Page', () => {
  it('renders quest cards for all quests', () => {
    render(Page);
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.getByText('Another Quest')).toBeInTheDocument();
  });

  it('filters quests by search term', async () => {
    render(Page);
    const searchInput = screen.getByPlaceholderText('Search quests...');
    
    // Search for "Test"
    await fireEvent.input(searchInput, { target: { value: 'Test' } });
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
    
    // Search for "Another"
    await fireEvent.input(searchInput, { target: { value: 'Another' } });
    expect(screen.queryByText('Test Quest')).not.toBeInTheDocument();
    expect(screen.getByText('Another Quest')).toBeInTheDocument();
  });

  it('filters quests by difficulty', async () => {
    render(Page);
    const filterButton = screen.getByText('Filters');
    await fireEvent.click(filterButton);
    
    const difficultySection = screen.getByText('Difficulty').closest('.filter-section');
    const difficultySelect = difficultySection?.querySelector('select');
    expect(difficultySelect).toBeInTheDocument();
    await fireEvent.change(difficultySelect!, { target: { value: 'Intermediate' } });
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('filters quests by membership status', async () => {
    render(Page);
    const filterButton = screen.getByText('Filters');
    await fireEvent.click(filterButton);
    
    const membershipSection = screen.getByText('Membership').closest('.filter-section');
    const membershipSelect = membershipSection?.querySelector('select');
    expect(membershipSelect).toBeInTheDocument();
    await fireEvent.change(membershipSelect!, { target: { value: 'Members' } });
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('filters quests by required skill', async () => {
    render(Page);
    const filterButton = screen.getByText('Filters');
    await fireEvent.click(filterButton);
    
    const requiredSkillSection = screen.getByText('Required Skill').closest('.filter-section');
    const requiredSkillSelect = requiredSkillSection?.querySelector('select');
    expect(requiredSkillSelect).toBeInTheDocument();
    await fireEvent.change(requiredSkillSelect!, { target: { value: 'Attack' } });
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('filters quests by reward skill', async () => {
    render(Page);
    const filterButton = screen.getByText('Filters');
    await fireEvent.click(filterButton);
    
    const rewardSkillSection = screen.getByText('Reward Skill').closest('.filter-section');
    const rewardSkillSelect = rewardSkillSection?.querySelector('select');
    expect(rewardSkillSelect).toBeInTheDocument();
    await fireEvent.change(rewardSkillSelect!, { target: { value: 'Attack' } });
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('combines multiple filters', async () => {
    render(Page);
    const filterButton = screen.getByText('Filters');
    await fireEvent.click(filterButton);
    
    // Set multiple filters
    const difficultySection = screen.getByText('Difficulty').closest('.filter-section');
    const membershipSection = screen.getByText('Membership').closest('.filter-section');
    const requiredSkillSection = screen.getByText('Required Skill').closest('.filter-section');
    
    const difficultySelect = difficultySection?.querySelector('select');
    const membershipSelect = membershipSection?.querySelector('select');
    const requiredSkillSelect = requiredSkillSection?.querySelector('select');
    
    expect(difficultySelect).toBeInTheDocument();
    expect(membershipSelect).toBeInTheDocument();
    expect(requiredSkillSelect).toBeInTheDocument();
    
    await fireEvent.change(difficultySelect!, { target: { value: 'Intermediate' } });
    await fireEvent.change(membershipSelect!, { target: { value: 'Members' } });
    await fireEvent.change(requiredSkillSelect!, { target: { value: 'Attack' } });
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.queryByText('Another Quest')).not.toBeInTheDocument();
  });

  it('toggles filter menu visibility', async () => {
    render(Page);
    const filterButton = screen.getByText('Filters');
    const filterMenu = screen.getByText('Difficulty').closest('.filter-menu');
    
    // Menu should be hidden initially
    expect(filterMenu).not.toHaveClass('open');
    
    // Open menu
    await fireEvent.click(filterButton);
    expect(filterMenu).toHaveClass('open');
    
    // Close menu
    await fireEvent.click(filterButton);
    expect(filterMenu).not.toHaveClass('open');
  });
}); 