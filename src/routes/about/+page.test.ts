import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import About from './+page.svelte';

describe('About Page', () => {
  it('renders the main heading', () => {
    render(About);
    expect(screen.getByText('About Quest Planner')).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(About);
    expect(screen.getByText('Your companion for OSRS quest planning.')).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    render(About);
    expect(screen.getByText('What is Quest Planner?')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Data Source')).toBeInTheDocument();
  });

  it('renders all feature list items', () => {
    render(About);
    const features = [
      'Interactive quest planning interface',
      'Quest requirements visualization',
      'Skill requirement tracking',
      'Custom route creation',
      'Progress tracking'
    ];

    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders the data source information', () => {
    render(About);
    expect(
      screen.getByText(
        'Quest data is sourced from the OSRS Wiki API, ensuring accurate and up-to-date information for all quests in the game.'
      )
    ).toBeInTheDocument();
  });
}); 