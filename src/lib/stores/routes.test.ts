import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { SavedRoute, RoutesState } from './routes.svelte';
import { Routes, getRoutes } from './routes.svelte';
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
		expect(routesStore.hasRoutes()).toBe(false);
	});

	it('should load routes from localStorage on initialization', () => {
		const savedRoutes = [mockRoute];
		localStorageMock.getItem.mockReturnValue(JSON.stringify(savedRoutes));
    routesStore = new Routes();
		expect(routesStore.routes).toEqual(savedRoutes);
		expect(routesStore.hasRoutes()).toBe(true);
	});

	it('should add a new route', () => {
    routesStore = new Routes();
		routesStore.addRoute(mockRoute);
		expect(routesStore.routes).toEqual([mockRoute]);
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			'routes',
			JSON.stringify([mockRoute])
		);
		expect(routesStore.hasRoutes()).toBe(true);
	});

	it('should delete a route', () => {
    routesStore = new Routes();
		// First add a route
		routesStore.addRoute(mockRoute);
		// Then delete it
		routesStore.deleteRoute(mockRoute.id);

		expect(routesStore.routes).toEqual([]);
		expect(localStorageMock.setItem).toHaveBeenCalledWith('routes', JSON.stringify([]));
		expect(routesStore.hasRoutes()).toBe(false);
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

	it('should update an existing route', () => {
		routesStore = new Routes();
		routesStore.addRoute(mockRoute);

		const updatedRoute = {
			...mockRoute,
			quests: ['quest-1', 'quest-2', 'quest-3']
		};

		routesStore.updateRoute(updatedRoute);
		expect(routesStore.routes).toEqual([updatedRoute]);
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			'routes',
			JSON.stringify([updatedRoute])
		);
	});

	it('should not update non-existent route', () => {
		routesStore = new Routes();
		const initialRoute = { ...mockRoute };
		routesStore.addRoute(initialRoute);

		const nonExistentRoute = {
			...mockRoute,
			name: 'Non-existent Route'
		};

		routesStore.updateRoute(nonExistentRoute);
		expect(routesStore.routes).toEqual([initialRoute]);
	});

	describe('getRoutes singleton', () => {
		it('should return the same instance on multiple calls', () => {
			const instance1 = getRoutes();
			const instance2 = getRoutes();
			expect(instance1).toBe(instance2);
		});

		it('should maintain state between calls', () => {
			const instance1 = getRoutes();
			instance1.addRoute(mockRoute);

			const instance2 = getRoutes();
			expect(instance2.routes).toEqual([mockRoute]);
		});
	});

	it('should handle invalid JSON in localStorage', () => {
		localStorageMock.getItem.mockReturnValue('invalid-json');
		routesStore = new Routes();
		expect(routesStore.routes).toEqual([]);
		expect(routesStore.hasRoutes()).toBe(false);
	});
}); 