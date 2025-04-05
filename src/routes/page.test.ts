import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Home from './+page.svelte';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(Home);
    expect(screen.getByText('Plan Your OSRS Quest Journey')).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    render(Home);
    expect(
      screen.getByText(
        'Welcome to Quest Planner, your companion for efficiently planning and tracking your Old School RuneScape quest progress.'
      )
    ).toBeInTheDocument();
  });
}); 