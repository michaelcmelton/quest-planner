import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Layout from './+layout.svelte';

describe('Layout', () => {
  it('renders the header with app title', () => {
    render(Layout);
    expect(screen.getByText('Quest Planner')).toBeInTheDocument();
  });

  it('renders the footer with copyright notice', () => {
    render(Layout);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Quest Planner. Data provided by OSRS Wiki.`)).toBeInTheDocument();
  });
}); 