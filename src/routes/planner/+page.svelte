<!-- src/routes/planner/+page.svelte -->
<script lang="ts">
	import type { Quest, QuestData } from '$lib/types';
	import { parseMDX } from '$lib/utils/mdx';
	import { sanitizeContent } from '$lib/utils/sanitize';
	import questData from '$lib/data/quests.json';

	// Convert the JSON data into an array of Quest objects
	const quests = Object.values(questData) as Quest[];

	// Store parsed MDX content
	let parsedMDX: Record<string, string> = {};
	let error: string | null = null;

	// Parse MDX content for each quest
	async function parseQuestMDX() {
		try {
			for (const quest of quests) {
				if (quest.mdx) {
					const result = await parseMDX(quest.mdx);
					parsedMDX[quest.name] = result.content;
				}
			}
		} catch (e) {
			console.error('Error parsing MDX:', e);
			error = e instanceof Error ? e.message : 'Failed to parse MDX content';
		}
	}

	// Call parseQuestMDX when the component mounts
	parseQuestMDX();
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

	{#if error}
		<div class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
			<p class="text-red-800 dark:text-red-200">{error}</p>
		</div>
	{/if}

	<div class="grid gap-6">
		{#each quests as quest}
			<div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
				<div class="flex flex-col space-y-4">
					<div class="flex justify-between items-start">
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
							{sanitizeContent(quest.name)}
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
						{#if quest.mdx && parsedMDX[quest.name]}
							{@html parsedMDX[quest.name]}
						{:else}
							<p>{sanitizeContent(quest.desc)}</p>
						{/if}
					</div>

					<div class="flex flex-wrap gap-4 text-sm">
						<div class="flex items-center gap-1">
							<span class="font-medium text-gray-700 dark:text-gray-300">Start:</span>
							<span class="text-gray-600 dark:text-gray-400">{sanitizeContent(quest.start)}</span>
						</div>

						{#if quest.requirements !== 'None'}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Requirements:</span>
								<span class="text-gray-600 dark:text-gray-400">{sanitizeContent(quest.requirements)}</span>
							</div>
						{/if}

						{#if quest.kills !== 'None'}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Kills:</span>
								<span class="text-gray-600 dark:text-gray-400">{sanitizeContent(quest.kills)}</span>
							</div>
						{/if}

						{#if quest.items !== 'None'}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Items:</span>
								<span class="text-gray-600 dark:text-gray-400">{sanitizeContent(quest.items)}</span>
							</div>
						{/if}

						{#if quest.ironman}
							<div class="flex items-center gap-1">
								<span class="font-medium text-gray-700 dark:text-gray-300">Ironman:</span>
								<span class="text-gray-600 dark:text-gray-400">{sanitizeContent(quest.ironman)}</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	:global(.prose) {
		@apply text-gray-600 dark:text-gray-300;
	}
	:global(.prose h1) {
		@apply text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4;
	}
	:global(.prose h2) {
		@apply text-xl font-bold text-gray-900 dark:text-white mt-5 mb-3;
	}
	:global(.prose h3) {
		@apply text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2;
	}
	:global(.prose p) {
		@apply my-4;
	}
	:global(.prose ul) {
		@apply list-disc list-inside my-4;
	}
	:global(.prose ol) {
		@apply list-decimal list-inside my-4;
	}
	:global(.prose li) {
		@apply my-1;
	}
	:global(.prose a) {
		@apply text-blue-600 dark:text-blue-400 hover:underline;
	}
	:global(.prose code) {
		@apply bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5;
	}
	:global(.prose pre) {
		@apply bg-gray-100 dark:bg-gray-700 rounded p-4 my-4 overflow-x-auto;
	}
	:global(.prose blockquote) {
		@apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic;
	}
	:global(.prose table) {
		@apply w-full my-4 border-collapse;
	}
	:global(.prose th) {
		@apply border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700;
	}
	:global(.prose td) {
		@apply border border-gray-300 dark:border-gray-600 px-4 py-2;
	}
</style> 