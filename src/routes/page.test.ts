import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { describe, it, expect } from 'vitest';

describe('Main Page', () => {
    it('should render the main title', () => {
        render(Page);
        expect(screen.getByText('Plan Your OSRS Quest Journey')).toBeInTheDocument();
    });

    it('should render all feature cards', () => {
        render(Page);
        
        // Check for card titles
        expect(screen.getByText('Quest Requirements')).toBeInTheDocument();
        expect(screen.getByText('Route Optimization')).toBeInTheDocument();
        expect(screen.getByText('Progress Tracking')).toBeInTheDocument();
        
        // Check for card descriptions
        expect(screen.getByText('View detailed requirements for each quest, including skill levels, quest prerequisites, and items needed.')).toBeInTheDocument();
        expect(screen.getByText('Create efficient quest routes that minimize backtracking and optimize your progression through the game.')).toBeInTheDocument();
        expect(screen.getByText('Track your quest completion progress and see what\'s next in your optimized quest route.')).toBeInTheDocument();
    });

    it('should have proper grid layout', () => {
        render(Page);
        const grid = screen.getByTestId('main').querySelector('.features');
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveClass('features');
    });
}); 