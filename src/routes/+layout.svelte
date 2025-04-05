<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
</script>

<div class="min-h-screen flex flex-col">
	<!-- Navigation Header -->
	<header class="bg-white dark:bg-gray-800 shadow">
		<nav class="container mx-auto px-4 py-4">
			<div class="flex justify-between items-center">
				<a href="/" class="text-xl font-bold text-gray-900 dark:text-white">Quest Planner</a>
				<div class="space-x-4">
					<a
						href="/planner"
						class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors {page.url.pathname === '/planner' ? 'font-semibold' : ''}"
					>
						Planner
					</a>
					<a
						href="/quests"
						class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors {page.url.pathname === '/quests' ? 'font-semibold' : ''}"
					>
						Quests
					</a>
					<a
						href="/routes"
						class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors {page.url.pathname === '/routes' ? 'font-semibold' : ''}"
					>
						My Routes
					</a>
					<a
						href="/about"
						class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors {page.url.pathname === '/about' ? 'font-semibold' : ''}"
					>
						About
					</a>
				</div>
			</div>
		</nav>
	</header>

	<main class="flex-grow">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="bg-white dark:bg-gray-800 shadow-inner mt-auto">
		<div class="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
			© {new Date().getFullYear()} Quest Planner. Data from OSRS Wiki.
		</div>
	</footer>
</div>

<style>
	:global(html) {
		@apply h-full;
	}
	:global(body) {
		@apply h-full;
	}
</style>
