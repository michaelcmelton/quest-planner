<script lang="ts">
  import { getRoutes, createRoute, deleteRoute, duplicateRoute } from '$lib/stores/routes.svelte';
  import Button from '$lib/components/Button.svelte';

  let newRouteName = '';
  let isCreatingRoute = false;

  function handleCreateRoute() {
    if (!newRouteName.trim()) return;
    createRoute(newRouteName.trim());
    newRouteName = '';
    isCreatingRoute = false;
  }

  function handleDeleteRoute(id: string) {
    if (confirm('Are you sure you want to delete this route?')) {
      deleteRoute(id);
    }
  }

  function handleDuplicateRoute(id: string) {
    duplicateRoute(id);
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold">Quest Routes</h1>
    {#if !isCreatingRoute}
      <Button on:click={() => isCreatingRoute = true}>Create New Route</Button>
    {/if}
  </div>

  {#if isCreatingRoute}
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h2 class="text-xl font-semibold mb-4">Create New Route</h2>
      <form on:submit|preventDefault={handleCreateRoute} class="flex gap-4">
        <input
          type="text"
          bind:value={newRouteName}
          placeholder="Enter route name"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">Create</Button>
        <Button variant="secondary" on:click={() => isCreatingRoute = false}>Cancel</Button>
      </form>
    </div>
  {/if}

  <div class="grid gap-4">
    {#each getRoutes() as route (route.id)}
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold">{route.name}</h2>
            <p class="text-gray-500 text-sm mt-1">
              Last modified: {formatDate(route.lastModified)}
            </p>
            <p class="text-gray-600 mt-2">
              {route.nodes.length} {route.nodes.length === 1 ? 'node' : 'nodes'}
            </p>
          </div>
          <div class="flex gap-2">
            <Button href="/planner/{route.id}" variant="secondary">Edit</Button>
            <Button 
              variant="secondary"
              on:click={() => handleDuplicateRoute(route.id)}
            >
              Duplicate
            </Button>
            <Button 
              variant="danger"
              on:click={() => handleDeleteRoute(route.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    {/each}

    {#if getRoutes().length === 0}
      <div class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-600">No routes created yet. Create your first route to get started!</p>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Add any component-specific styles here */
</style> 