<script lang="ts">
    import '$lib/styles/global.scss';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
</script>

<main class="container" data-testid="main">
    <div class="content">
        <section class="hero">
            <h1 class="hero__title">Plan Your OSRS Quest Journey</h1>
            <p class="hero__subtitle">Create and optimize your quest routes with our powerful planning tools</p>
            <div class="hero__actions">
                <a href="/routes" class="button button--primary">Start Planning</a>
                <a href="/quest-list" class="button button--secondary">Browse Quests</a>
            </div>
        </section>

        <section class="features">
            <FeatureCard
                title="Quest Requirements"
                description="View detailed requirements for each quest, including skill levels, quest prerequisites, and items needed."
            />
            <FeatureCard
                title="Route Optimization"
                description="Create efficient quest routes that minimize backtracking and optimize your progression through the game."
            />
            <FeatureCard
                title="Progress Tracking"
                description="Track your quest completion progress and see what's next in your optimized quest route."
            />
        </section>
    </div>
</main>

<style lang="scss">
    .container {
        width: 100%;
        min-height: 100vh;
        padding: var(--spacing-xl);
    }

    .content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4xl);
    }

    .hero {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
        padding-top: var(--spacing-2xl);

        &__title {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: var(--spacing-lg);
            color: var(--color-text);
        }

        &__subtitle {
            font-size: 1.25rem;
            color: var(--color-text-secondary);
            margin-bottom: var(--spacing-xl);
        }

        &__actions {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;
        }
    }

    .features {
        margin-top: var(--spacing-lg);
        display: grid;
        gap: var(--spacing-xl);
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-md) var(--spacing-xl);
        border-radius: var(--border-radius);
        font-weight: 500;
        transition: all 0.2s ease;
        text-decoration: none;

        &--primary {
            background-color: var(--color-primary);
            color: var(--color-text-inverse);

            &:hover {
                background-color: var(--color-primary-dark);
            }
        }

        &--secondary {
            background-color: var(--color-surface);
            color: var(--color-text);
            border: 1px solid var(--color-border);

            &:hover {
                background-color: var(--color-surface-hover);
            }
        }
    }
</style>