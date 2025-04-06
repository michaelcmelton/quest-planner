// src/lib/stores/theme.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createThemeStore } from './theme';

describe('theme store', () => {
  let matchMediaMock: (query: string) => MediaQueryList;
  let theme: ReturnType<typeof createThemeStore>;

  beforeEach(() => {
    // Reset localStorage and document class
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');

    // Mock matchMedia with light theme preference by default
    matchMediaMock = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));
    window.matchMedia = matchMediaMock;

    // Create a new instance of the store for each test
    theme = createThemeStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
    theme.set('light'); // Reset theme to default
  });

  it('should initialize with light theme when no preference is stored', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should initialize with dark theme when stored preference is dark', () => {
    localStorage.setItem('theme', 'dark');
    theme = createThemeStore(); // Recreate store with dark preference
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should respect system preference when no stored preference exists', () => {
    // Reset store and localStorage
    theme.set('light');
    localStorage.clear();
    document.documentElement.classList.remove('dark');

    // Mock system preference to dark
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    // Create new store with dark system preference
    theme = createThemeStore();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should update localStorage when theme changes', () => {
    theme.set('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    theme.set('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should persist theme preference across page reloads', () => {
    theme.set('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Simulate page reload
    theme = createThemeStore();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle between light and dark themes', () => {
    theme.set('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    theme.set('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    theme.set('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should handle invalid theme values gracefully', () => {
    theme.set('invalid');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
}); 