<script lang="ts">
  import type { Quest } from '$lib/types/quests';
  import { parseWikiText } from '$lib/utils/wikitext';

  export let quest: Quest;

  function getDifficultyClass(difficulty: string): string {
    switch (difficulty) {
      case 'Novice':
        return 'novice';
      case 'Intermediate':
        return 'intermediate';
      case 'Experienced':
        return 'experienced';
      case 'Master':
        return 'master';
      case 'Grandmaster':
        return 'grandmaster';
      default:
        return 'default';
    }
  }

  $: parsedDescription = parseWikiText(quest.description);
</script>

<div class="quest-item">
  <div class="header">
    <h3 class="title">{quest.name}</h3>
    <div class="badges">
      {#if quest.members}
        <span class="badge members">Members</span>
      {/if}
      <span class="badge difficulty {getDifficultyClass(quest.difficulty)}">
        {quest.difficulty}
      </span>
    </div>
  </div>
  <p class="description">{@html parsedDescription}</p>
  {#if quest.requirements.quests.length > 0 || quest.requirements.skills.some(s => s.required)}
    <div class="requirements">
      {#if quest.requirements.quests.length > 0}
        <span class="requirement">
          {quest.requirements.quests.length} quest{quest.requirements.quests.length > 1 ? 's' : ''} required
        </span>
      {/if}
      {#if quest.requirements.skills.some(s => s.required)}
        <span class="requirement">
          {#if quest.requirements.quests.length > 0}
            • {quest.requirements.skills.filter(s => s.required).length} skill{quest.requirements.skills.filter(s => s.required).length > 1 ? 's' : ''} required
          {:else}
            {quest.requirements.skills.filter(s => s.required).length} skill{quest.requirements.skills.filter(s => s.required).length > 1 ? 's' : ''} required
          {/if}
        </span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .quest-item {
    background-color: var(--color-bg-secondary);
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-secondary);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
  }

  .quest-item:hover {
    border-color: var(--color-primary);
    background-color: var(--color-bg-primary);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .badges {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .badge {
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .badge.members {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
  }

  .badge.difficulty {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
  }

  .badge.difficulty.novice {
    background-color: #22543d;
    color: #c6f6d5;
  }

  .badge.difficulty.intermediate {
    background-color: #744210;
    color: #fefcbf;
  }

  .badge.difficulty.experienced {
    background-color: #7b341e;
    color: #feebc8;
  }

  .badge.difficulty.master {
    background-color: #742a2a;
    color: #fed7d7;
  }

  .badge.difficulty.grandmaster {
    background-color: #44337a;
    color: #e9d8fd;
  }

  .description {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-text-primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .requirements {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .requirement {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  :global(.description a) {
    color: var(--color-link, #00b7ff);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: all 0.2s ease-in-out;
    font-weight: 500;
  }

  :global(.description a:hover) {
    color: var(--color-link-hover, #66d4ff);
    text-decoration: underline;
  }

  :global(.description a:visited) {
    color: var(--color-link-visited, #b39ddb);
  }
</style> 