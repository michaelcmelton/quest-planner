<!-- src/routes/planner/+page.svelte -->
<script lang="ts">
  import QuestSummary from '$lib/components/quest/QuestSummary.svelte';
  import quests from '$lib/data/quests.json';
  import type { QuestData, QuestSummaryProps } from '$lib/types/quest';
  
  // Convert quest data to QuestSummaryProps format
  const questSummaries: QuestSummaryProps[] = Object.entries(quests).map(([id, quest]) => {
    // Type assertion for difficulty and length to match QuestSummaryProps
    const difficulty = quest.difficulty as QuestSummaryProps['difficulty'];
    const length = quest.length as QuestSummaryProps['length'];
    
    // Convert quest IDs to quest names
    const requiredQuestNames = quest.requirements?.quests?.map(questId => {
      const requiredQuest = quests[questId as keyof typeof quests];
      return requiredQuest?.name || questId; // Fallback to ID if quest not found
    }) || [];
    
    return {
      name: quest.name,
      difficulty,
      length,
      questPoints: quest.rewards.questPoints,
      requirements: {
        quests: requiredQuestNames,
        skills: quest.requirements?.skills?.map(skill => ({
          name: skill.skill,
          level: skill.level
        })) || [],
        items: quest.items || [] // Use the top-level items array
      },
      isCompleted: false // Default to false, can be updated based on user progress
    };
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Quest Planner</h1>
  
  <div data-testid="planner-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each questSummaries as quest}
      <QuestSummary {quest} />
    {/each}
  </div>
</div> 