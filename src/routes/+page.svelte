<script lang="ts">
    import '$lib/styles/global.scss';
</script>

<main class="container">
    <h1 class="page-title">Quest Planner</h1>
    <div class="grid">
        <div class="card">
            <h2 class="card-title">Quest List</h2>
            <p class="card-text">Browse all available quests and their requirements.</p>
        </div>
        <div class="card">
            <h2 class="card-title">Route Planner</h2>
            <p class="card-text">Create and optimize your quest routes.</p>
        </div>
        <div class="card">
            <h2 class="card-title">Requirements</h2>
            <p class="card-text">Track your quest requirements and progress.</p>
        </div>
    </div>
</main>

<style lang="scss">
    .page-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: var(--spacing-xl);
        color: var(--color-text);
    }

    .grid {
        display: grid;
        gap: var(--spacing-md);
        grid-template-columns: 1fr;

        @media (min-width: var(--breakpoint-md)) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: var(--breakpoint-lg)) {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .card {
        background-color: var(--color-surface);
        padding: var(--spacing-lg);
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
    }

    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: var(--spacing-md);
        color: var(--color-text);
    }

    .card-text {
        color: var(--color-text-secondary);
        line-height: 1.5;
    }
</style>