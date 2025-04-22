import { describe, it, expect, beforeEach, vi } from 'vitest';
import { routes } from './routes.svelte';

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
};

vi.stubGlobal('localStorage', mockLocalStorage);

describe('routes store', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
        // Reset the store
        routes.clear();
    });

    describe('create', () => {
        it('should create a new route', () => {
            const newRoute = routes.create('Test Route', 'Test Description');
            
            expect(newRoute).toBeDefined();
            expect(newRoute.id).toBe('1');
            expect(newRoute.name).toBe('Test Route');
            expect(newRoute.description).toBe('Test Description');
            expect(newRoute.nodes).toHaveLength(0);
            expect(newRoute.progress.completedQuests).toBe(0);
            expect(newRoute.progress.totalQuests).toBe(0);
            expect(newRoute.validationState.isValid).toBe(true);
            
            // Verify the route was added to the store
            const storedRoute = routes.get(newRoute.id);
            expect(storedRoute).toEqual(newRoute);
        });

        it('should persist created routes to localStorage', () => {
            routes.create('Test Route');
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'routes',
                expect.any(String)
            );
        });

        it('should increment IDs correctly', () => {
            const route1 = routes.create('Route 1');
            const route2 = routes.create('Route 2');
            
            expect(route1.id).toBe('1');
            expect(route2.id).toBe('2');
        });
    });

    describe('read', () => {
        it('should get a route by id', () => {
            const newRoute = routes.create('Test Route');
            const retrievedRoute = routes.get(newRoute.id);
            
            expect(retrievedRoute).toEqual(newRoute);
        });

        it('should return undefined for non-existent route', () => {
            const route = routes.get('999');
            expect(route).toBeUndefined();
        });

        it('should get all routes', () => {
            const route1 = routes.create('Route 1');
            const route2 = routes.create('Route 2');
            
            const allRoutes = routes.getAll();
            expect(allRoutes).toHaveLength(2);
            expect(allRoutes).toContainEqual(route1);
            expect(allRoutes).toContainEqual(route2);
        });
    });

    describe('update', () => {
        it('should update an existing route', () => {
            const route = routes.create('Original Name');
            const updatedRoute = routes.update(route.id, {
                name: 'Updated Name',
                description: 'Updated Description'
            });
            
            expect(updatedRoute).toBeDefined();
            if (updatedRoute) {
                expect(updatedRoute.name).toBe('Updated Name');
                expect(updatedRoute.description).toBe('Updated Description');
            }
            
            // Verify the update was persisted
            const storedRoute = routes.get(route.id);
            expect(storedRoute).toEqual(updatedRoute);
        });

        it('should persist updated routes to localStorage', () => {
            const route = routes.create('Test Route');
            routes.update(route.id, { name: 'Updated Name' });
            
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'routes',
                expect.any(String)
            );
        });

        it('should return undefined when updating non-existent route', () => {
            const result = routes.update('999', { name: 'New Name' });
            expect(result).toBeUndefined();
        });
    });

    describe('delete', () => {
        it('should delete a route', () => {
            const route = routes.create('Test Route');
            const success = routes.delete(route.id);
            
            expect(success).toBe(true);
            expect(routes.get(route.id)).toBeUndefined();
        });

        it('should persist deletion to localStorage', () => {
            const route = routes.create('Test Route');
            routes.delete(route.id);
            
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'routes',
                expect.any(String)
            );
        });

        it('should return false when deleting non-existent route', () => {
            const success = routes.delete('999');
            expect(success).toBe(false);
        });
    });
}); 