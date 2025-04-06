import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

export function createThemeStore() {
  // Check if user has a theme preference in localStorage
  const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;

  // Check if user has a system preference for dark mode
  const prefersDark = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-color-scheme: dark)').matches : false;

  // Initialize theme based on stored preference or system preference
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  // Create the store
  const { subscribe, set } = writable<Theme>(initialTheme as Theme);

  // Subscribe to changes and update localStorage
  if (typeof localStorage !== 'undefined') {
    subscribe((value) => {
      // Only store valid theme values
      if (value === 'light' || value === 'dark') {
        localStorage.setItem('theme', value);
        if (value === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  return {
    subscribe,
    set: (value: unknown) => {
      // Validate theme value
      if (value === 'light' || value === 'dark') {
        set(value);
      } else {
        set('light'); // Default to light theme for invalid values
      }
    }
  };
}

export const theme = createThemeStore(); 