import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import RoutesPage from './+page.svelte';

describe('Routes Page', () => {
  it('renders the main heading', () => {
    render(RoutesPage);
    expect(screen.getByText('My Routes')).toBeInTheDocument();
  });

  it('renders the create new route button', () => {
    render(RoutesPage);
    const button = screen.getByText('Create New Route');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  it('renders the saved routes placeholder', () => {
    render(RoutesPage);
    expect(screen.getByText('Saved Routes')).toBeInTheDocument();
    expect(screen.getByText('Coming soon...')).toBeInTheDocument();
  });

  it('has a grid layout for routes', () => {
    render(RoutesPage);
    const grid = screen.getByTestId('routes-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
  });
}); 