import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Layout from './+layout.svelte';
import { theme } from '$lib/stores/theme';
import { fireEvent } from '@testing-library/svelte';
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

  it('renders the theme toggle button', () => {
    const { getByLabelText } = render(Layout);
    expect(getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('shows sun icon in dark mode', () => {
    theme.set('dark');
    const { getByLabelText } = render(Layout);
    const button = getByLabelText('Toggle theme');
    expect(button.querySelector('svg')).toHaveClass('text-yellow-400');
  });

  it('shows moon icon in light mode', () => {
    theme.set('light');
    const { getByLabelText } = render(Layout);
    const button = getByLabelText('Toggle theme');
    expect(button.querySelector('svg')).toHaveClass('text-gray-600');
  });

  it('toggles theme when button is clicked', async () => {
    theme.set('light');
    const { getByLabelText } = render(Layout);
    const button = getByLabelText('Toggle theme');
    
    await fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    await fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
}); 