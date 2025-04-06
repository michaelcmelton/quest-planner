import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Layout from './+layout.svelte';

describe('Layout Component', () => {
  it('renders the navigation header', () => {
    render(Layout);
    expect(screen.getByText('Quest Planner')).toBeInTheDocument();
  });

  it('contains all navigation links', () => {
    render(Layout);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders the footer with current year', () => {
    render(Layout);
    const currentYear = new Date().getFullYear();
    expect(screen.getByTestId('footer')).toHaveTextContent(`© ${currentYear} Quest Planner. Data sourced from OSRS Wiki. Built by TSCodeMonke.`);
  });
}); 