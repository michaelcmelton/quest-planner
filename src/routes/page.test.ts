import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { describe, it, expect } from 'vitest';

describe('Main Page', () => {
    it('should render the main title', () => {
        render(Page);
        expect(screen.getByText('Quest Planner')).toBeInTheDocument();
    });

    it('should render all feature cards', () => {
        render(Page);
        
        // Check for card titles
        expect(screen.getByText('Quest List')).toBeInTheDocument();
        expect(screen.getByText('Route Planner')).toBeInTheDocument();
        expect(screen.getByText('Requirements')).toBeInTheDocument();
        
        // Check for card descriptions
        expect(screen.getByText('Browse all available quests and their requirements.')).toBeInTheDocument();
        expect(screen.getByText('Create and optimize your quest routes.')).toBeInTheDocument();
        expect(screen.getByText('Track your quest requirements and progress.')).toBeInTheDocument();
    });

    it('should have proper grid layout', () => {
        render(Page);
        const grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveStyle({
            display: 'grid',
            'grid-template-columns': '1fr'
        });
    });

    it('should have proper card styling', () => {
        render(Page);
        const cards = screen.getAllByRole('article');
        
        cards.forEach(card => {
            expect(card).toHaveStyle({
                'background-color': 'var(--color-surface)',
                'border-radius': '0.5rem',
                'box-shadow': expect.stringContaining('rgba(0, 0, 0, 0.1)')
            });
        });
    });
}); 