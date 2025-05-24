<script lang="ts">
  import type { Quest } from '$lib/types/quests';

  export let quest: Quest;

  const hasRequirements = quest.requirements.skills.length > 0;
  const hasRewards = quest.rewards.experienceRewards.length > 0;

  function getSkillIcon(skill: string): string {
    const skillName = skill.toLowerCase();
    if (skillName === 'quest') return '/icons/skills/quests-icon.png';
    if (skillName === 'combat') return '/icons/skills/multicombat-icon.png';
    return `/icons/skills/${skillName}-icon.png`;
  }
</script>

<div class="quest-card">
  <h2>{quest.name}</h2>
  <div class="badges">
    <span class="badge difficulty">{quest.difficulty}</span>
    {#if quest.members}
      <span class="badge members">Members</span>
    {/if}
  </div>
  <p class="description">{quest.description}</p>
  
  {#if hasRequirements || hasRewards}
    <div class="skills-section">
      {#if hasRequirements}
        <div class="skills-group">
          <h3>Requirements</h3>
          <div class="skills-list">
            {#each quest.requirements.skills as skill}
              <div class="skill-tag requirement">
                <img src={getSkillIcon(skill.skill)} alt={skill.skill} class="skill-icon" />
                <span class="skill-level">{skill.level}</span>
                {#if skill.boostable}
                  <span class="tag boostable" title="This requirement can be boosted">Boostable</span>
                {/if}
                {#if skill.required}
                  <span class="tag required" title="Required to start the quest">Required</span>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
      
      {#if hasRewards}
        <div class="skills-group">
          <h3>Rewards</h3>
          <div class="skills-list">
            {#each quest.rewards.experienceRewards as reward}
              <div class="skill-tag reward">
                <img src={getSkillIcon(reward.skill)} alt={reward.skill} class="skill-icon" />
                <span class="skill-xp">{reward.amount}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <div class="card-footer">
    <span class="quest-points">Quest Points: {quest.rewards.questPoints}</span>
    <button class="view-details">View Details</button>
  </div>
</div>

<style>
  .quest-card {
    background-color: var(--color-bg-secondary);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    transition: transform var(--transition-speed);
  }

  .quest-card:hover {
    transform: translateY(-2px);
  }

  h2 {
    margin-bottom: var(--spacing-sm);
    font-size: 1.25rem;
  }

  .badges {
    display: flex;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
  }

  .badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    font-size: 0.875rem;
  }

  .badge.difficulty {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
  }

  .badge.members {
    background-color: var(--color-tertiary);
    color: var(--color-bg-primary);
  }

  .description {
    color: var(--color-text-primary);
    font-size: 0.875rem;
    margin-bottom: var(--spacing-md);
  }

  .skills-section {
    margin-bottom: var(--spacing-md);
  }

  .skills-group {
    margin-bottom: var(--spacing-sm);
  }

  .skills-group h3 {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  .skill-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
  }

  .skill-tag.requirement {
    background-color: var(--color-bg-tertiary);
  }

  .skill-tag.reward {
    background-color: var(--color-primary);
  }

  .skill-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .skill-level, .skill-xp {
    font-weight: 500;
  }

  .tag {
    font-size: 0.625rem;
    padding: 2px 4px;
    border-radius: 4px;
    white-space: nowrap;
  }

  .tag.boostable {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
  }

  .tag.required {
    background-color: var(--color-tertiary);
    color: var(--color-bg-primary);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .quest-points {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }

  .view-details {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius);
    transition: background-color var(--transition-speed);
  }

  .view-details:hover {
    background-color: var(--color-tertiary);
  }
</style> 