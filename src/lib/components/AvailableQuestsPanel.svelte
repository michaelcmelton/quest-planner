<script lang="ts">
  import questsData from '$lib/data/quests.json';
  import type { Quest } from '$lib/types/quests';
  import QuestListItem from './QuestListItem.svelte';

  let searchTerm = $state('');
  let selectedDifficulty = $state('All');
  let selectedMembership = $state('All');

  const difficulties = ['All', 'Novice', 'Intermediate', 'Experienced', 'Master', 'Grandmaster'];
  const membershipOptions = ['All', 'Members', 'Free-to-play'];
  const quests = Object.values(questsData) as Quest[];

  const filteredQuests = $derived(quests.filter((quest: Quest) => {
    const matchesSearch = quest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || quest.difficulty === selectedDifficulty;
    const matchesMembership = selectedMembership === 'All' || 
      (selectedMembership === 'Members' && quest.members) ||
      (selectedMembership === 'Free-to-play' && !quest.members);
    return matchesSearch && matchesDifficulty && matchesMembership;
  }));
</script>

<div class="panel">
  <div class="controls">
    <!-- Search -->
    <div class="search">
      <input
        type="text"
        placeholder="Search quests..."
        bind:value={searchTerm}
        class="search-input"
      />
    </div>

    <!-- Filters -->
    <div class="filters">
      <!-- Difficulty Filter -->
      <select
        bind:value={selectedDifficulty}
        class="filter-select"
        data-testid="difficulty-select"
      >
        {#each difficulties as difficulty}
          <option value={difficulty}>{difficulty}</option>
        {/each}
      </select>

      <!-- Membership Filter -->
      <select
        bind:value={selectedMembership}
        class="filter-select"
        data-testid="membership-select"
      >
        {#each membershipOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Quest List -->
  <div class="quest-list">
    {#if filteredQuests.length === 0}
      <div class="empty-state">
        <p>No quests found matching your criteria.</p>
      </div>
    {:else}
      {#each filteredQuests as quest (quest.id)}
        <div class="quest-item">
          <QuestListItem {quest} />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .search-input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-secondary);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .search-input::placeholder {
    color: var(--color-text-secondary);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .filter-select {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-secondary);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  .filter-select:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .quest-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    max-height: calc(100vh - 16rem);
    overflow-y: auto;
    padding: var(--spacing-md);
  }

  .quest-list::-webkit-scrollbar {
    width: var(--spacing-sm);
  }

  .quest-list::-webkit-scrollbar-track {
    background: var(--color-bg-primary);
    border-radius: var(--border-radius);
  }

  .quest-list::-webkit-scrollbar-thumb {
    background: var(--color-secondary);
    border-radius: var(--border-radius);
  }

  .quest-list::-webkit-scrollbar-thumb:hover {
    background: var(--color-tertiary);
  }

  .quest-item {
    transform: scale(1);
    transition: transform var(--transition-speed);
  }

  .quest-item:hover {
    transform: scale(1.01);
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    background-color: var(--color-bg-secondary);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-secondary);
    color: var(--color-text-secondary);
  }
</style> 