<script>
  import '../styles/global.css';
  import MobileMenu from '$lib/components/MobileMenu.svelte';
</script>

<div class="layout">
  <header class="header">
    <nav class="nav">
      <div class="logo">OSRS Quest Planner</div>
      <div class="desktop-nav">
        <a href="/" class="nav-link">Home</a>
        <a href="/quests" class="nav-link">Quests</a>
        <a href="/planner" class="nav-link">Planner</a>
      </div>
      <MobileMenu />
    </nav>
  </header>

  <main class="main">
    <slot />
  </main>

  <footer class="footer">
    <p>© {new Date().getFullYear()} OSRS Quest Planner. Not affiliated with Jagex Ltd.</p>
  </footer>
</div>

<style>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
  }

  .header {
    background-color: var(--color-bg-primary);
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-text-primary);
  }

  .desktop-nav {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--color-text-primary);
    text-decoration: none;
    transition: color var(--transition-speed) ease;
    font-family: var(--font-body);
  }

  .nav-link:hover {
    color: var(--color-tertiary);
  }

  .main {
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .footer {
    background-color: var(--color-bg-primary);
    padding: 1rem;
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-primary);
  }

  @media (min-width: 1200px) {
    .main {
      padding: 2rem 0;
    }
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
  }
</style> 