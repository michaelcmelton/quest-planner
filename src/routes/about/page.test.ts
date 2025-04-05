import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import AboutPage from './+page.svelte';

describe('About Page', () => {
  it('renders the main heading', () => {
    render(AboutPage);
    expect(screen.getByText('About Quest Planner')).toBeInTheDocument();
  });

  it('renders the "What is Quest Planner?" section', () => {
    render(AboutPage);
    expect(screen.getByText('What is Quest Planner?')).toBeInTheDocument();
    expect(screen.getByText(/modern web application designed to help Old School RuneScape players/i)).toBeInTheDocument();
  });

  it('renders all features in the features list', () => {
    render(AboutPage);
    const features = [
      'Interactive quest route planning',
      'Comprehensive quest information',
      'Requirement tracking',
      'Route saving and sharing',
      'Mobile-friendly design'
    ];
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders the credits section', () => {
    render(AboutPage);
    expect(screen.getByText('Credits')).toBeInTheDocument();
    expect(screen.getByText(/Quest data provided by the OSRS Wiki/i)).toBeInTheDocument();
  });
}); 