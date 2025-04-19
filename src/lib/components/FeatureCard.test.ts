import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FeatureCard from './FeatureCard.svelte';

describe('FeatureCard', () => {
    it('renders with provided title and description', () => {
        const title = 'Test Title';
        const description = 'Test Description';

        render(FeatureCard, { title, description });

        // Check if title is rendered
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.tagName).toBe('H2');

        // Check if description is rendered
        const descriptionElement = screen.getByText(description);
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement.tagName).toBe('P');
    });

    it('has the correct CSS classes', () => {
        render(FeatureCard, {
            title: 'Title',
            description: 'Test'
        });

        const card = screen.getByRole('article');
        expect(card).toHaveClass('feature-card');

        const title = screen.getByRole('heading');
        expect(title).toHaveClass('feature-card__title');

        const description = screen.getByText('Test');
        expect(description).toHaveClass('feature-card__text');
    });
}); 