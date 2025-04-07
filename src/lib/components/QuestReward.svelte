<script lang="ts">
	import { formatWikitext } from '$lib/utils/wikitext';
	import { skillIcons } from '$lib/utils/static-paths';
	import type { Rewards } from '$lib/types/quest';

	type QuestRewardsProps = {
		rewards: Rewards;
	};
  
	const {rewards}: QuestRewardsProps = $props();
</script>

<div class="space-y-4">
	<!-- Quest Points -->
	<div class="flex items-center gap-2">
		<img src={skillIcons['Quest']} alt="Quest Points" class="w-5 h-5" />
		<span class="text-gray-900 dark:text-white">{rewards.questPoints} Quest Point{rewards.questPoints !== 1 ? 's' : ''}</span>
	</div>

	<!-- Experience Rewards -->
	{#if rewards.experienceRewards.length > 0}
		<div class="space-y-2">
			<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Rewards</h4>
			<div class="flex flex-wrap gap-2">
				{#each rewards.experienceRewards as reward}
					<div class="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded whitespace-nowrap">
						<img
							src={skillIcons[reward.skill]}
							alt={reward.skill}
							class="w-5 h-5"
						/>
						<span class="text-green-700 dark:text-green-400">
							{reward.amount.toLocaleString()} XP
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Other Rewards -->
	{#if rewards.otherRewards.length > 0}
		<div class="space-y-2">
			<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Other Rewards</h4>
			<ul class="list-disc list-inside space-y-1">
				{#each rewards.otherRewards as reward}
					<li class="text-gray-800 dark:text-gray-200">{@html formatWikitext(reward)}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div> 