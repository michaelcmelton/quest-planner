// src/lib/stores/theme.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTheme, ThemeStore, type Theme } from './theme.svelte';

describe('theme store', () => {
  let matchMediaMock: (query: string) => MediaQueryList;
  let themeStore: ThemeStore | null;
  let mockStorage: { [key: string]: string };

  // Create a mock localStorage
  const localStorageMock = {
    getItem: vi.fn((key: string) => mockStorage[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
    }),
    clear: vi.fn(() => {
      mockStorage = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete mockStorage[key];
    }),
    length: 0,
    key: vi.fn(),
  };

  beforeEach(() => {
    // Reset storage mock
    mockStorage = {};
    vi.clearAllMocks();
    
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });

    // Reset document class
    document.documentElement.classList.remove('dark');
    
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
    themeStore = getTheme();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockStorage = {};
  });

  it('should initialize with light theme when no preference is stored', () => {
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeStore?.theme).toBe('light');
  });

  it('should initialize with dark theme when stored preference is dark', () => {
    localStorageMock.setItem('theme', 'dark');
    themeStore = new ThemeStore();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(themeStore.theme).toBe('dark');
  });

  it('should respect system preference when no stored preference exists', () => {
    // Reset store and localStorage
    localStorageMock.clear();
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
    themeStore = new ThemeStore();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(themeStore.theme).toBe('dark');
  });

  it('should update localStorage when theme changes', () => {
    themeStore!.theme = 'dark';
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(themeStore!.theme).toBe('dark');

    themeStore!.theme = 'light';
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeStore!.theme).toBe('light');
  });

  it('should handle invalid theme values gracefully', () => {
    themeStore!.theme = 'invalid' as Theme;
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeStore!.theme).toBe('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should handle localStorage errors gracefully', () => {
    const errorMock = vi.fn().mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });
    
    localStorageMock.setItem.mockImplementationOnce(errorMock);

    // Should not throw when setting theme
    expect(() => {
      themeStore!.theme = 'dark';
    }).not.toThrow();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(themeStore!.theme).toBe('dark');
  });
}); 