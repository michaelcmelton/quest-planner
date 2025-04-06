// src/lib/stores/theme.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { theme } from './theme';

describe('theme store', () => {
  beforeEach(() => {
    // Reset localStorage and document class
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('initializes with light theme when no preference is stored', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('initializes with dark theme when stored preference is dark', () => {
    localStorage.setItem('theme', 'dark');
    theme.subscribe(() => {}); // Initialize the store
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('updates localStorage when theme changes', () => {
    theme.set('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles between light and dark themes', () => {
    theme.set('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    theme.set('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
}); 