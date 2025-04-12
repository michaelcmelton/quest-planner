export type Theme = 'light' | 'dark';

export class ThemeStore {
  private _theme: Theme = 'light';

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        // Check if user has a theme preference in localStorage
        const storedTheme = localStorage.getItem('theme');

        // Check if user has a system preference for dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Initialize theme based on stored preference or system preference
        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
        this._theme = initialTheme as Theme;

        // Set up localStorage and DOM updates
        this.updateDOMAndStorage(this._theme);
      } catch (error) {
        console.error('Failed to initialize theme from storage:', error);
        // Keep default light theme
      }
    }
  }

  private updateDOMAndStorage(theme: Theme) {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme to storage:', error);
    }

    // DOM updates are separate from storage updates
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Failed to update DOM theme:', error);
    }
  }

  get theme(): Theme {
    return this._theme;
  }

  set theme(value: Theme) {
    // Validate theme value
    if (value === 'light' || value === 'dark') {
      this._theme = value;
      this.updateDOMAndStorage(value);
    } else {
      this._theme = 'light'; // Default to light theme for invalid values
      this.updateDOMAndStorage('light');
    }
  }
}

let theme: ThemeStore | null = null;

// Create singleton instance
export const getTheme = () => {
  if (theme === null) {
    theme = new ThemeStore();
  }

  return theme;
}