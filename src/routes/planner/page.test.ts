import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import PlannerPage from './+page.svelte';

describe('Planner Page', () => {
  it('renders the main heading', () => {
    render(PlannerPage);
    expect(screen.getByText('Quest Planner')).toBeInTheDocument();
  });

  it('renders the quest summary component placeholder', () => {
    render(PlannerPage);
    expect(screen.getByText('Quest Summary Component')).toBeInTheDocument();
    expect(screen.getByText('Coming soon...')).toBeInTheDocument();
  });

  it('has a grid layout for quest summaries', () => {
    render(PlannerPage);
    const grid = screen.getByTestId('planner-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
  });
}); 