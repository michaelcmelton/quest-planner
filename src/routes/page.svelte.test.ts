import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Landing Page', () => {
  it('renders hero section with title and subtitle', () => {
    const { getByText } = render(Page);
    
    // Check title
    expect(getByText('OSRS Quest Planner')).toBeInTheDocument();
    
    // Check subtitle
    expect(getByText('Plan your quest journey efficiently and never miss a requirement again')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct text and links', () => {
    const { getByText } = render(Page);
    
    // Check button text
    expect(getByText('Start Planning')).toBeInTheDocument();
    expect(getByText('Browse Quests')).toBeInTheDocument();
  });

  it('navigates to correct routes when buttons are clicked', async () => {
    const { getByText } = render(Page);
    
    // Click Start Planning button
    await fireEvent.click(getByText('Start Planning'));
    expect(window.location.href).toBe('/planner');
    
    // Click Browse Quests button
    await fireEvent.click(getByText('Browse Quests'));
    expect(window.location.href).toBe('/quests');
  });

  it('renders feature sections with correct content', () => {
    const { getByText } = render(Page);
    
    // Check feature titles
    expect(getByText('Smart Planning')).toBeInTheDocument();
    expect(getByText('Requirements Tracking')).toBeInTheDocument();
    expect(getByText('Progress Tracking')).toBeInTheDocument();
    
    // Check feature descriptions
    expect(getByText('Get optimized quest paths based on your current stats and completed quests')).toBeInTheDocument();
    expect(getByText('Never miss a skill requirement or item needed for your next quest')).toBeInTheDocument();
    expect(getByText('Keep track of your quest progress and achievements')).toBeInTheDocument();
  });

  it('applies correct classes for responsive design', () => {
    const { container } = render(Page);
    
    // Check main sections
    expect(container.querySelector('.hero')).toBeInTheDocument();
    expect(container.querySelector('.hero-content')).toBeInTheDocument();
    expect(container.querySelector('.features')).toBeInTheDocument();
    
    // Check feature cards
    const features = container.querySelectorAll('.feature');
    expect(features).toHaveLength(3);
    
    // Check CTA buttons container
    expect(container.querySelector('.cta-buttons')).toBeInTheDocument();
  });

  it('renders buttons with correct variants and sizes', () => {
    const { container } = render(Page);
    
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(2);
    
    // First button (Start Planning) should be primary and large
    expect(buttons[0]).toHaveClass('button', 'primary', 'large');
    
    // Second button (Browse Quests) should be secondary and large
    expect(buttons[1]).toHaveClass('button', 'secondary', 'large');
  });
}); 