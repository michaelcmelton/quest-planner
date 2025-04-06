import { writable } from 'svelte/store';

// Check if user has a theme preference in localStorage
const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;

// Check if user has a system preference for dark mode
const prefersDark = typeof window !== 'undefined' ? 
  window.matchMedia('(prefers-color-scheme: dark)').matches : false;

// Initialize theme based on stored preference or system preference
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

// Create the store
export const theme = writable(initialTheme);

// Subscribe to changes and update localStorage
if (typeof localStorage !== 'undefined') {
  theme.subscribe((value) => {
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
} 