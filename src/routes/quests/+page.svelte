<script lang="ts">
  import questsData from '$lib/data/quests.json';
  import type { Quest } from '$lib/types/quests';
  import QuestCard from '$lib/components/QuestCard.svelte';

  let searchTerm = $state('');
  let selectedDifficulty = $state('All');
  let selectedMembership = $state('All');
  let selectedRequiredSkill = $state('All');
  let selectedRewardSkill = $state('All');
  let isFilterMenuOpen = $state(false);

  const difficulties = ['All', 'Novice', 'Intermediate', 'Experienced', 'Master', 'Grandmaster'];
  const membershipOptions = ['All', 'Members', 'Free-to-play'];
  const quests = Object.values(questsData) as Quest[];

  function formatSkillName(skill: string): string {
    if (skill === 'Quest') return 'Quest Points';
    return skill;
  }

  // Get unique skills from requirements and rewards
  const requiredSkills = $derived(['All', ...Array.from(new Set(quests.flatMap(quest => 
    quest.requirements.skills.map(skill => skill.skill)
  ))).sort()]);

  const rewardSkills = $derived(['All', ...Array.from(new Set(quests.flatMap(quest => 
    quest.rewards.experienceRewards.map(reward => reward.skill)
  ))).sort()]);

  const filteredQuests = $derived(quests.filter((quest: Quest) => {
    const matchesSearch = quest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || quest.difficulty === selectedDifficulty;
    const matchesMembership = selectedMembership === 'All' || 
      (selectedMembership === 'Members' && quest.members) ||
      (selectedMembership === 'Free-to-play' && !quest.members);
    const matchesRequiredSkill = selectedRequiredSkill === 'All' || 
      quest.requirements.skills.some(skill => skill.skill === selectedRequiredSkill);
    const matchesRewardSkill = selectedRewardSkill === 'All' || 
      quest.rewards.experienceRewards.some(reward => reward.skill === selectedRewardSkill);
    return matchesSearch && matchesDifficulty && matchesMembership && matchesRequiredSkill && matchesRewardSkill;
  }));
</script>

<div class="quests-container">
  <div class="filters">
    <div class="search-box">
      <input
        type="text"
        placeholder="Search quests..."
        bind:value={searchTerm}
      />
      <button 
        class="filter-toggle"
        class:active={isFilterMenuOpen}
        onclick={() => isFilterMenuOpen = !isFilterMenuOpen}
      >
        Filters
      </button>
    </div>
    <div class="filter-menu" class:open={isFilterMenuOpen}>
      <div class="filter-section">
        <h3>Difficulty</h3>
        <select bind:value={selectedDifficulty}>
          {#each difficulties as difficulty}
            <option value={difficulty}>{difficulty}</option>
          {/each}
        </select>
      </div>
      <div class="filter-section">
        <h3>Membership</h3>
        <select bind:value={selectedMembership}>
          {#each membershipOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </div>
      <div class="filter-section">
        <h3>Required Skill</h3>
        <select bind:value={selectedRequiredSkill}>
          {#each requiredSkills as skill}
            <option value={skill}>{formatSkillName(skill)}</option>
          {/each}
        </select>
      </div>
      <div class="filter-section">
        <h3>Reward Skill</h3>
        <select bind:value={selectedRewardSkill}>
          {#each rewardSkills as skill}
            <option value={skill}>{formatSkillName(skill)}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <div class="quests-grid">
    {#each filteredQuests as quest (quest.name)}
      <QuestCard {quest} />
    {/each}
  </div>
</div>

<style>
  .quests-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-lg);
  }

  .filters {
    margin-bottom: var(--spacing-xl);
    position: relative;
  }

  .search-box {
    display: flex;
    gap: var(--spacing-sm);
  }

  .search-box input {
    flex: 1;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  .filter-toggle {
    padding: var(--spacing-md) var(--spacing-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-speed);
  }

  .filter-toggle:hover {
    background-color: var(--color-bg-tertiary);
  }

  .filter-toggle.active {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    border-color: var(--color-primary);
  }

  .filter-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 300px;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    margin-top: var(--spacing-sm);
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-speed);
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-border);
  }

  .filter-menu.open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .filter-section {
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
  }

  .filter-section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .filter-section h3 {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .filter-section select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    cursor: pointer;
  }

  .filter-section select option {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  .quests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
</style> 