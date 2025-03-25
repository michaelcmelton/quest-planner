<!-- src/routes/about/+page.svelte -->
<div class="space-y-8">
	<div class="text-center">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
			About Quest Planner
		</h1>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
			Your companion for OSRS quest planning.
		</p>
	</div>

	<div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 space-y-6">
		<section>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white">What is Quest Planner?</h2>
			<p class="mt-2 text-gray-600 dark:text-gray-300">
				Quest Planner is a web application designed to help Old School RuneScape players efficiently plan
				their quest completion routes. It provides an interactive interface to visualize quest requirements,
				track progress, and create optimal quest completion paths.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Features</h2>
			<ul class="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
				<li>Interactive quest planning interface</li>
				<li>Quest requirements visualization</li>
				<li>Skill requirement tracking</li>
				<li>Custom route creation</li>
				<li>Progress tracking</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Data Source</h2>
			<p class="mt-2 text-gray-600 dark:text-gray-300">
				Quest data is sourced from the OSRS Wiki API, ensuring accurate and up-to-date information for all
				quests in the game.
			</p>
		</section>
	</div>
</div> 