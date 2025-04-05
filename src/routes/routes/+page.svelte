<!-- src/routes/routes/+page.svelte -->
<script lang="ts">
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">My Routes</h1>
  
  <div class="mb-6">
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Create New Route
    </button>
  </div>

  <div data-testid="routes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Saved routes will go here -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-2">Saved Routes</h2>
      <p class="text-gray-600 dark:text-gray-300">Coming soon...</p>
    </div>
  </div>
</div> 