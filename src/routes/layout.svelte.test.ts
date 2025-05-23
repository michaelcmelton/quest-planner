import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Layout from './+layout.svelte';

describe('Layout', () => {
  it('renders header with logo and navigation', () => {
    const { getByText } = render(Layout);
    
    // Check logo
    expect(getByText('OSRS Quest Planner')).toBeInTheDocument();
    
    // Check navigation links
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Quests')).toBeInTheDocument();
    expect(getByText('Planner')).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    const { getByText } = render(Layout);
    const currentYear = new Date().getFullYear();
    expect(getByText(`© ${currentYear} OSRS Quest Planner. Not affiliated with Jagex Ltd.`)).toBeInTheDocument();
  });

  it('renders main content area', () => {
    const { container } = render(Layout);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('main');
  });

  it('renders mobile menu component', () => {
    const { getByLabelText } = render(Layout);
    expect(getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  it('applies correct classes for responsive design', () => {
    const { container } = render(Layout);
    
    // Check layout structure
    expect(container.querySelector('.layout')).toBeInTheDocument();
    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.nav')).toBeInTheDocument();
    expect(container.querySelector('.desktop-nav')).toBeInTheDocument();
    expect(container.querySelector('.footer')).toBeInTheDocument();
  });
}); 