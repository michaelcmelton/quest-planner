import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Page from './+page.svelte';

// Mock the quest data import
vi.mock('$lib/data/quests.json', () => ({
  default: {
    cooks_assistant: {
      name: "Cook's Assistant",
      difficulty: 'Novice',
      length: 'Very Short',
      rewards: {
        questPoints: 1
      },
      requirements: {
        skills: [
          { skill: 'Cooking', level: 10, boostable: false, required: true },
          { skill: 'Fishing', level: 20, boostable: false, required: true }
        ]
      }
    },
    dragon_slayer: {
      name: 'Dragon Slayer',
      difficulty: 'Experienced',
      length: 'Medium',
      rewards: {
        questPoints: 2
      },
      requirements: {
        skills: [
          { skill: 'Attack', level: 40, boostable: false, required: true },
          { skill: 'Strength', level: 30, boostable: false, required: true }
        ]
      }
    }
  }
}));

describe('Planner Page', () => {
  it('renders the page title', () => {
    render(Page);
    expect(screen.getByText('Quest Planner')).toBeInTheDocument();
  });

  it('renders quest summaries in a grid', () => {
    render(Page);
    const grid = screen.getByTestId('planner-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('displays quest names', () => {
    render(Page);
    expect(screen.getByText("Cook's Assistant")).toBeInTheDocument();
    expect(screen.getByText('Dragon Slayer')).toBeInTheDocument();
  });

  it('displays quest difficulty tags', () => {
    render(Page);
    expect(screen.getByText('Novice')).toBeInTheDocument();
    expect(screen.getByText('Experienced')).toBeInTheDocument();
  });

  it('displays quest length tags', () => {
    render(Page);
    expect(screen.getByText('Very Short')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('displays quest points tags', () => {
    render(Page);
    expect(screen.getByText('1 QP')).toBeInTheDocument();
    expect(screen.getByText('2 QP')).toBeInTheDocument();
  });

  it('displays skill requirements with icons and levels', () => {
    render(Page);
    
    // Check Cooking skill
    const cookingIcon = screen.getByAltText('Cooking');
    expect(cookingIcon).toBeInTheDocument();
    expect(cookingIcon).toHaveAttribute('src', '/icons/skills/cooking-icon.png');
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Check Fishing skill
    const fishingIcon = screen.getByAltText('Fishing');
    expect(fishingIcon).toBeInTheDocument();
    expect(fishingIcon).toHaveAttribute('src', '/icons/skills/fishing-icon.png');
    expect(screen.getByText('20')).toBeInTheDocument();
    
    // Check Attack skill
    const attackIcon = screen.getByAltText('Attack');
    expect(attackIcon).toBeInTheDocument();
    expect(attackIcon).toHaveAttribute('src', '/icons/skills/attack-icon.png');
    expect(screen.getByText('40')).toBeInTheDocument();
    
    // Check Strength skill
    const strengthIcon = screen.getByAltText('Strength');
    expect(strengthIcon).toBeInTheDocument();
    expect(strengthIcon).toHaveAttribute('src', '/icons/skills/strength-icon.png');
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('applies correct color classes to skill level tags', () => {
    render(Page);
    
    // Level 40 (yellow)
    expect(screen.getByText('40').parentElement).toHaveClass('bg-yellow-100', 'text-yellow-800');
    
    // Level 30 (green)
    expect(screen.getByText('30').parentElement).toHaveClass('bg-green-100', 'text-green-800');
    
    // Level 20 (green)
    expect(screen.getByText('20').parentElement).toHaveClass('bg-green-100', 'text-green-800');
    
    // Level 10 (blue)
    expect(screen.getByText('10').parentElement).toHaveClass('bg-blue-100', 'text-blue-800');
  });
}); 