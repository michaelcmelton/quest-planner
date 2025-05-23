import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import MobileMenu from './MobileMenu.svelte';

// Mock Svelte transitions
vi.mock('svelte/transition', () => ({
  fade: () => ({ duration: 0 }),
  slide: () => ({ duration: 0 })
}));

describe('MobileMenu', () => {
  it('renders hamburger button', () => {
    const { getByLabelText } = render(MobileMenu);
    const button = getByLabelText('Toggle menu');
    expect(button).toBeInTheDocument();
  });

  it('toggles menu visibility on button click', async () => {
    const { getByLabelText, queryByRole } = render(MobileMenu);
    const button = getByLabelText('Toggle menu');
    
    // Menu should be hidden initially
    expect(queryByRole('navigation')).not.toBeInTheDocument();
    
    // Click to open menu
    await fireEvent.click(button);
    expect(queryByRole('navigation')).toBeInTheDocument();
    
    // Click to close menu
    await fireEvent.click(button);
    expect(queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    const { getByLabelText, getByText } = render(MobileMenu);
    const button = getByLabelText('Toggle menu');
    
    // Open menu
    await fireEvent.click(button);
    
    // Check for navigation links
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Quests')).toBeInTheDocument();
    expect(getByText('Planner')).toBeInTheDocument();
  });

  it('closes menu when a link is clicked', async () => {
    const { getByLabelText, getByText, queryByRole } = render(MobileMenu);
    const button = getByLabelText('Toggle menu');
    
    // Open menu
    await fireEvent.click(button);
    expect(queryByRole('navigation')).toBeInTheDocument();
    
    // Click a link
    await fireEvent.click(getByText('Home'));
    expect(queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('applies open class to hamburger lines when menu is open', async () => {
    const { getByLabelText, container } = render(MobileMenu);
    const button = getByLabelText('Toggle menu');
    
    // Check initial state
    const lines = container.querySelectorAll('.hamburger-line');
    lines.forEach(line => {
      expect(line).not.toHaveClass('open');
    });
    
    // Open menu
    await fireEvent.click(button);
    lines.forEach(line => {
      expect(line).toHaveClass('open');
    });
  });
}); 