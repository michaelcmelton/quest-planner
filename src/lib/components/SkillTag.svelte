<script lang="ts">
	export let skill: {
		skill: string;
		level: number;
		boostable: boolean;
		required: boolean;
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