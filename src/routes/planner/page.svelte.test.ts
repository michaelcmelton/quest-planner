import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import * as routesStore from '$lib/stores/routes.svelte';

// Mock the routes store
vi.mock('$lib/stores/routes.svelte', () => ({
  getRoutes: vi.fn(),
  createRoute: vi.fn(),
  deleteRoute: vi.fn(),
  duplicateRoute: vi.fn()
}));

describe('Planner Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset routes to empty array by default
    vi.mocked(routesStore.getRoutes).mockReturnValue([]);
  });

  it('displays empty state when no routes exist', () => {
    render(Page);
    expect(screen.getByText('No routes created yet. Create your first route to get started!')).toBeInTheDocument();
  });

  it('shows create route form when create button is clicked', async () => {
    render(Page);
    await fireEvent.click(screen.getByText('Create New Route'));
    expect(screen.getByPlaceholderText('Enter route name')).toBeInTheDocument();
  });

  it('creates a new route when form is submitted', async () => {
    render(Page);
    await fireEvent.click(screen.getByText('Create New Route'));
    
    const input = screen.getByPlaceholderText('Enter route name');
    await fireEvent.input(input, { target: { value: 'Test Route' } });
    await fireEvent.click(screen.getByText('Create'));

    expect(routesStore.createRoute).toHaveBeenCalledWith('Test Route');
  });

  it('displays existing routes', () => {
    const mockRoutes = [
      {
        id: '1',
        name: 'Test Route 1',
        nodes: [],
        lastModified: new Date('2025-01-01'),
        isTemplate: false
      },
      {
        id: '2',
        name: 'Test Route 2',
        nodes: [{ id: 'node1', type: 'quest', questId: 'quest1', name: 'Quest 1', number: 1 }],
        lastModified: new Date('2025-01-02'),
        isTemplate: false
      }
    ];

    vi.mocked(routesStore.getRoutes).mockReturnValue(mockRoutes);
    render(Page);

    expect(screen.getByText('Test Route 1')).toBeInTheDocument();
    expect(screen.getByText('Test Route 2')).toBeInTheDocument();
    expect(screen.getByText('1 node')).toBeInTheDocument();
  });

  it('deletes a route when delete button is clicked and confirmed', async () => {
    const mockRoutes = [{
      id: '1',
      name: 'Test Route',
      nodes: [],
      lastModified: new Date('2025-01-01'),
      isTemplate: false
    }];

    vi.mocked(routesStore.getRoutes).mockReturnValue(mockRoutes);
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(Page);
    await fireEvent.click(screen.getByText('Delete'));

    expect(routesStore.deleteRoute).toHaveBeenCalledWith('1');
  });

  it('duplicates a route when duplicate button is clicked', async () => {
    const mockRoutes = [{
      id: '1',
      name: 'Test Route',
      nodes: [],
      lastModified: new Date('2025-01-01'),
      isTemplate: false
    }];

    vi.mocked(routesStore.getRoutes).mockReturnValue(mockRoutes);

    render(Page);
    await fireEvent.click(screen.getByText('Duplicate'));

    expect(routesStore.duplicateRoute).toHaveBeenCalledWith('1');
  });
}); 