import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { questRoute } from '$lib/stores/questRoute.svelte';

describe('Page component', () => {
	beforeEach(() => {
		questRoute.clear();
	});

	it('should render the page title', () => {
		render(Page);
		expect(screen.getByText('OSRS Quest Planner')).toBeInTheDocument();
	});

	it('should show empty route message when no quests are added', () => {
		render(Page);
		expect(screen.getByText('Your Quest Route')).toBeInTheDocument();
		expect(screen.queryByText('⚔️ Quest')).not.toBeInTheDocument();
	});

	it('should display added quests in the route', async () => {
		render(Page);
		questRoute.addQuest('test-quest');
		
		const questNode = await screen.findByText('⚔️ Quest test-quest');
		expect(questNode).toBeInTheDocument();
	});

	it('should display custom nodes in the route', async () => {
		render(Page);
		questRoute.addCustomNode('Train Agility to 56');
		
		const customNode = await screen.findByText('📝 Train Agility to 56');
		expect(customNode).toBeInTheDocument();
	});

	it('should clear the route when clear button is clicked', async () => {
		render(Page);
		questRoute.addQuest('test-quest');
		questRoute.addCustomNode('Train Agility');
		
		const clearButton = screen.getByText('Clear Route');
		await fireEvent.click(clearButton);
		
		expect(screen.queryByText('⚔️ Quest test-quest')).not.toBeInTheDocument();
		expect(screen.queryByText('📝 Train Agility')).not.toBeInTheDocument();
	});

	it('should remove a quest when the remove button is clicked', async () => {
		render(Page);
		questRoute.addQuest('test-quest');
		
		const removeButton = await screen.findByText('×');
		await fireEvent.click(removeButton);
		
		expect(screen.queryByText('⚔️ Quest test-quest')).not.toBeInTheDocument();
	});
});
