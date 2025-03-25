import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
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

  it('toggles dark mode when the button is clicked', async () => {
    render(Layout);
    
    // Initially should not be in dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Click the dark mode toggle button
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    await fireEvent.click(button);
    
    // Should now be in dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Click again to toggle off
    await fireEvent.click(button);
    
    // Should be back to light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
}); 