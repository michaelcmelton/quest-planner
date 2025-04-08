<script lang="ts">
	import { base } from '$app/paths';
	import type { SkillRequirement } from '$lib/types/quest';

	export let skill: SkillRequirement;

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

	$: iconPath = skillIcons[skill.skill] || '';
</script>

<div
	class="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium
		{skill.required 
			? skill.boostable 
				? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-dashed border-purple-300 dark:border-purple-700' 
				: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
			: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}"
>
	{#if iconPath}
		<img
			src={iconPath}
			alt={skill.skill}
			class="w-4 h-4 mr-1"
		/>
	{/if}
	<span class="font-semibold">{skill.skill}</span>
	<span class="ml-1 text-xs opacity-75">{skill.level}</span>
	{#if skill.boostable}
		<span class="ml-1 text-xs opacity-75" title="Boostable">(B)</span>
	{/if}
</div> 