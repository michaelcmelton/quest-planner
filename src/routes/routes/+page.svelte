<!-- src/routes/routes/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';

  function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function deleteRoute(route: Route) {
    if (confirm(`Are you sure you want to delete "${route.name}"?`)) {
      routesStore.deleteRoute(route.id);
    }
  }

  function editRoute(route: Route) {
    goto(`/planner/${route.id}`);
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">My Routes</h1>
    <button
      on:click={() => goto('/planner')}
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      New Route
    </button>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    {#if $routesStore.length === 0}
      <p class="text-gray-600 dark:text-gray-300">No routes created yet. Click "New Route" to start planning your quest journey!</p>
    {:else}
      <div class="space-y-4">
        {#each $routesStore as route}
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h2 class="text-xl font-semibold">{route.name}</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Created: {formatDate(route.createdAt)}
                  {#if route.updatedAt !== route.createdAt}
                    <br>Updated: {formatDate(route.updatedAt)}
                  {/if}
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  aria-label="Edit route"
                  on:click={() => editRoute(route)}
                  class="text-blue-500 hover:text-blue-700 p-1"
                  title="Edit route"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  aria-label="Delete route"
                  on:click={() => deleteRoute(route)}
                  class="text-red-500 hover:text-red-700 p-1"
                  title="Delete route"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="mt-2">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quests ({route.quests.length}):</h3>
              <div class="flex flex-wrap gap-2">
                {#each route.quests as quest}
                  <span class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                    {quest}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div> 