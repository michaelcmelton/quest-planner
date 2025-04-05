<!-- src/lib/components/quest/QuestSummary.svelte -->
<script lang="ts" context="module">
  export interface QuestSummaryProps {
    name: string;
    difficulty: 'Novice' | 'Intermediate' | 'Experienced' | 'Master' | 'Grandmaster';
    length: 'Very Short' | 'Short' | 'Medium' | 'Long' | 'Very Long';
    questPoints: number;
    requirements: {
      quests?: string[];
      skills?: Array<{ name: string; level: number }>;
      items?: string[];
    };
    isCompleted?: boolean;
  }

  // Skill icon mapping
  const skillIcons: Record<string, string> = {
    'Attack': '/icons/skills/attack-icon.png',
    'Strength': '/icons/skills/strength-icon.png',
    'Defence': '/icons/skills/defence-icon.png',
    'Ranged': '/icons/skills/ranged-icon.png',
    'Prayer': '/icons/skills/prayer-icon.png',
    'Magic': '/icons/skills/magic-icon.png',
    'Runecraft': '/icons/skills/runecraft-icon.png',
    'Construction': '/icons/skills/construction-icon.png',
    'Hitpoints': '/icons/skills/hitpoints-icon.png',
    'Agility': '/icons/skills/agility-icon.png',
    'Quest': '/icons/skills/quests-icon.png',
    'Combat': '/icons/skills/multicombat-icon.png',
    'Herblore': '/icons/skills/herblore-icon.png',
    'Thieving': '/icons/skills/thieving-icon.png',
    'Crafting': '/icons/skills/crafting-icon.png',
    'Fletching': '/icons/skills/fletching-icon.png',
    'Slayer': '/icons/skills/slayer-icon.png',
    'Hunter': '/icons/skills/hunter-icon.png',
    'Mining': '/icons/skills/mining-icon.png',
    'Smithing': '/icons/skills/smithing-icon.png',
    'Fishing': '/icons/skills/fishing-icon.png',
    'Cooking': '/icons/skills/cooking-icon.png',
    'Firemaking': '/icons/skills/firemaking-icon.png',
    'Woodcutting': '/icons/skills/woodcutting-icon.png',
    'Farming': '/icons/skills/farming-icon.png'
  };

  // Helper function to get difficulty color classes
  function getDifficultyColor(difficulty: QuestSummaryProps['difficulty']) {
    switch (difficulty) {
      case 'Novice':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Intermediate':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Experienced':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Master':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Grandmaster':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }

  // Helper function to get length color classes
  function getLengthColor(length: QuestSummaryProps['length']) {
    switch (length) {
      case 'Very Short':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Short':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Long':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Very Long':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }

  // Helper function to get skill level color classes
  function getSkillLevelColor(level: number) {
    if (level >= 80) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    if (level >= 60) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    if (level >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    if (level >= 20) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
</script>

<script lang="ts">
  export let quest: QuestSummaryProps;

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = '/icons/skills/attack-icon.png';
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
  <div class="flex justify-between items-start mb-2">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{quest.name}</h3>
    <span class="text-sm font-medium px-2 py-1 rounded-full {quest.isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}">
      {quest.isCompleted ? 'Completed' : 'Incomplete'}
    </span>
  </div>

  <div class="flex flex-wrap gap-2 mb-3">
    <span class="text-sm font-medium px-2 py-1 rounded-full {getDifficultyColor(quest.difficulty)}">
      {quest.difficulty}
    </span>
    <span class="text-sm font-medium px-2 py-1 rounded-full {getLengthColor(quest.length)}">
      {quest.length}
    </span>
    <span class="text-sm font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
      {quest.questPoints} QP
    </span>
  </div>

  {#if quest.requirements.skills?.length}
    <div class="flex flex-wrap gap-2">
      {#each quest.requirements.skills as skill}
        <span class="text-sm font-medium px-2 py-1 rounded-full {getSkillLevelColor(skill.level)} flex items-center gap-1">
          <img 
            src={skillIcons[skill.name]} 
            alt={skill.name}
            class="w-4 h-4"
            on:error={handleImageError}
          />
          <span>{skill.level}</span>
        </span>
      {/each}
    </div>
  {/if}
</div> 