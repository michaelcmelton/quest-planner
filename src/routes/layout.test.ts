import { render, screen, fireEvent } from '@testing-library/svelte';
import Layout from './+layout.svelte';
import { describe, it, expect, vi } from 'vitest';

describe('Layout Component', () => {
    it('should render the navigation header', () => {
        render(Layout);
        expect(screen.getByText('Quest Planner')).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
        render(Layout);
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Quest List')).toBeInTheDocument();
        expect(screen.getByText('Routes')).toBeInTheDocument();
    });

    it('should render the theme toggle button', () => {
        render(Layout);
        expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
    });

    it('should toggle theme when theme button is clicked', () => {
        render(Layout);
        const themeToggle = screen.getByText('Toggle Theme');
        
        // Mock document.documentElement.setAttribute
        const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute');
        
        fireEvent.click(themeToggle);
        
        expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark');
        
        fireEvent.click(themeToggle);
        
        expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light');
    });

    it('should render the footer with current year', () => {
        render(Layout);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} Quest Planner`)).toBeInTheDocument();
    });
}); 