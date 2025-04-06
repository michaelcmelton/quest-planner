<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SkillTag from './SkillTag.svelte';
	import QuestReward from './QuestReward.svelte';
	import { formatWikitext } from '$lib/utils/wikitext';

	export let quest: {
		name: string;
		difficulty: string;
		length: string;
		questPoints: number;
		start: string;
		description: string;
		requirements: {
			skills: Array<{
				skill: string;
				level: number;
				boostable: boolean;
				required: boolean;
			}>;
			quests: string[];
			other: string[];
		};
		rewards: {
			questPoints: number;
			experienceRewards: Array<{
				skill: string;
				amount: number;
			}>;
			otherRewards: string[];
		};
	};

	export let questNameMap: Record<string, string>;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}
</script>

<div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
	<div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
		<div class="p-6">
			<div class="flex justify-between items-start mb-6">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white">{quest.name}</h2>
				<button
					on:click={closeModal}
					class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Description -->
			<div class="mb-8">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
				<p class="text-gray-600 dark:text-gray-300 leading-relaxed">{@html formatWikitext(quest.description)}</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Basic Info -->
				<div class="space-y-4">
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Basic Information</h3>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-400">Difficulty</p>
								<p class="text-gray-900 dark:text-white">{quest.difficulty}</p>
							</div>
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-400">Length</p>
								<p class="text-gray-900 dark:text-white">{quest.length}</p>
							</div>
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-400">Quest Points</p>
								<p class="text-gray-900 dark:text-white">{quest.questPoints}</p>
							</div>
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-400">Start Point</p>
								<p class="text-gray-900 dark:text-white">{@html formatWikitext(quest.start)}</p>
							</div>
						</div>
					</div>

					<!-- Requirements -->
					<div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
						<div class="space-y-4">
							{#if quest.requirements.skills.length > 0}
								<div>
									<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h4>
									<div class="flex flex-wrap gap-2">
										{#each quest.requirements.skills as skill}
											<SkillTag skill={skill} />
										{/each}
									</div>
								</div>
							{/if}

							{#if quest.requirements.quests.length > 0}
								<div>
									<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Quests</h4>
									<ul class="list-disc list-inside space-y-1">
										{#each quest.requirements.quests as questId}
											<li class="text-gray-800 dark:text-gray-200">
												{questNameMap[questId] || questId}
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if quest.requirements.other.length > 0}
								<div>
									<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Other Requirements</h4>
									<ul class="list-disc list-inside space-y-1">
										{#each quest.requirements.other as req}
											<li class="text-gray-800 dark:text-gray-200">{@html formatWikitext(req)}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Rewards -->
				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rewards</h3>
					<QuestReward rewards={quest.rewards} />
				</div>
			</div>
		</div>
	</div>
</div> 