import { render, screen } from '@testing-library/svelte';
import QuestReward from './QuestReward.svelte';
import { skillIcons } from '$lib/utils/static-paths';
import { formatWikitext } from '$lib/utils/wikitext';

// Mock the dependencies
vi.mock('$lib/utils/static-paths', () => ({
    skillIcons: {
        'Quest': '/path/to/quest.png',
        'Attack': '/path/to/attack.png',
        'Magic': '/path/to/magic.png'
    }
}));

vi.mock('$lib/utils/wikitext', () => ({
    formatWikitext: (text: string) => text
}));

describe('QuestReward Component', () => {
    it('displays single quest point correctly', () => {
        const rewards = {
            questPoints: 1,
            experienceRewards: [],
            otherRewards: []
        };
        
        render(QuestReward, { props: { rewards } });
        expect(screen.getByText('1 Quest Point')).toBeInTheDocument();
        expect(screen.getByAltText('Quest Points')).toHaveAttribute('src', skillIcons['Quest']);
    });

    it('displays multiple quest points correctly', () => {
        const rewards = {
            questPoints: 2,
            experienceRewards: [],
            otherRewards: []
        };
        
        render(QuestReward, { props: { rewards } });
        expect(screen.getByText('2 Quest Points')).toBeInTheDocument();
    });

    it('displays experience rewards correctly', () => {
        const rewards = {
            questPoints: 1,
            experienceRewards: [
                { skill: 'Attack', amount: 1000 },
                { skill: 'Magic', amount: 2500 }
            ],
            otherRewards: []
        };
        
        render(QuestReward, { props: { rewards } });
        expect(screen.getByText('Experience Rewards')).toBeInTheDocument();
        expect(screen.getByText('1,000 XP')).toBeInTheDocument();
        expect(screen.getByText('2,500 XP')).toBeInTheDocument();
        expect(screen.getByAltText('Attack')).toHaveAttribute('src', skillIcons['Attack']);
        expect(screen.getByAltText('Magic')).toHaveAttribute('src', skillIcons['Magic']);
    });

    it('displays other rewards correctly', () => {
        const rewards = {
            questPoints: 1,
            experienceRewards: [],
            otherRewards: ['Access to new area', 'Special weapon']
        };
        
        render(QuestReward, { props: { rewards } });
        expect(screen.getByText('Other Rewards')).toBeInTheDocument();
        expect(screen.getByText('Access to new area')).toBeInTheDocument();
        expect(screen.getByText('Special weapon')).toBeInTheDocument();
    });

    it('handles empty experience and other rewards', () => {
        const rewards = {
            questPoints: 1,
            experienceRewards: [],
            otherRewards: []
        };
        
        render(QuestReward, { props: { rewards } });
        expect(screen.queryByText('Experience Rewards')).not.toBeInTheDocument();
        expect(screen.queryByText('Other Rewards')).not.toBeInTheDocument();
    });

    it('displays all reward types together', () => {
        const rewards = {
            questPoints: 3,
            experienceRewards: [
                { skill: 'Attack', amount: 1000 }
            ],
            otherRewards: ['Special item']
        };
        
        render(QuestReward, { props: { rewards } });
        expect(screen.getByText('3 Quest Points')).toBeInTheDocument();
        expect(screen.getByText('Experience Rewards')).toBeInTheDocument();
        expect(screen.getByText('1,000 XP')).toBeInTheDocument();
        expect(screen.getByText('Other Rewards')).toBeInTheDocument();
        expect(screen.getByText('Special item')).toBeInTheDocument();
    });
}); 