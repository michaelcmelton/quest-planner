<script lang="ts">
    interface Props {
        title: string;
        description: string;
    }

    const { title, description } = $props();
</script>

<div class="feature-card" role="article">
    <h2 class="feature-card__title">{title}</h2>
    <p class="feature-card__text">{description}</p>
</div>

<style lang="scss">
    .feature-card {
        background-color: var(--color-surface);
        padding: var(--spacing-xl);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-sm);
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        &__title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: var(--spacing-md);
            color: var(--color-text);
        }

        &__text {
            color: var(--color-text-secondary);
            line-height: 1.6;
        }
    }
</style> 