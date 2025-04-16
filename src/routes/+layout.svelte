<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import { page } from '$app/state';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';

</script>

<div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
	<!-- Navigation Header -->
	<header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
		<nav class="container mx-auto px-4 py-4">
			<div class="flex justify-between items-center">
				<a href="{base}" class="text-xl font-bold text-gray-800 dark:text-white">Quest Planner</a>
				<div class="flex items-center space-x-4">
					<a
					href="{base}/about"
					class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors {page.url.pathname === '/about' ? 'font-semibold' : ''}"
					>
					About
					</a>
					<a
					href="{base}/quest-list"
					class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors {page.url.pathname === '/quest-list' ? 'font-semibold' : ''}"
					>
					Quest List
					</a>
					<a
					href="{base}/routes"
					class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors {page.url.pathname === '/routes' ? 'font-semibold' : ''}"
					>
					Routes
					</a>
						<button
							class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
							aria-label="Toggle theme"
						>
							<MoonIcon />
					
							<SunIcon />
						</button>
				</div>
			</div>
		</nav>
	</header>

	<main class="flex-grow bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-700">
		<slot />
	</main>

	<!-- Footer -->
	<footer data-testid="footer" class="bg-white dark:bg-gray-800 shadow-inner mt-auto border-t border-gray-200 dark:border-gray-700">
		<div class="container mx-auto px-4 py-4 text-center text-gray-500 dark:text-gray-400">
			© {new Date().getFullYear()} Quest Planner. Data sourced from OSRS Wiki. Built by <a href="https://github.com/michaelcmelton" class="text-blue-500 hover:text-blue-600">TSCodeMonke</a>.
		</div>
	</footer>
</div>

<style lang="postcss">
	:global(html) {
		@apply h-full;
	}
	:global(body) {
		@apply h-full;
	}
</style>
