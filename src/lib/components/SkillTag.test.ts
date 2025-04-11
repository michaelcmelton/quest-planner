import { render, screen } from '@testing-library/svelte';
import SkillTag from './SkillTag.svelte';
import { base } from '$app/paths';

// Mock $app/paths
vi.mock('$app/paths', () => ({
    base: ''
}));

describe('SkillTag Component', () => {
    it('renders basic skill requirement correctly', () => {
        const skill = {
            skill: 'Attack',
            level: 60,
            required: true,
            boostable: false,
            link: 'https://oldschool.runescape.wiki/w/Attack'
        };
        
        render(SkillTag, { props: { skill } });
        
        expect(screen.getByText('Attack')).toBeInTheDocument();
        expect(screen.getByText('60')).toBeInTheDocument();
        expect(screen.getByAltText('Attack')).toHaveAttribute('src', '/icons/skills/attack-icon.png');
        // Check for blue background class for required, non-boostable skills
        expect(screen.getByText('Attack').closest('div')).toHaveClass('bg-blue-100');
    });

    it('renders boostable skill requirement correctly', () => {
        const skill = {
            skill: 'Magic',
            level: 50,
            required: true,
            boostable: true,
            link: 'https://oldschool.runescape.wiki/w/Magic'
        };
        
        render(SkillTag, { props: { skill } });
        
        expect(screen.getByText('Magic')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('(B)')).toBeInTheDocument();
        expect(screen.getByAltText('Magic')).toHaveAttribute('src', '/icons/skills/magic-icon.png');
        // Check for purple background and dashed border for boostable skills
        const container = screen.getByText('Magic').closest('div');
        expect(container).toHaveClass('bg-purple-100');
        expect(container).toHaveClass('border-dashed');
    });

    it('renders non-required skill correctly', () => {
        const skill = {
            skill: 'Fishing',
            level: 35,
            required: false,
            boostable: false,
            link: 'https://oldschool.runescape.wiki/w/Fishing'
        };
        
        render(SkillTag, { props: { skill } });
        
        expect(screen.getByText('Fishing')).toBeInTheDocument();
        expect(screen.getByText('35')).toBeInTheDocument();
        expect(screen.getByAltText('Fishing')).toHaveAttribute('src', '/icons/skills/fishing-icon.png');
        // Check for gray background for non-required skills
        expect(screen.getByText('Fishing').closest('div')).toHaveClass('bg-gray-100');
    });

    it('handles unknown skill type gracefully', () => {
        const skill = {
            skill: 'UnknownSkill',
            level: 1,
            required: true,
            boostable: false,
            link: 'https://oldschool.runescape.wiki/w/Skills'
        };
        
        render(SkillTag, { props: { skill } });
        
        expect(screen.getByText('UnknownSkill')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        // Should not render an img element for unknown skill
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders combat skill correctly', () => {
        const skill = {
            skill: 'Combat',
            level: 85,
            required: true,
            boostable: false,
            link: 'https://oldschool.runescape.wiki/w/Combat'
        };
        
        render(SkillTag, { props: { skill } });
        
        expect(screen.getByText('Combat')).toBeInTheDocument();
        expect(screen.getByText('85')).toBeInTheDocument();
        expect(screen.getByAltText('Combat')).toHaveAttribute('src', '/icons/skills/multicombat-icon.png');
    });

    it('renders boostable tooltip correctly', () => {
        const skill = {
            skill: 'Herblore',
            level: 72,
            required: true,
            boostable: true,
            link: 'https://oldschool.runescape.wiki/w/Herblore'
        };
        
        render(SkillTag, { props: { skill } });
        
        const boostableIndicator = screen.getByText('(B)');
        expect(boostableIndicator).toHaveAttribute('title', 'Boostable');
    });
}); 