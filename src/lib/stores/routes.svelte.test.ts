import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { 
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  getRoute,
  clearRoutes,
  addNode,
  removeNode,
  moveNode,
  duplicateRoute
} from './routes.svelte';
import type { QuestRouteNode } from '$lib/types/quests';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
vi.stubGlobal('localStorage', localStorageMock);

describe('routes store', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Enable fake timers
    vi.setSystemTime(new Date('2025-05-24T03:38:41.667Z')); // Set a fixed time
    clearRoutes();
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers
  });

  const mockNode: QuestRouteNode = {
    id: 'node1',
    questId: 'quest1',
    type: 'quest',
    name: 'Test Quest',
    number: 1
  };

  // Helper function to normalize dates in route objects for comparison
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeRoute = (route: any) => ({
    ...route,
    lastModified: route.lastModified instanceof Date 
      ? route.lastModified.toISOString()
      : route.lastModified
  });

  describe('createRoute', () => {
    it('creates a new route with default values', () => {
      const route = createRoute('Test Route');
      expect(route.name).toBe('Test Route');
      expect(route.nodes).toEqual([]);
      expect(route.isTemplate).toBe(false);
      expect(route.id).toBeDefined();
      expect(route.lastModified).toBeInstanceOf(Date);
    });

    it('creates a route with provided nodes and template status', () => {
      const route = createRoute('Test Route', [mockNode], true);
      expect(route.nodes).toEqual([mockNode]);
      expect(route.isTemplate).toBe(true);
    });

    it('adds the route to the routes store', () => {
      const route = createRoute('Test Route');
      const storedRoutes = getRoutes();
      expect(storedRoutes.map(normalizeRoute)).toContainEqual(normalizeRoute(route));
    });

    it('persists the route to localStorage', () => {
      const route = createRoute('Test Route');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'quest-routes',
        expect.any(String)
      );
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData.map(normalizeRoute)).toContainEqual(normalizeRoute(route));
    });
  });

  describe('updateRoute', () => {
    it('updates an existing route', () => {
      const route = createRoute('Test Route');
      updateRoute(route.id, { name: 'Updated Route' });
      expect(getRoute(route.id).name).toBe('Updated Route');
    });

    it('throws error for non-existent route', () => {
      expect(() => updateRoute('non-existent', { name: 'Test' }))
        .toThrow('Route with id non-existent not found');
    });

    it('updates lastModified timestamp', () => {
      const route = createRoute('Test Route');
      const oldDate = route.lastModified;
      vi.advanceTimersByTime(1000);
      updateRoute(route.id, { name: 'Updated Route' });
      expect(getRoute(route.id).lastModified.getTime())
        .toBeGreaterThan(oldDate.getTime());
    });

    it('persists the update to localStorage', () => {
      const route = createRoute('Test Route');
      updateRoute(route.id, { name: 'Updated Route' });
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[1][1]);
      const updatedRoute = getRoute(route.id);
      expect(savedData.map(normalizeRoute)).toContainEqual(normalizeRoute(updatedRoute));
    });
  });

  describe('deleteRoute', () => {
    it('removes a route from the store', () => {
      const route = createRoute('Test Route');
      deleteRoute(route.id);
      expect(getRoutes()).not.toContain(route);
    });

    it('throws error for non-existent route', () => {
      expect(() => deleteRoute('non-existent'))
        .toThrow('Route with id non-existent not found');
    });

    it('persists the deletion to localStorage', () => {
      const route = createRoute('Test Route');
      deleteRoute(route.id);
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[1][1]);
      expect(savedData.map(normalizeRoute)).not.toContainEqual(normalizeRoute(route));
    });
  });

  describe('node operations', () => {
    it('adds a node to a route', () => {
      const route = createRoute('Test Route');
      addNode(route.id, mockNode);
      expect(getRoute(route.id).nodes).toContainEqual(mockNode);
    });

    it('removes a node from a route', () => {
      const route = createRoute('Test Route', [mockNode]);
      removeNode(route.id, 0);
      expect(getRoute(route.id).nodes).not.toContainEqual(mockNode);
    });

    it('moves a node within a route', () => {
      const node2: QuestRouteNode = { ...mockNode, id: 'node2', questId: 'quest2' };
      const route = createRoute('Test Route', [mockNode, node2]);
      moveNode(route.id, 0, 1);
      expect(getRoute(route.id).nodes[1]).toEqual(mockNode);
      expect(getRoute(route.id).nodes[0]).toEqual(node2);
    });

    it('persists node operations to localStorage', () => {
      const route = createRoute('Test Route');
      addNode(route.id, mockNode);
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[1][1]);
      const updatedRoute = getRoute(route.id);
      expect(savedData.map(normalizeRoute)).toContainEqual(normalizeRoute(updatedRoute));
    });
  });

  describe('duplicateRoute', () => {
    it('creates a copy of an existing route', () => {
      const original = createRoute('Original Route', [mockNode], true);
      const copy = duplicateRoute(original.id);
      expect(copy.nodes).toEqual(original.nodes);
      expect(copy.isTemplate).toBe(original.isTemplate);
      expect(copy.name).toBe('Original Route (Copy)');
      expect(copy.id).not.toBe(original.id);
    });

    it('creates a copy with custom name', () => {
      const original = createRoute('Original Route');
      const copy = duplicateRoute(original.id, 'Custom Copy Name');
      expect(copy.name).toBe('Custom Copy Name');
    });

    it('persists the duplicated route to localStorage', () => {
      const original = createRoute('Original Route');
      const copy = duplicateRoute(original.id);
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[1][1]);
      expect(savedData.map(normalizeRoute)).toContainEqual(normalizeRoute(copy));
    });
  });
});