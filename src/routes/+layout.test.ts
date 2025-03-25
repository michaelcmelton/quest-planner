import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Layout from './+layout.svelte';

describe('Layout', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Remove dark mode class if present
    document.documentElement.classList.remove('dark');
  });

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
    const darkModeButton = screen.getByLabelText('Toggle dark mode');
    
    // Initial state (light mode)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();

    // Click to enable dark mode
    await fireEvent.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click to disable dark mode
    await fireEvent.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('respects system dark mode preference', () => {
    // Mock matchMedia for dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      value: (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }),
    });

    render(Layout);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
}); 