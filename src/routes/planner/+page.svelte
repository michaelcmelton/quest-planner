<!-- src/routes/planner/+page.svelte -->
<script lang="ts">
	import type { Quest } from '$lib/types/quest';
	import { QuestGraph } from '$lib/utils/quest-graph';
	import { parseMediaText } from '$lib/utils/mediatext';
	import questData from '$lib/data/quests.json';

	// Convert JSON data to Quest array
	const quests: Quest[] = Object.entries(questData).map(([id, data]: [string, any]) => ({
		id,
		name: data.name,
		description: data.desc,
		difficulty: data.difficulty,
		length: data.length,
		questPoints: data.questPoints || 0,
		requirements: data.requirements === 'None' ? undefined : {
			quests: data.requirements?.quests || [],
			skills: data.requirements?.skills || [],
			items: data.requirements?.items || [],
			kills: data.requirements?.kills || []
		},
		start: data.start === 'None' ? undefined : data.start,
		ironman: data.ironman === 'None' ? undefined : true
	}));

	// Create quest graph
	const questGraph = new QuestGraph(quests);

	// Track completed quests
	let completedQuests = new Set<string>();

	// Track expanded quest details
	let expandedQuests = new Set<string>();

	// Get available quests based on completed quests
	$: availableQuests = questGraph.getAvailableQuests(completedQuests);

	// Get optimal quest order
	$: questOrder = questGraph.getTopologicalSort();

	// Function to toggle quest completion
	function toggleQuest(questId: string) {
		if (completedQuests.has(questId)) {
			completedQuests.delete(questId);
		} else {
			// Only allow completing quests if requirements are met
			if (questGraph.validateRequirements(completedQuests, questId)) {
				completedQuests.add(questId);
			}
		}
		completedQuests = completedQuests; // Trigger reactivity
	}

	// Function to toggle quest details
	function toggleDetails(questId: string) {
		if (expandedQuests.has(questId)) {
			expandedQuests.delete(questId);
		} else {
			expandedQuests.add(questId);
		}
		expandedQuests = expandedQuests; // Trigger reactivity
	}

	// Function to check if a quest can be started
	function canStartQuest(questId: string): boolean {
		return questGraph.validateRequirements(completedQuests, questId);
	}

	// Function to get quest dependencies
	function getQuestDependencies(questId: string): string[] {
		return questGraph.getDependencyQuests(questId);
	}

	// Function to get quest dependents
	function getQuestDependents(questId: string): string[] {
		return questGraph.getDependentQuests(questId);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">Quest Planner</h1>
	
	<!-- Quest Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each quests as quest}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-xl font-semibold prose dark:prose-invert">{@html parseMediaText(quest.name)}</h2>
					<button
						class="px-4 py-2 rounded-md {completedQuests.has(quest.id) ? 'bg-green-500 hover:bg-green-600' : canStartQuest(quest.id) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'} text-white transition-colors"
						on:click={() => toggleQuest(quest.id)}
						disabled={!canStartQuest(quest.id)}
					>
						{completedQuests.has(quest.id) ? 'Completed' : 'Start'}
					</button>
				</div>

				<div class="space-y-4">
					<div class="flex items-center gap-4 text-sm">
						<span class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
							{quest.difficulty}
						</span>
						<span class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
							{quest.length}
						</span>
						<span class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
							{quest.questPoints} QP
						</span>
					</div>

					{#if quest.requirements?.quests}
						<div>
							<h3 class="font-semibold mb-1">Required Quests:</h3>
							<ul class="list-disc list-inside space-y-1">
								{#each quest.requirements.quests as req}
									<li class="text-gray-600 dark:text-gray-400">
										{#if completedQuests.has(req.id)}
											<span class="text-green-500">✓</span>
										{:else}
											<span class="text-red-500">✗</span>
										{/if}
										{@html parseMediaText(req.name)}
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<button
						class="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
						on:click={() => toggleDetails(quest.id)}
					>
						{expandedQuests.has(quest.id) ? 'Hide Details' : 'View Details'}
					</button>

					{#if expandedQuests.has(quest.id)}
						<div class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
							<p class="text-gray-600 dark:text-gray-400 prose dark:prose-invert">{@html parseMediaText(quest.description)}</p>

							{#if quest.requirements?.skills}
								<div>
									<h3 class="font-semibold mb-1">Required Skills:</h3>
									<ul class="list-disc list-inside space-y-1">
										{#each quest.requirements.skills as skill}
											<li class="text-gray-600 dark:text-gray-400">
												{@html parseMediaText(skill.name)} {skill.level}
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if quest.requirements?.items}
								<div>
									<h3 class="font-semibold mb-1">Required Items:</h3>
									<ul class="list-disc list-inside space-y-1">
										{#each quest.requirements.items as item}
											<li class="text-gray-600 dark:text-gray-400">
												{@html parseMediaText(item.name)} x{item.quantity}
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if quest.requirements?.kills}
								<div>
									<h3 class="font-semibold mb-1">Required Kills:</h3>
									<ul class="list-disc list-inside space-y-1">
										{#each quest.requirements.kills as kill}
											<li class="text-gray-600 dark:text-gray-400">
												{@html parseMediaText(kill.name)} x{kill.quantity}
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if quest.start}
								<div>
									<h3 class="font-semibold mb-1">Start Location:</h3>
									<p class="text-gray-600 dark:text-gray-400 prose dark:prose-invert">{@html parseMediaText(quest.start)}</p>
								</div>
							{/if}

							{#if quest.ironman}
								<div class="text-yellow-500">
									<span class="font-semibold">Ironman:</span> This quest has special requirements for Ironman accounts
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Quest Order -->
	<div class="mt-8">
		<h2 class="text-2xl font-bold mb-4">Optimal Quest Order</h2>
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
			<ol class="list-decimal list-inside space-y-2">
				{#each questOrder as questId}
					{@const quest = quests.find(q => q.id === questId)}
					{#if quest}
						<li class="text-gray-600 dark:text-gray-400">
							{#if completedQuests.has(questId)}
								<span class="text-green-500">✓</span>
							{:else if canStartQuest(questId)}
								<span class="text-blue-500">→</span>
							{:else}
								<span class="text-red-500">✗</span>
							{/if}
							{@html parseMediaText(quest.name)}
						</li>
					{/if}
				{/each}
			</ol>
		</div>
	</div>
</div>
