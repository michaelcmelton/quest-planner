<script lang="ts">
	import { getRoutes } from '$lib/stores/routes.svelte';
	import type { Quest } from '$lib/types/quest';
	import questsData from '$lib/data/quests.json';
	import { base } from '$app/paths';

	const routes = getRoutes();

	// Get all quests
	const questsById: Record<string, Quest> = Object.fromEntries(
		Object.entries(questsData).map(([id, quest]) => [id, quest as Quest])
	);
</script>

<div class="container mx-auto px-4 py-8">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold text-gray-800 dark:text-white">Quest Routes</h1>
		<a
			href={`${base}/planner`}
			class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Create New Route
		</a>
	</div>

	<!-- Saved Routes List -->
	<div class="mb-8">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Routes</h2>
		{#if !routes.hasRoutes()}
			<p class="text-gray-600 dark:text-gray-400">No saved routes yet. Create a new route to get started!</p>
		{:else}
			<div class="space-y-4">
				{#each routes.routes as route}
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
						<div class="flex justify-between items-start mb-2">
							<div>
								<h3 class="text-lg font-medium text-gray-900 dark:text-white">{route.name}</h3>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Created {new Date(route.createdAt).toLocaleDateString()}
								</p>
							</div>
							<div class="flex space-x-2">
								<a
									href={`${base}/planner?routeId=${route.id}`}
									class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
								>
									Edit
								</a>
								<button
									on:click={() => routes.deleteRoute(route.id)}
									class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
								>
									Delete
								</button>
							</div>
						</div>
						<div class="mt-2">
							<p class="text-sm text-gray-600 dark:text-gray-400">
								{route.quests.length} quest{route.quests.length === 1 ? '' : 's'}
							</p>
							<div class="mt-2 space-y-1">
								{#each route.quests as questId, i}
									{#if questsById[questId]}
										<div class="flex items-center space-x-2">
											<span class="text-sm text-gray-600 dark:text-gray-400">{i + 1}.</span>
											<span class="text-sm text-gray-800 dark:text-gray-200">{questsById[questId].name}</span>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div> 