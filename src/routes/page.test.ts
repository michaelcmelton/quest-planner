import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Home from './+page.svelte';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(Home);
    expect(screen.getByText('Plan Your OSRS Quest Journey')).toBeInTheDocument();
  });
}); 