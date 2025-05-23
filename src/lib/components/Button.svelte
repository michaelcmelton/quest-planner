<script lang="ts">
  import { goto } from '$app/navigation';
  
  export let variant = 'primary';
  export let size = 'medium';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let href: string | undefined = undefined;

  function handleClick(event: MouseEvent) {
    if (href) {
      event.preventDefault();
      goto(href);
    }
  }
</script>

{#if href !== undefined}
  <a
    {href}
    class="button {variant} {size}"
    on:click={handleClick}
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="button {variant} {size}"
    on:click
  >
    <slot />
  </button>
{/if}

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: all var(--transition-speed) ease;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }

  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Variants */
  .primary {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
  }

  .primary:hover:not(:disabled) {
    background-color: var(--color-tertiary);
  }

  .secondary {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
  }

  .secondary:hover:not(:disabled) {
    background-color: var(--color-tertiary);
  }

  .danger {
    background-color: var(--color-danger, #dc2626);
    color: var(--color-text-primary);
  }

  .danger:hover:not(:disabled) {
    background-color: var(--color-danger-hover, #b91c1c);
  }

  /* Sizes */
  .small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.875rem;
  }

  .medium {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 1rem;
  }

  .large {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 1.125rem;
  }
</style> 