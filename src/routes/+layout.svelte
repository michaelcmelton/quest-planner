<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	function toggleTheme() {
		const newTheme = $theme === 'dark' ? 'light' : 'dark';
		theme.set(newTheme);
	}

	onMount(() => {
		// Ensure the theme is properly initialized
		const currentTheme = $theme;
		if (currentTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
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
					class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors {$page.url.pathname === '/about' ? 'font-semibold' : ''}"
					>
					About
					</a>
					<a
					href="{base}/quest-list"
					class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors {$page.url.pathname === '/quest-list' ? 'font-semibold' : ''}"
					>
					Quest List
					</a>
					<button
						on:click={toggleTheme}
						class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						aria-label="Toggle theme"
					>
						{#if $theme === 'dark'}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
							</svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
							</svg>
						{/if}
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
