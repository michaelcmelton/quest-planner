import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import QuestCard from './QuestCard.svelte';
import type { Quest } from '$lib/types/quests';

describe('QuestCard', () => {
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
      experienceRewards: [
        { skill: 'Attack', amount: 1000 },
        { skill: 'Strength', amount: 1000 }
      ],
      otherRewards: ['Test Reward']
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
      other: ['Test requirement']
    },
    items: ['Test item'],
    recommended: [],
    kills: [],
    ironman: [],
    leagueRegion: ''
  };

  it('renders quest name and description', () => {
    render(QuestCard, { quest: mockQuest });
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.getByText('Test quest description')).toBeInTheDocument();
  });

  it('displays difficulty and membership badges', () => {
    render(QuestCard, { quest: mockQuest });
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
  });

  it('shows skill requirements with boostable and required tags', () => {
    render(QuestCard, { quest: mockQuest });
    
    // Check for skill requirements
    const attackReq = screen.getByText('30');
    expect(attackReq).toBeInTheDocument();
    expect(screen.getByText('Boostable')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    
    const strengthReq = screen.getByText('20');
    expect(strengthReq).toBeInTheDocument();
  });

  it('displays experience rewards', () => {
    render(QuestCard, { quest: mockQuest });
    
    // Check for XP amounts
    const xpRewards = screen.getAllByText('1000');
    expect(xpRewards).toHaveLength(2); // One for Attack, one for Strength
    
    // Check for reward skill icons
    const rewardsSection = screen.getByText('Rewards').closest('.skills-group');
    expect(rewardsSection).toBeInTheDocument();
    
    const rewardSkillIcons = rewardsSection?.querySelectorAll('.skill-tag.reward img');
    expect(rewardSkillIcons).toHaveLength(2); // One for Attack, one for Strength
    
    // Verify the rewards are in the correct context
    expect(rewardsSection?.querySelectorAll('.skill-tag.reward')).toHaveLength(2);
  });

  it('shows quest points', () => {
    render(QuestCard, { quest: mockQuest });
    expect(screen.getByText('Quest Points: 2')).toBeInTheDocument();
  });

  it('renders skill icons correctly', () => {
    render(QuestCard, { quest: mockQuest });
    const skillIcons = screen.getAllByRole('img', { name: /Attack|Strength/ });
    expect(skillIcons).toHaveLength(4); // 2 requirements + 2 rewards
    skillIcons.forEach(icon => {
      expect(icon).toHaveAttribute('src');
    });
  });

  it('handles quest with no requirements', () => {
    const questWithoutReqs = {
      ...mockQuest,
      requirements: {
        skills: [],
        quests: [],
        other: []
      }
    };
    render(QuestCard, { quest: questWithoutReqs });
    expect(screen.queryByText('Requirements')).not.toBeInTheDocument();
  });

  it('handles quest with no rewards', () => {
    const questWithoutRewards = {
      ...mockQuest,
      rewards: {
        questPoints: 0,
        experienceRewards: [],
        otherRewards: []
      }
    };
    render(QuestCard, { quest: questWithoutRewards });
    expect(screen.queryByText('Rewards')).not.toBeInTheDocument();
  });
}); 