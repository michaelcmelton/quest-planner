import { describe, it, expect, beforeEach, vi } from 'vitest';
import { routes } from './routes.svelte';
import type { Quest } from '../types/quest';

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

    describe('node management', () => {
        let route: ReturnType<typeof routes.create>;

        beforeEach(() => {
            route = routes.create('Test Route');
        });

        describe('adding nodes', () => {
            it('should add a quest node', () => {
                const questNode = routes.addQuestNode(route.id, 'cooks-assistant', 'Cook\'s Assistant');
                
                expect(questNode).toBeDefined();
                if (questNode) {
                    expect(questNode.type).toBe('quest');
                    expect(questNode.questId).toBe('cooks-assistant');
                    expect(questNode.content).toBe('Cook\'s Assistant');
                    expect(questNode.completed).toBe(false);
                }
                
                const updatedRoute = routes.get(route.id);
                expect(updatedRoute?.nodes).toHaveLength(1);
                expect(updatedRoute?.nodes[0]).toEqual(questNode);
            });

            it('should add a custom node', () => {
                const customNode = routes.addCustomNode(route.id, 'Train Attack to 20');
                
                expect(customNode).toBeDefined();
                if (customNode) {
                    expect(customNode.type).toBe('custom');
                    expect(customNode.content).toBe('Train Attack to 20');
                }
                
                const updatedRoute = routes.get(route.id);
                expect(updatedRoute?.nodes).toHaveLength(1);
                expect(updatedRoute?.nodes[0]).toEqual(customNode);
            });

            it('should add nodes in sequence', () => {
                const questNode = routes.addQuestNode(route.id, 'cooks-assistant', 'Cook\'s Assistant');
                const customNode = routes.addCustomNode(route.id, 'Train Attack to 20');
                
                const updatedRoute = routes.get(route.id);
                expect(updatedRoute?.nodes).toHaveLength(2);
                expect(updatedRoute?.nodes[0]).toEqual(questNode);
                expect(updatedRoute?.nodes[1]).toEqual(customNode);
            });
        });

        describe('removing nodes', () => {
            it('should remove a node by id', () => {
                const node = routes.addQuestNode(route.id, 'cooks-assistant', 'Cook\'s Assistant');
                if (node) {
                    const success = routes.removeNode(route.id, node.id);
                    
                    expect(success).toBe(true);
                    const updatedRoute = routes.get(route.id);
                    expect(updatedRoute?.nodes).toHaveLength(0);
                }
            });

            it('should return false when removing non-existent node', () => {
                const success = routes.removeNode(route.id, 'non-existent-id');
                expect(success).toBe(false);
            });
        });

        describe('reordering nodes', () => {
            it('should move a node to a new position', () => {
                const node1 = routes.addQuestNode(route.id, 'cooks-assistant', 'Cook\'s Assistant');
                const node2 = routes.addCustomNode(route.id, 'Train Attack to 20');
                const node3 = routes.addQuestNode(route.id, 'dragon-slayer', 'Dragon Slayer');
                
                if (node2) {
                    const success = routes.moveNode(route.id, node2.id, 0);
                    expect(success).toBe(true);
                    
                    const updatedRoute = routes.get(route.id);
                    expect(updatedRoute?.nodes).toHaveLength(3);
                    expect(updatedRoute?.nodes[0]).toEqual(node2);
                    expect(updatedRoute?.nodes[1]).toEqual(node1);
                    expect(updatedRoute?.nodes[2]).toEqual(node3);
                }
            });

            it('should return false when moving non-existent node', () => {
                const success = routes.moveNode(route.id, 'non-existent-id', 0);
                expect(success).toBe(false);
            });

            it('should handle moving to invalid positions', () => {
                const node = routes.addQuestNode(route.id, 'cooks-assistant', 'Cook\'s Assistant');
                
                // Moving beyond array bounds should clamp to valid positions
                if (node) {
                    const success = routes.moveNode(route.id, node.id, 999);
                    expect(success).toBe(true);
                    
                    const updatedRoute = routes.get(route.id);
                    expect(updatedRoute?.nodes).toHaveLength(1);
                    expect(updatedRoute?.nodes[0]).toEqual(node);
                }
            });
        });

        describe('getting nodes', () => {
            it('should get a node by id', () => {
                const node = routes.addQuestNode(route.id, 'cooks-assistant', 'Cook\'s Assistant');
                if (node) {
                    const foundNode = routes.getNode(route.id, node.id);
                    
                    expect(foundNode).toEqual(node);
                }
            });

            it('should return undefined for non-existent node', () => {
                const node = routes.getNode(route.id, 'non-existent-id');
                expect(node).toBeUndefined();
            });
        });
    });

    describe('validation', () => {
        const createTestQuest = (id: string, prerequisites: string[] = []): Quest => ({
            id,
            name: `Quest ${id}`,
            number: parseInt(id),
            image: '',
            release: '',
            update: '',
            members: true,
            series: 'Test Series',
            developer: 'Test Developer',
            rewards: {
                questPoints: 1,
                experienceRewards: [],
                otherRewards: []
            },
            start: '',
            startmap: '',
            difficulty: 'Novice',
            description: `Description for Quest ${id}`,
            length: 'Short',
            requirements: {
                skills: [],
                quests: prerequisites,
                other: []
            },
            items: [],
            recommended: [],
            kills: [],
            ironman: [],
            leagueRegion: ''
        });

        it('should validate routes when validator is initialized', () => {
            const quests = [
                createTestQuest('1'),
                createTestQuest('2', ['1'])
            ];

            routes.initializeValidator(quests);
            const route = routes.create('Test Route');
            
            // Add quests in valid order
            routes.addQuestNode(route.id, '1', 'Quest 1');
            routes.addQuestNode(route.id, '2', 'Quest 2');

            const updatedRoute = routes.get(route.id);
            expect(updatedRoute?.validationState.isValid).toBe(true);
        });

        it('should detect invalid quest sequences', () => {
            const quests = [
                createTestQuest('1'),
                createTestQuest('2', ['1'])
            ];

            routes.initializeValidator(quests);
            const route = routes.create('Test Route');
            
            // Add quests in invalid order
            routes.addQuestNode(route.id, '2', 'Quest 2');
            routes.addQuestNode(route.id, '1', 'Quest 1');

            const updatedRoute = routes.get(route.id);
            expect(updatedRoute?.validationState.isValid).toBe(false);
            expect(updatedRoute?.validationState.errors).toBeDefined();
            expect(updatedRoute?.validationState.errors?.[0]).toContain('Missing prerequisites');
        });

        it('should validate routes when nodes are reordered', () => {
            const quests = [
                createTestQuest('1'),
                createTestQuest('2', ['1'])
            ];

            routes.initializeValidator(quests);
            const route = routes.create('Test Route');
            
            // Add quests in valid order
            const node1 = routes.addQuestNode(route.id, '1', 'Quest 1');
            const node2 = routes.addQuestNode(route.id, '2', 'Quest 2');

            if (node1 && node2) {
                // Reorder to make invalid
                routes.moveNode(route.id, node2.id, 0);

                const updatedRoute = routes.get(route.id);
                expect(updatedRoute?.validationState.isValid).toBe(false);
            }
        });

        it('should validate routes when nodes are removed', () => {
            const quests = [
                createTestQuest('1'),
                createTestQuest('2', ['1'])
            ];

            routes.initializeValidator(quests);
            const route = routes.create('Test Route');
            
            // Add quests in valid order
            const node1 = routes.addQuestNode(route.id, '1', 'Quest 1');
            routes.addQuestNode(route.id, '2', 'Quest 2');

            if (node1) {
                // Remove prerequisite
                routes.removeNode(route.id, node1.id);

                const updatedRoute = routes.get(route.id);
                expect(updatedRoute?.validationState.isValid).toBe(false);
            }
        });
    });
}); 