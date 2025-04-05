<!-- src/routes/quests/+page.svelte -->
<script lang="ts">
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Quest Browser</h1>
  
  <div class="mb-6">
    <input
      type="text"
      placeholder="Search quests..."
      class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
    />
  </div>

  <div data-testid="quests-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Quest list will go here -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-2">Quest List</h2>
      <p class="text-gray-600 dark:text-gray-300">Coming soon...</p>
    </div>
  </div>
</div> 