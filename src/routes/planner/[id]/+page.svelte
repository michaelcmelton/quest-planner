<script lang="ts">
  import { page } from '$app/stores';
  import { getRoute, updateRoute } from '$lib/stores/routes.svelte';
  import type { Route } from '$lib/stores/routes.svelte';
  import Button from '$lib/components/Button.svelte';
  import AvailableQuestsPanel from '$lib/components/AvailableQuestsPanel.svelte';
  import { onMount } from 'svelte';

  let route = $state<Route | undefined>(undefined);
  let isEditing = $state(false);
  let editName = $state('');

  onMount(() => {
    try {
      route = getRoute($page.params.id);
      editName = route.name;
    } catch (error) {
      // Handle route not found
      console.error('Route not found:', error);
    }
  });

  function handleNameEdit() {
    if (!route || !editName.trim()) return;
    updateRoute(route.id, { name: editName.trim() });
    isEditing = false;
  }

  function cancelNameEdit() {
    if (!route) return;
    editName = route.name;
    isEditing = false;
  }
</script>

{#if route}
  <div class="container">
    <div class="header">
      <Button href="/planner" variant="secondary">← Back to Routes</Button>
      <h1>
        {#if isEditing}
          <form 
            onsubmit={(event) => {
              event?.preventDefault();
              handleNameEdit();
            }}
            class="edit-form"
          >
            <input
              type="text"
              bind:value={editName}
              class="name-input"
              placeholder="Route name"
            />
            <Button type="submit" size="small">Save</Button>
            <Button 
              type="button" 
              variant="secondary" 
              size="small"
              on:click={cancelNameEdit}
            >
              Cancel
            </Button>
          </form>
        {:else}
          <div class="name-display">
            <span>{route.name}</span>
            <Button 
              variant="secondary" 
              size="small"
              on:click={() => isEditing = true}
            >
              Edit
            </Button>
          </div>
        {/if}
      </h1>
    </div>

    <div class="layout">
      <!-- Available Quests Panel -->
      <div class="panel">
        <h2>Available Quests</h2>
        <AvailableQuestsPanel />
      </div>

      <!-- Route Builder Panel -->
      <div class="route-panel">
        <h2>Route Builder</h2>
        {#if route.nodes.length === 0}
          <div class="empty-state">
            <p>
              Your route is empty. Drag quests from the left panel to start building your route.
            </p>
          </div>
        {:else}
          <div class="nodes">
            {#each route.nodes as node (node.id)}
              <div class="node">
                {node.name}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div class="not-found">
    <h1>Route Not Found</h1>
    <p>The route you're looking for doesn't exist.</p>
    <Button href="/planner">Back to Routes</Button>
  </div>
{/if}

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--spacing-md);
  }

  .edit-form {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .name-input {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-secondary);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  .name-input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .name-display {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  @media (min-width: 768px) {
    .layout {
      grid-template-columns: 1fr 2fr;
    }
  }

  .panel, .route-panel {
    background-color: var(--color-bg-secondary);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    background-color: var(--color-bg-primary);
    border-radius: var(--border-radius);
  }

  .empty-state p {
    color: var(--color-text-secondary);
  }

  .nodes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .node {
    padding: var(--spacing-md);
    background-color: var(--color-bg-primary);
    border-radius: var(--border-radius);
  }

  .not-found {
    text-align: center;
    padding: var(--spacing-xl);
  }

  .not-found h1 {
    margin-bottom: var(--spacing-md);
  }

  .not-found p {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }
</style> 