<!-- src/routes/planner/+page.svelte -->
<script lang="ts">
	import type { Quest } from '$lib/types';
	import { parseMediaText } from '$lib/utils/mediatext';
	import questData from '$lib/data/quests.json';

	// Convert the JSON data into an array of Quest objects
	const quests = Object.values(questData) as Quest[];
</script>

<div class="space-y-8">
	<div class="text-center">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
			Quest Planner
		</h1>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
			Create and manage your quest routes efficiently.
		</p>
	</div>

	<div class="grid gap-6">
		{#each quests as quest}
			<div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
				<div class="flex flex-col space-y-4">
					<div class="flex justify-between items-start">
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white prose dark:prose-invert">
							{@html parseMediaText(quest.name)}
						</h2>
						<div class="flex gap-2">
							<span class="px-2 py-1 text-xs font-medium rounded-full 
								{quest.difficulty === 'Novice' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
								 quest.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
								 quest.difficulty === 'Experienced' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
								 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">
								{quest.difficulty}
							</span>
							<span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
								{quest.length}
							</span>
						</div>
					</div>

					<div class="prose prose-gray dark:prose-invert max-w-none">
						{@html parseMediaText(quest.desc)}
					</div>

					<div class="flex flex-wrap gap-4 text-sm">
						<div class="flex items-center gap-1">
							<span class="font-medium text-gray-700 dark:text-gray-300">Start:</span>
							<span class="prose dark:prose-invert text-gray-600 dark:text-gray-400">{@html parseMediaText(quest.start)}</span>
						</div>

						{#if quest.requirements !== 'None'}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Requirements:</span>
								<span class="prose dark:prose-invert text-gray-600 dark:text-gray-400">{@html parseMediaText(quest.requirements)}</span>
							</div>
						{/if}

						{#if quest.kills !== 'None'}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Kills:</span>
								<span class="prose dark:prose-invert text-gray-600 dark:text-gray-400">{@html parseMediaText(quest.kills)}</span>
							</div>
						{/if}

						{#if quest.items !== 'None'}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Items:</span>
								<span class="prose dark:prose-invert text-gray-600 dark:text-gray-400">{@html parseMediaText(quest.items)}</span>
							</div>
						{/if}

						{#if quest.ironman}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Ironman:</span>
								<span class="prose dark:prose-invert text-gray-600 dark:text-gray-400">{@html parseMediaText(quest.ironman)}</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
