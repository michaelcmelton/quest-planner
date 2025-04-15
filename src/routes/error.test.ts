import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Error from './+error.svelte';

describe('Error Page', () => {
    it('should render successfully and contain Page Not Found text', () => {
        render(Error);
        const errorText = screen.getByText(/Page Not Found/i);
        expect(errorText).toBeInTheDocument();
    });

    it('should have a home link that points to the root path', () => {
        render(Error);
        const homeLink = screen.getByTestId('home-link');
        expect(homeLink).toHaveAttribute('href', '/');
    });
}); 