import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Planner from './+page.svelte';

describe('Planner Page', () => {
  it('renders the main heading', () => {
    render(Planner);
    expect(screen.getByText('Quest Planner')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(Planner);
    expect(screen.getByText('Create and manage your quest routes efficiently.')).toBeInTheDocument();
  });

  it('renders the placeholder message', () => {
    render(Planner);
    expect(screen.getByText('Quest planning interface coming soon...')).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    render(Planner);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Quest Planner');
  });
}); 