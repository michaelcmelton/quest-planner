<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  
  export let isOpen = false;
  
  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<div class="mobile-menu">
  <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
    <span class="hamburger-line" class:open={isOpen}></span>
    <span class="hamburger-line" class:open={isOpen}></span>
    <span class="hamburger-line" class:open={isOpen}></span>
  </button>

  {#if isOpen}
    <nav class="nav-menu" transition:slide={{ duration: 200 }}>
      <div class="nav-links" transition:fade={{ duration: 200 }}>
        <a href="/" class="nav-link" on:click={() => isOpen = false}>Home</a>
        <a href="/quests" class="nav-link" on:click={() => isOpen = false}>Quests</a>
        <a href="/planner" class="nav-link" on:click={() => isOpen = false}>Planner</a>
      </div>
    </nav>
  {/if}
</div>

<style>
  .mobile-menu {
    display: none;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
  }

  .hamburger-line {
    width: 100%;
    height: 3px;
    background-color: var(--color-text-primary);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .hamburger-line.open:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .hamburger-line.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger-line.open:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-bg-primary);
    padding: 5rem 2rem 2rem;
    z-index: 5;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    font-size: 1.25rem;
    color: var(--color-text-primary);
    text-decoration: none;
    transition: color var(--transition-speed) ease;
  }

  .nav-link:hover {
    color: var(--color-tertiary);
  }

  @media (max-width: 768px) {
    .mobile-menu {
      display: block;
    }
  }
</style> 