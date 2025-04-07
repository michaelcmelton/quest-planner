<script lang="ts">
	import { formatWikitext } from '$lib/utils/wikitext';
	import { base } from '$app/paths';

	export let rewards: {
		questPoints: number;
		experienceRewards: Array<{
			skill: string;
			amount: number;
		}>;
		otherRewards: string[];
	};

	// Map skill names to icon paths
	const skillIcons: Record<string, string> = {
		'Agility': `${base}/icons/skills/agility-icon.png`,
		'Attack': `${base}/icons/skills/attack-icon.png`,
		'Construction': `${base}/icons/skills/construction-icon.png`,
		'Cooking': `${base}/icons/skills/cooking-icon.png`,
		'Crafting': `${base}/icons/skills/crafting-icon.png`,
		'Defence': `${base}/icons/skills/defence-icon.png`,
		'Farming': `${base}/icons/skills/farming-icon.png`,
		'Firemaking': `${base}/icons/skills/firemaking-icon.png`,
		'Fishing': `${base}/icons/skills/fishing-icon.png`,
		'Fletching': `${base}/icons/skills/fletching-icon.png`,
		'Herblore': `${base}/icons/skills/herblore-icon.png`,
		'Hitpoints': `${base}/icons/skills/hitpoints-icon.png`,
		'Hunter': `${base}/icons/skills/hunter-icon.png`,
		'Magic': `${base}/icons/skills/magic-icon.png`,
		'Mining': `${base}/icons/skills/mining-icon.png`,
		'Prayer': `${base}/icons/skills/prayer-icon.png`,
		'Ranged': `${base}/icons/skills/ranged-icon.png`,
		'Runecraft': `${base}/icons/skills/runecraft-icon.png`,
		'Slayer': `${base}/icons/skills/slayer-icon.png`,
		'Smithing': `${base}/icons/skills/smithing-icon.png`,
		'Strength': `${base}/icons/skills/strength-icon.png`,
		'Thieving': `${base}/icons/skills/thieving-icon.png`,
		'Woodcutting': `${base}/icons/skills/woodcutting-icon.png`,
		'Quest': `${base}/icons/skills/quests-icon.png`,
		'Combat': `${base}/icons/skills/multicombat-icon.png`
	};
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