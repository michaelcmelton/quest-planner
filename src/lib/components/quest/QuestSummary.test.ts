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
      skills: [
        { name: 'Cooking', level: 10 },
        { name: 'Fishing', level: 20 }
      ],
      items: ['Bucket of milk', 'Pot of flour', 'Egg']
    },
    isCompleted: false
  };

  it('renders the quest name', () => {
    render(QuestSummary, { quest: mockQuest });
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument();
  });

  it('displays difficulty as a tag', () => {
    render(QuestSummary, { quest: mockQuest });
    const difficultyTag = screen.getByText('Novice');
    expect(difficultyTag).toBeInTheDocument();
    expect(difficultyTag).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('displays length as a tag', () => {
    render(QuestSummary, { quest: mockQuest });
    const lengthTag = screen.getByText('Very Short');
    expect(lengthTag).toBeInTheDocument();
    expect(lengthTag).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('displays quest points as a tag', () => {
    render(QuestSummary, { quest: mockQuest });
    const qpTag = screen.getByText('1 QP');
    expect(qpTag).toBeInTheDocument();
    expect(qpTag).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('shows completion status as a tag', () => {
    render(QuestSummary, { quest: mockQuest });
    const statusTag = screen.getByText('Incomplete');
    expect(statusTag).toBeInTheDocument();
    expect(statusTag).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('displays skill requirements as tags with icons and levels', () => {
    render(QuestSummary, { quest: mockQuest });
    
    // Check Cooking skill tag
    const cookingTag = screen.getByText('10');
    expect(cookingTag).toBeInTheDocument();
    expect(cookingTag.parentElement).toHaveClass('bg-blue-100', 'text-blue-800');
    const cookingIcon = screen.getByAltText('Cooking');
    expect(cookingIcon).toBeInTheDocument();
    expect(cookingIcon).toHaveAttribute('src', '/icons/skills/cooking-icon.png');
    
    // Check Fishing skill tag
    const fishingTag = screen.getByText('20');
    expect(fishingTag).toBeInTheDocument();
    expect(fishingTag.parentElement).toHaveClass('bg-green-100', 'text-green-800');
    const fishingIcon = screen.getByAltText('Fishing');
    expect(fishingIcon).toBeInTheDocument();
    expect(fishingIcon).toHaveAttribute('src', '/icons/skills/fishing-icon.png');
  });

  it('applies correct color classes based on skill level', () => {
    const highLevelQuest: QuestSummaryProps = {
      ...mockQuest,
      requirements: {
        ...mockQuest.requirements,
        skills: [
          { name: 'Attack', level: 80 },
          { name: 'Strength', level: 60 },
          { name: 'Defence', level: 40 },
          { name: 'Ranged', level: 20 },
          { name: 'Prayer', level: 1 }
        ]
      }
    };

    render(QuestSummary, { quest: highLevelQuest });

    // Level 80+ (red)
    expect(screen.getByText('80').parentElement).toHaveClass('bg-red-100', 'text-red-800');
    
    // Level 60-79 (orange)
    expect(screen.getByText('60').parentElement).toHaveClass('bg-orange-100', 'text-orange-800');
    
    // Level 40-59 (yellow)
    expect(screen.getByText('40').parentElement).toHaveClass('bg-yellow-100', 'text-yellow-800');
    
    // Level 20-39 (green)
    expect(screen.getByText('20').parentElement).toHaveClass('bg-green-100', 'text-green-800');
    
    // Level 1-19 (blue)
    expect(screen.getByText('1').parentElement).toHaveClass('bg-blue-100', 'text-blue-800');
  });
}); 