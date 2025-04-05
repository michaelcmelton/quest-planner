<script lang="ts">
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
	<header class="bg-white dark:bg-gray-800 shadow-sm">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">Quest Planner</a>
			</div>
		</nav>
	</header>

	<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<slot />
	</main>

	<footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<p class="text-center text-sm text-gray-500 dark:text-gray-400">
				© {new Date().getFullYear()} Quest Planner. Data provided by OSRS Wiki.
			</p>
		</div>
	</footer>
</div>
