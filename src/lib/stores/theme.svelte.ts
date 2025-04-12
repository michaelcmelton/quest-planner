export type Theme = 'light' | 'dark';

export class ThemeStore {
  private _theme: Theme = 'light';

  constructor() {
    try {
      // Check if user has a theme preference in localStorage
      const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;

      // Check if user has a system preference for dark mode
      const prefersDark = typeof window !== 'undefined' ? 
        window.matchMedia('(prefers-color-scheme: dark)').matches : false;

      // Initialize theme based on stored preference or system preference
      const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
      this._theme = initialTheme as Theme;
    } catch (error) {
      console.error('Failed to initialize theme from storage:', error);
      // Keep default light theme
    }

    // Set up localStorage and DOM updates
    this.updateDOMAndStorage(this._theme);
  }

  private updateDOMAndStorage(theme: Theme) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
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