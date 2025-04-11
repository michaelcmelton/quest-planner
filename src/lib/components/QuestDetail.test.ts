import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import QuestDetail from './QuestDetail.svelte';
import type { Quest } from '$lib/types/quest';

// Mock the skillIcons import
vi.mock('$lib/utils/static-paths', () => ({
  skillIcons: {
    'Quest': '/icons/Quest.png',
    'Attack': '/icons/Attack.png',
    'Magic': '/icons/Magic.png'
  }
}));

// Mock the formatWikitext function
vi.mock('$lib/utils/wikitext', () => ({
  formatWikitext: (text: string) => {
    // Simple mock that just removes wiki markup
    return text.replace(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, __, display) => display || _);
  }
}));

describe('QuestDetail Component', () => {
  const mockQuest: Quest = {
    id: 'test_quest',
    name: 'Test Quest',
    description: 'This is a test quest description with [[wikitext]]',
    difficulty: 'Intermediate',
    length: 'Medium',
    requirements: {
      skills: [
        { skill: 'Attack', level: 40, boostable: true, required: false, link: '[[Attack level|Attack]]' },
        { skill: 'Magic', level: 50, boostable: true, required: false, link: '[[Magic level|Magic]]' }
      ],
      quests: ['quest1', 'quest2'],
      other: ['Some other requirement']
    },
    rewards: {
      questPoints: 2,
      experienceRewards: [
        { skill: 'Attack', amount: 5000 },
        { skill: 'Magic', amount: 10000 }
      ],
      otherRewards: ['Item 1', 'Item 2', 'Other reward 1']
    },
    start: 'Talk to Test NPC in Test Location',
    members: true,
    number: 1,
    image: 'test.png',
    release: '2024-01-01',
    update: 'Test Update',
    series: 'Test Series',
    developer: 'Test Dev',
    startmap: '0,0',
    items: [],
    recommended: [],
    kills: [],
    ironman: [],
    leagueRegion: ''
  };

  const mockQuestNameMap: Record<string, string> = {
    'quest1': 'First Required Quest',
    'quest2': 'Second Required Quest'
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders quest name and description', () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    const descriptionElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             element?.innerHTML.includes('This is a test quest description with [[wikitext]]');
    });
    expect(descriptionElement).toBeInTheDocument();
  });

  it('displays basic quest information', () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('2 Quest Points')).toBeInTheDocument();
    expect(screen.getByText('Talk to Test NPC in Test Location')).toBeInTheDocument();
  });

  it('shows skill requirements', () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    const skillSection = screen.getByText('Skills').closest('div');
    expect(skillSection).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('Magic')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('displays required quests with mapped names', () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    expect(screen.getByText('First Required Quest')).toBeInTheDocument();
    expect(screen.getByText('Second Required Quest')).toBeInTheDocument();
  });

  it('shows other requirements', () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    expect(screen.getByText('Some other requirement')).toBeInTheDocument();
  });

  it('displays quest rewards', () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    // Experience rewards
    expect(screen.getByText('5,000 XP')).toBeInTheDocument();
    expect(screen.getByText('10,000 XP')).toBeInTheDocument();
    
    // Other rewards
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Other reward 1')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(QuestDetail, { quest: mockQuest, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    const closeButton = screen.getByLabelText('Close Modal');
    await fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles quests with no requirements gracefully', () => {
    const questWithNoReqs: Quest = {
      ...mockQuest,
      requirements: {
        skills: [],
        quests: [],
        other: []
      }
    };
    
    render(QuestDetail, { quest: questWithNoReqs, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    // The requirements sections should still be rendered but empty
    expect(screen.queryByText('Skills')).not.toBeInTheDocument();
    expect(screen.queryByText('Required Quests')).not.toBeInTheDocument();
    expect(screen.queryByText('Other Requirements')).not.toBeInTheDocument();
  });

  it('handles quests with no rewards gracefully', () => {
    const questWithNoRewards: Quest = {
      ...mockQuest,
      rewards: {
        questPoints: 0,
        experienceRewards: [],
        otherRewards: []
      }
    };
    
    render(QuestDetail, { quest: questWithNoRewards, questNameMap: mockQuestNameMap, onClose: mockOnClose });
    
    // The rewards section should still be rendered but empty
    expect(screen.queryByText('Experience Rewards')).not.toBeInTheDocument();
    expect(screen.getByText('0 Quest Points')).toBeInTheDocument();
  });
}); 