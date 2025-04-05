import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import QuestsPage from './+page.svelte';

describe('Quests Page', () => {
  it('renders the main heading', () => {
    render(QuestsPage);
    expect(screen.getByText('Quest Browser')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(QuestsPage);
    const searchInput = screen.getByPlaceholderText('Search quests...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  it('renders the quest list placeholder', () => {
    render(QuestsPage);
    expect(screen.getByText('Quest List')).toBeInTheDocument();
    expect(screen.getByText('Coming soon...')).toBeInTheDocument();
  });

  it('has a grid layout for quests', () => {
    render(QuestsPage);
    const grid = screen.getByTestId('quests-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
  });
}); 