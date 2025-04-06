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
	<footer data-testid="footer" class="bg-white dark:bg-gray-800 shadow-inner mt-auto">
		<div class="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
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
