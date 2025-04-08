import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { SavedRoute, RoutesState } from './routes.svelte';
import { Routes } from './routes.svelte';
// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

describe('routesStore', () => {
	const mockRoute: SavedRoute = {
		id: 'test-route',
		name: 'Test Route',
		quests: ['quest-1', 'quest-2'],
		createdAt: new Date().toISOString()
	};

  let routesStore: RoutesState;

	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks();
	});

  afterEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
  });

	it('should initialize with empty routes when localStorage is empty', () => {
		localStorageMock.getItem.mockReturnValue(null);
    routesStore = new Routes();
		expect(routesStore.routes).toEqual([]);
	});

	it('should load routes from localStorage on initialization', () => {
		const savedRoutes = [mockRoute];
		localStorageMock.getItem.mockReturnValue(JSON.stringify(savedRoutes));
    routesStore = new Routes();
		expect(routesStore.routes).toEqual(savedRoutes);
	});

	it('should add a new route', () => {
    routesStore = new Routes();
		routesStore.addRoute(mockRoute);
		expect(routesStore.routes).toEqual([mockRoute]);
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			'routes',
			JSON.stringify([mockRoute])
		);
	});

	it('should delete a route', () => {
    routesStore = new Routes();
		// First add a route
		routesStore.addRoute(mockRoute);
		// Then delete it
		routesStore.deleteRoute(mockRoute.id);

		expect(routesStore.routes).toEqual([]);
		expect(localStorageMock.setItem).toHaveBeenCalledWith('routes', JSON.stringify([]));
  });

	it('should handle multiple routes', () => {
    routesStore = new Routes();
		const secondRoute: SavedRoute = {
			id: 'test-route-2',
			name: 'Test Route 2',
			quests: ['quest-3', 'quest-4'],
			createdAt: new Date().toISOString()
		};

		// Add two routes
		routesStore.addRoute(mockRoute);
		routesStore.addRoute(secondRoute);

		expect(routesStore.routes).toEqual([mockRoute, secondRoute]);
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			'routes',
			JSON.stringify([mockRoute, secondRoute])
		);
	});
}); 