<!-- src/routes/about/+page.svelte -->
<div class="container mx-auto px-4 py-16 max-w-4xl">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
    About Quest Planner
  </h1>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is Quest Planner?</h2>
    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
      Quest Planner was born out of a personal need while planning quest routes for a Slayer-Locked account with combat level experience limits. 
      I found myself struggling with complex spreadsheets and manual tracking, realizing there had to be a better way to plan and optimize quest routes.
    </p>
    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
      Recognizing that this challenge wasn't unique to my account type, I saw an opportunity to create a tool that could benefit the entire OSRS community. 
      Whether you're playing a specialized account, optimizing for efficiency, or just starting your questing journey, Quest Planner aims to make the process 
      more intuitive and enjoyable.
    </p>
    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      Built with modern web technologies and powered by data from the OSRS Wiki, Quest Planner provides an intuitive interface for quest route planning 
      and requirement tracking, going beyond the limitations of traditional spreadsheets to offer a dynamic, user-friendly experience.
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
    <ul class="space-y-4 text-lg text-gray-600 dark:text-gray-300">
      <li class="flex items-start">
        <svg class="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Interactive quest route planning with drag-and-drop functionality</span>
      </li>
      <li class="flex items-start">
        <svg class="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Comprehensive quest information and requirements tracking - straight from the OSRS Wiki</span>
      </li>
      <li class="flex items-start">
        <svg class="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Save, edit, delete, and share your quest routes</span>
      </li>
      <li class="flex items-start">
        <svg class="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Mobile-friendly design for planning on the go (Coming soon)</span>
      </li>
    </ul>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Support the Project</h2>
    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
      Quest Planner is a passion project developed to help the OSRS community. If you find this tool useful,
      consider supporting its development through Ko-fi. Your support helps cover hosting costs and
      enables the addition of new features.
    </p>
    <div id="kofi-widget-container" class="flex justify-center">
      <a href='https://ko-fi.com/I2I51D1KIU' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi5.png?v=6' alt='Buy Me a Coffee at ko-fi.com' /></a>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Credits</h2>
    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      Quest data provided by the OSRS Wiki. Special thanks to the OSRS community
      for their support and feedback. This project is not affiliated with Jagex Ltd.
    </p>
  </div>
</div> 