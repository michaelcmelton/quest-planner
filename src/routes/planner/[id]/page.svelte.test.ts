import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import * as routesStore from '$lib/stores/routes.svelte';
import type { Route } from '$lib/stores/routes.svelte';

interface PageData {
  params: {
    id: string;
  };
}

// Mock SvelteKit's page store
vi.mock('$app/stores', () => ({
  page: {
    subscribe: (fn: (value: PageData) => void) => {
      fn({ params: { id: 'test-id' } });
      return () => {};
    }
  }
}));

// Mock the routes store
vi.mock('$lib/stores/routes.svelte', () => ({
  getRoute: vi.fn(),
  updateRoute: vi.fn()
}));

describe('Route Editor Page', () => {
  const mockRoute: Route = {
    id: 'test-id',
    name: 'Test Route',
    nodes: [],
    lastModified: new Date(),
    isTemplate: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(routesStore.getRoute).mockReturnValue(mockRoute);
  });

  it('displays route not found message when route does not exist', () => {
    vi.mocked(routesStore.getRoute).mockImplementation(() => {
      throw new Error('Route not found');
    });
    render(Page);
    expect(screen.getByText('Route Not Found')).toBeInTheDocument();
  });

  it('displays route name and edit button', () => {
    render(Page);
    expect(screen.getByText('Test Route')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows edit form when edit button is clicked', async () => {
    render(Page);
    await fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByPlaceholderText('Route name')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('updates route name when edit form is submitted', async () => {
    render(Page);
    await fireEvent.click(screen.getByText('Edit'));
    
    const input = screen.getByPlaceholderText('Route name');
    await fireEvent.input(input, { target: { value: 'Updated Route' } });
    await fireEvent.click(screen.getByText('Save'));

    expect(routesStore.updateRoute).toHaveBeenCalledWith('test-id', {
      name: 'Updated Route'
    });
  });

  it('cancels edit when cancel button is clicked', async () => {
    render(Page);
    await fireEvent.click(screen.getByText('Edit'));
    
    const input = screen.getByPlaceholderText('Route name');
    await fireEvent.input(input, { target: { value: 'Updated Route' } });
    await fireEvent.click(screen.getByText('Cancel'));

    expect(routesStore.updateRoute).not.toHaveBeenCalled();
    expect(screen.getByText('Test Route')).toBeInTheDocument();
  });

  it('shows empty state message when route has no nodes', () => {
    render(Page);
    expect(screen.getByText(/Your route is empty/)).toBeInTheDocument();
  });

  it('displays nodes when route has nodes', () => {
    const routeWithNodes: Route = {
      ...mockRoute,
      nodes: [
        { id: 'node1', type: 'quest', questId: 'quest1', name: 'Quest 1', number: 1 }
      ]
    };
    vi.mocked(routesStore.getRoute).mockReturnValue(routeWithNodes);
    
    render(Page);
    expect(screen.getByText('Quest 1')).toBeInTheDocument();
  });
}); 