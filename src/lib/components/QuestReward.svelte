<script lang="ts">
	import { formatWikitext } from '$lib/utils/wikitext';

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
		'Agility': '/icons/skills/agility-icon.png',
		'Attack': '/icons/skills/attack-icon.png',
		'Construction': '/icons/skills/construction-icon.png',
		'Cooking': '/icons/skills/cooking-icon.png',
		'Crafting': '/icons/skills/crafting-icon.png',
		'Defence': '/icons/skills/defence-icon.png',
		'Farming': '/icons/skills/farming-icon.png',
		'Firemaking': '/icons/skills/firemaking-icon.png',
		'Fishing': '/icons/skills/fishing-icon.png',
		'Fletching': '/icons/skills/fletching-icon.png',
		'Herblore': '/icons/skills/herblore-icon.png',
		'Hitpoints': '/icons/skills/hitpoints-icon.png',
		'Hunter': '/icons/skills/hunter-icon.png',
		'Magic': '/icons/skills/magic-icon.png',
		'Mining': '/icons/skills/mining-icon.png',
		'Prayer': '/icons/skills/prayer-icon.png',
		'Ranged': '/icons/skills/ranged-icon.png',
		'Runecraft': '/icons/skills/runecraft-icon.png',
		'Slayer': '/icons/skills/slayer-icon.png',
		'Smithing': '/icons/skills/smithing-icon.png',
		'Strength': '/icons/skills/strength-icon.png',
		'Thieving': '/icons/skills/thieving-icon.png',
		'Woodcutting': '/icons/skills/woodcutting-icon.png',
		'Quest': '/icons/skills/quests-icon.png',
		'Combat': '/icons/skills/multicombat-icon.png'
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