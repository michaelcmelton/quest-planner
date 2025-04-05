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
</script>

<script lang="ts">
  export let quest: QuestSummaryProps;
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
  <div class="flex justify-between items-start mb-2">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{quest.name}</h3>
    <span class="text-sm font-medium px-2 py-1 rounded-full {quest.isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}">
      {quest.isCompleted ? 'Completed' : 'Incomplete'}
    </span>
  </div>

  <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
    <div>
      <span class="font-medium">Difficulty:</span>
      <span class="ml-1">{quest.difficulty}</span>
    </div>
    <div>
      <span class="font-medium">Length:</span>
      <span class="ml-1">{quest.length}</span>
    </div>
    <div>
      <span class="font-medium">Quest Points:</span>
      <span class="ml-1">{quest.questPoints}</span>
    </div>
  </div>

  {#if quest.requirements.quests?.length}
    <div class="mt-3">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Required Quests:</h4>
      <ul class="text-sm text-gray-600 dark:text-gray-400">
        {#each quest.requirements.quests as requiredQuest}
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            {requiredQuest}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div> 