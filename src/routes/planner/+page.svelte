<script lang="ts">
	import { getRoutes } from '$lib/stores/routes.svelte';
	import type { SavedRoute } from '$lib/stores/routes.svelte';
    import { QuestGraph } from '$lib/graph/graph';
	import type { Quest } from '$lib/types/quest';
	import questsData from '$lib/data/quests.json';
	import { goto } from '$app/navigation';
	import QuestDetail from '$lib/components/QuestDetail.svelte';
	import { page } from '$app/stores';

	const routes = getRoutes();

	// Get all quests
	const quests: Quest[] = Object.values(questsData);
	const questsById: Record<string, Quest> = Object.fromEntries(
		Object.entries(questsData).map(([id, quest]) => [id, quest as Quest])
	);

	// Create a mapping of quest IDs to names
	const questNameMap = Object.entries(questsData).reduce((acc, [id, quest]) => {
		acc[id] = quest.name;
		return acc;
	}, {} as Record<string, string>);

	// State for the route builder
	let selectedQuests: string[] = $state([]);
	let routeName = $state('');
	let questValidationErrors: { questId: string; missingRequirements: string[] }[] = $state([]);
	let searchTerm = $state('');
	let selectedQuest: Quest | null = $state(null);
	let isEditing = $state(false);
	let currentRouteId = $state('');

	// Load existing route if routeId is present
	$effect(() => {
		const routeId = $page.url.searchParams.get('routeId');
		if (routeId && !isEditing) {
			const existingRoute = routes.routes.find(route => route.id === routeId);
			if (existingRoute) {
				selectedQuests = existingRoute.quests;
				routeName = existingRoute.name;
				isEditing = true;
				currentRouteId = routeId;
			}
		}
	});

	// Filter available quests to exclude those already in the route and match search term
	const availableQuests = $derived(
		quests
			.filter(quest => !selectedQuests.includes(quest.id))
			.filter(quest => 
				quest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				quest.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	function handleQuestClick(quest: Quest) {
		selectedQuest = quest;
	}

	function handleCloseDetail() {
		selectedQuest = null;
	}

	function addQuest(questId: string) {
		if (!selectedQuests.includes(questId)) {
			selectedQuests = [...selectedQuests, questId];
		}
	}

	function removeQuest(questId: string) {
		selectedQuests = selectedQuests.filter(id => id !== questId);
	}

	function moveQuest(index: number, direction: 'up' | 'down') {
		if (
			(direction === 'up' && index > 0) ||
			(direction === 'down' && index < selectedQuests.length - 1)
		) {
			const newIndex = direction === 'up' ? index - 1 : index + 1;
			const newQuests = [...selectedQuests];
			[newQuests[index], newQuests[newIndex]] = [newQuests[newIndex], newQuests[index]];
			selectedQuests = newQuests;
		}
	}

	function saveRoute() {
		if (!routeName.trim() || selectedQuests.length === 0) return;

		const graph = new QuestGraph(selectedQuests.map(id => questsById[id]));
		const { isValid, invalidQuests } = graph.validateRouteWithDetails(selectedQuests.map(id => questsById[id]));
		if (!isValid) {
			questValidationErrors = invalidQuests;
			return;
		}

		const newRoute: SavedRoute = {
			id: isEditing ? currentRouteId : crypto.randomUUID(),
			name: routeName.trim(),
			quests: selectedQuests,
			createdAt: isEditing ? routes.routes.find(r => r.id === currentRouteId)?.createdAt || new Date().toISOString() : new Date().toISOString()
		};

		if (isEditing) {
			routes.updateRoute(newRoute);
		} else {
			routes.addRoute(newRoute);
		}
		goto('/routes');
	}

	function cancelRoute() {
		goto('/routes');
	}

	function addMissingQuests() {
		const graph = new QuestGraph(selectedQuests.map(id => questsById[id]));
		
		// Function to recursively get all requirements for a quest
		function getAllRequirements(questId: string, visited = new Set<string>()): string[] {
			if (visited.has(questId)) return [];
			visited.add(questId);
			
			const quest = questsById[questId];
			if (!quest || !quest.requirements || !quest.requirements.quests) return [];
			
			const requirements = quest.requirements.quests;
			const allRequirements: string[] = [];
			
			// Recursively get requirements of requirements
			requirements.forEach(req => {
				allRequirements.push(...getAllRequirements(req, visited));
			});
			
			// Add current requirements after their dependencies
			allRequirements.push(...requirements);
			
			return allRequirements;
		}
		
		// Get all missing requirements for all quests
		const allMissingRequirements = new Set<string>();
		selectedQuests.forEach(questId => {
			const requirements = getAllRequirements(questId);
			requirements.forEach(req => {
				if (!selectedQuests.includes(req)) {
					allMissingRequirements.add(req);
				}
			});
		});
		
		// Add all missing requirements to the beginning of the route
		selectedQuests = [...Array.from(allMissingRequirements), ...selectedQuests];

    const { isValid, invalidQuests } = graph.validateRouteWithDetails(selectedQuests.map(id => questsById[id]));
    if (!isValid) {
      questValidationErrors = invalidQuests;
    } else {
      questValidationErrors = [];
    }
	}
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<div class="w-1/3 bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto custom-scrollbar">
		<h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Available Quests</h2>

		<!-- Search Box -->
		<div class="mb-4">
			<input
				type="text"
				bind:value={searchTerm}
				placeholder="Search quests..."
				class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<!-- Available Quests Grid -->
		<div class="space-y-2">
			{#each availableQuests as quest}
				<div class="w-full p-3 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow">
					<div class="flex justify-between items-center">
						<div>
							<button
								onclick={() => handleQuestClick(quest)}
								class="text-left group cursor-pointer"
							>
								<h4 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
									{quest.name}
								</h4>
							</button>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								{quest.difficulty} • {quest.length}
							</p>
						</div>
						<button
							onclick={() => addQuest(quest.id)}
							class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition-colors duration-200"
						>
							Add
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Main Content -->
	<div class="flex-1 p-4 overflow-y-auto">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-3xl font-bold text-gray-800 dark:text-white">{isEditing ? 'Edit Quest Route' : 'Create Quest Route'}</h1>
			<div class="flex space-x-4">
				<button
					onclick={cancelRoute}
					class="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
				>
					Cancel
				</button>
				<button
					onclick={saveRoute}
					class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
					disabled={!routeName.trim() || selectedQuests.length === 0}
				>
					{isEditing ? 'Update Route' : 'Save Route'}
				</button>
			</div>
		</div>

		<!-- Route Name Input -->
		<div class="mb-6">
			<label for="routeName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				Route Name <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="routeName"
				bind:value={routeName}
				placeholder="Enter a name for your route"
				class="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		{#if questValidationErrors.length > 0}
			<div class="mb-6 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
				<div class="flex items-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<h3 class="text-lg font-semibold text-red-800 dark:text-red-200">Invalid Quest Order</h3>
				</div>
				<p class="text-red-700 dark:text-red-300 mb-4">The following quests cannot be completed in the current order due to missing requirements:</p>
				{#each questValidationErrors as invalidQuest}
					<div class="p-4 bg-white dark:bg-gray-800 rounded-lg mb-2 border border-red-200 dark:border-red-800">
						<div class="font-medium text-red-900 dark:text-red-200 mb-2">
							{questsById[invalidQuest.questId].name} requires the following quests to be completed first:
						</div>
						<ul class="list-disc list-inside text-red-700 dark:text-red-300">
							{#each invalidQuest.missingRequirements as req}
								<li>{questsById[req].name}</li>
							{/each}
						</ul>
					</div>
				{/each}
				<button
					onclick={addMissingQuests}
					class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
				>
					Add Missing Requirements
				</button>
			</div>
		{/if}

		<!-- Selected Quests -->
		<div class="space-y-4">
			{#if selectedQuests.length === 0}
				<div class="text-center py-8">
					<p class="text-gray-600 dark:text-gray-400">No quests added to your route yet. Select quests from the sidebar to begin planning.</p>
				</div>
			{:else}
				{#each selectedQuests as questId, i}
					{#if questsById[questId]}
						<div class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
							<div class="flex justify-between items-start">
								<div class="flex items-center space-x-4">
									<span class="text-gray-600 dark:text-gray-400">{i + 1}.</span>
									<div>
										<button
											onclick={() => handleQuestClick(questsById[questId])}
											class="text-left group cursor-pointer"
										>
											<h3 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
												{questsById[questId].name}
											</h3>
										</button>
										<p class="text-sm text-gray-600 dark:text-gray-400">
											{questsById[questId].difficulty} • {questsById[questId].length}
										</p>
									</div>
								</div>
								<div class="flex items-center space-x-2">
									<button
										onclick={() => moveQuest(i, 'up')}
										class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
										disabled={i === 0}
									>
										↑
									</button>
									<button
										onclick={() => moveQuest(i, 'down')}
										class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
										disabled={i === selectedQuests.length - 1}
									>
										↓
									</button>
									<button
										onclick={() => removeQuest(questId)}
										class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
									>
										×
									</button>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			{/if}
		</div>

		<!-- Quest Detail Modal -->
		{#if selectedQuest}
			<QuestDetail
				quest={selectedQuest}
				questNameMap={questNameMap}
				onClose={handleCloseDetail}
			/>
		{/if}
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #CBD5E1;
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #94A3B8;
	}

	.dark .custom-scrollbar::-webkit-scrollbar-thumb {
		background: #475569;
	}

	.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #64748B;
	}
</style>
