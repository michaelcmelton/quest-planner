<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import questsData from '$lib/data/quests.json';
	import SkillTag from '$lib/components/SkillTag.svelte';
	import QuestReward from '$lib/components/QuestReward.svelte';
	import QuestDetail from '$lib/components/QuestDetail.svelte';

	type Quest = {
		id: string;
		name: string;
		difficulty: string;
		length: string;
		questPoints: number;
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

	type QuestTableData = {
		name: string;
		difficulty: string;
		length: string;
		questPoints: number;
		start: string;
		description: string;
		requirements: Quest['requirements'];
		rewards: Quest['rewards'];
	};

	type SortableField = keyof Omit<QuestTableData, 'requirements' | 'rewards'>;

	// Create a mapping of quest IDs to names
	const questNameMap = Object.entries(questsData).reduce((acc, [id, quest]) => {
		acc[id] = quest.name;
		return acc;
	}, {} as Record<string, string>);

	// Transform the quest data for the table
	const quests: QuestTableData[] = Object.values(questsData).map(quest => ({
		name: quest.name,
		difficulty: quest.difficulty,
		length: quest.length,
		questPoints: quest.rewards.questPoints,
		start: quest.start,
		description: quest.description,
		requirements: quest.requirements,
		rewards: quest.rewards
	}));

	let sortBy: SortableField = 'name';
	let sortDirection = 'asc';
	let searchTerm = '';
	let filteredQuests = quests;
	let selectedQuest: QuestTableData | null = null;

	$: {
		filteredQuests = quests.filter(quest => 
			quest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			quest.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
		).sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];
			const modifier = sortDirection === 'asc' ? 1 : -1;
			return aValue > bValue ? modifier : -modifier;
		});
	}

	function handleSort(column: SortableField) {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}
	}

	function handleQuestClick(quest: QuestTableData) {
		selectedQuest = quest;
	}

	function handleCloseDetail() {
		selectedQuest = null;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Quest Browser</h1>
	
	<!-- Requirements Legend -->
	<div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
		<h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Skill Requirements Legend</h2>
		<div class="flex flex-wrap gap-4">
			<div class="flex items-center">
				<div class="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded mr-2"></div>
				<span class="text-sm text-gray-700 dark:text-gray-300">Required Skill</span>
			</div>
			<div class="flex items-center">
				<div class="w-4 h-4 bg-purple-100 dark:bg-purple-900 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded mr-2"></div>
				<span class="text-sm text-gray-700 dark:text-gray-300">Required & Boostable</span>
			</div>
			<div class="flex items-center">
				<div class="w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded mr-2"></div>
				<span class="text-sm text-gray-700 dark:text-gray-300">Optional Skill</span>
			</div>
		</div>
		<p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
			Required skills must be achieved before starting the quest. Optional skills can be helpful but are not mandatory. 
			Skills with a dashed purple border can be temporarily increased using potions or other boosts.
		</p>
	</div>
	
	<!-- Search and Filter -->
	<div class="mb-6">
		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Search quests..."
			class="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>

	<!-- Quest Table -->
	<div class="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
		<table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
			<thead class="bg-gray-100 dark:bg-gray-800">
				<tr>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
						on:click={() => handleSort('name')}
					>
						Quest Name {sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
						on:click={() => handleSort('difficulty')}
					>
						Difficulty {sortBy === 'difficulty' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
						on:click={() => handleSort('length')}
					>
						Length {sortBy === 'length' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th
						class="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
						on:click={() => handleSort('questPoints')}
					>
						Quest Points {sortBy === 'questPoints' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
					</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
						Requirements
					</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
						Rewards
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-300 dark:divide-gray-700">
				{#each filteredQuests as quest, i}
					<tr class="{i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} hover:bg-gray-200 dark:hover:bg-gray-700">
						<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
							<button
								on:click={() => handleQuestClick(quest)}
								class="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
							>
								{quest.name}
							</button>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
							{quest.difficulty}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
							{quest.length}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
							{quest.questPoints}
						</td>
						<td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">
							<div class="space-y-2">
								{#if quest.requirements.skills.length > 0}
									<div class="flex flex-wrap gap-2">
										{#each quest.requirements.skills as skill}
											<SkillTag skill={skill} />
										{/each}
									</div>
								{/if}
								{#if quest.requirements.quests.length > 0}
									<div class="text-sm">
										<span class="font-medium text-gray-900 dark:text-white">Required Quests:</span>
										<ul class="list-disc list-inside">
											{#each quest.requirements.quests as questId}
												<li>{questNameMap[questId] || questId}</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if quest.requirements.other.length > 0}
									<div class="text-sm">
										<span class="font-medium text-gray-900 dark:text-white">Other Requirements:</span>
										<ul class="list-disc list-inside">
											{#each quest.requirements.other as req}
												<li>{req}</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</td>
						<td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">
							<QuestReward rewards={quest.rewards} />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Quest Detail Modal -->
	{#if selectedQuest}
		<QuestDetail
			quest={selectedQuest}
			questNameMap={questNameMap}
			on:close={handleCloseDetail}
		/>
	{/if}
</div>
