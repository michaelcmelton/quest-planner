<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<div class="hero">
  <div class="hero-content">
    <h1>OSRS Quest Planner</h1>
    <p class="subtitle">Plan your quest journey efficiently and never miss a requirement again</p>
    <div class="cta-buttons">
      <Button size="large" on:click={() => window.location.href = '/planner'}>
        Start Planning
      </Button>
      <Button variant="secondary" size="large" on:click={() => window.location.href = '/quests'}>
        Browse Quests
      </Button>
    </div>
  </div>
</div>

<section class="features">
  <div class="feature">
    <h2>Smart Planning</h2>
    <p>Get optimized quest paths based on your current stats and completed quests</p>
  </div>
  <div class="feature">
    <h2>Requirements Tracking</h2>
    <p>Never miss a skill requirement or item needed for your next quest</p>
  </div>
  <div class="feature">
    <h2>Progress Tracking</h2>
    <p>Keep track of your quest progress and achievements</p>
  </div>
</section>

<style>
  .hero {
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-accent);
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }

  .cta-buttons {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    margin-bottom: var(--spacing-lg);
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    padding: var(--spacing-xl) 0;
  }

  .feature {
    background-color: var(--color-bg-secondary);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    text-align: center;
  }

  .feature h2 {
    color: var(--color-accent);
    margin-bottom: var(--spacing-sm);
  }

  .feature p {
    color: var(--color-text-secondary);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .features {
      grid-template-columns: 1fr;
    }
  }
</style>