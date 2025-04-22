import type { Route, QuestNode, CustomNode } from '../types/routes';

// Initialize store from localStorage if available
const loadFromStorage = (): Map<string, Route> => {
    try {
        const stored = localStorage.getItem('routes');
        if (stored) {
            const parsed = JSON.parse(stored);
            const routes = new Map<string, Route>();
            Object.entries(parsed).forEach(([id, route]) => {
                routes.set(id, route as Route);
            });
            return routes;
        }
    } catch (error) {
        console.error('Failed to load routes from localStorage:', error);
    }
    return new Map<string, Route>();
};

// Save to localStorage
const saveToStorage = (routes: Map<string, Route>) => {
    try {
        const serialized = Object.fromEntries(routes);
        localStorage.setItem('routes', JSON.stringify(serialized));
    } catch (error) {
        console.error('Failed to save routes to localStorage:', error);
    }
};

// Generate a new ID based on the highest existing ID
const generateNewId = (routes: Map<string, Route>): string => {
    const ids = Array.from(routes.keys()).map(id => parseInt(id));
    const maxId = Math.max(0, ...ids);
    return (maxId + 1).toString();
};

// Generate a new node ID
const generateNodeId = (): string => {
    return Math.random().toString(36).substring(2, 9);
};

// Create the store with runes
const routesMap = $state(loadFromStorage());

// Derived state for all routes
const allRoutes = $derived(Array.from(routesMap.values()));

export const routes = {
    get routes() {
        return routesMap;
    },

    get all() {
        return allRoutes;
    },

    create(name: string, description?: string): Route {
        const newRoute: Route = {
            id: generateNewId(routesMap),
            name,
            description,
            createdAt: new Date(),
            updatedAt: new Date(),
            nodes: [],
            progress: {
                completedQuests: 0,
                totalQuests: 0
            },
            validationState: {
                isValid: true
            }
        };

        routesMap.set(newRoute.id, newRoute);
        saveToStorage(routesMap);
        return newRoute;
    },

    get(id: string): Route | undefined {
        return routesMap.get(id);
    },

    getAll(): Route[] {
        return allRoutes;
    },

    update(id: string, updates: Partial<Route>): Route | undefined {
        const route = routesMap.get(id);
        if (!route) return undefined;

        const updatedRoute = {
            ...route,
            ...updates,
            updatedAt: new Date()
        };

        routesMap.set(id, updatedRoute);
        saveToStorage(routesMap);
        return updatedRoute;
    },

    delete(id: string): boolean {
        const success = routesMap.delete(id);
        if (success) {
            saveToStorage(routesMap);
        }
        return success;
    },

    clear(): void {
        routesMap.clear();
        saveToStorage(routesMap);
    },

    // Node management
    addQuestNode(routeId: string, questId: string, content: string): QuestNode | undefined {
        const route = routesMap.get(routeId);
        if (!route) return undefined;

        const newNode: QuestNode = {
            id: generateNodeId(),
            type: 'quest',
            questId,
            content,
            completed: false
        };

        const updatedRoute = {
            ...route,
            nodes: [...route.nodes, newNode],
            updatedAt: new Date()
        };

        routesMap.set(routeId, updatedRoute);
        saveToStorage(routesMap);
        return newNode;
    },

    addCustomNode(routeId: string, content: string): CustomNode | undefined {
        const route = routesMap.get(routeId);
        if (!route) return undefined;

        const newNode: CustomNode = {
            id: generateNodeId(),
            type: 'custom',
            content
        };

        const updatedRoute = {
            ...route,
            nodes: [...route.nodes, newNode],
            updatedAt: new Date()
        };

        routesMap.set(routeId, updatedRoute);
        saveToStorage(routesMap);
        return newNode;
    },

    removeNode(routeId: string, nodeId: string): boolean {
        const route = routesMap.get(routeId);
        if (!route) return false;

        const nodeIndex = route.nodes.findIndex(node => node.id === nodeId);
        if (nodeIndex === -1) return false;

        const updatedRoute = {
            ...route,
            nodes: route.nodes.filter(node => node.id !== nodeId),
            updatedAt: new Date()
        };

        routesMap.set(routeId, updatedRoute);
        saveToStorage(routesMap);
        return true;
    },

    moveNode(routeId: string, nodeId: string, newPosition: number): boolean {
        const route = routesMap.get(routeId);
        if (!route) return false;

        const nodeIndex = route.nodes.findIndex(node => node.id === nodeId);
        if (nodeIndex === -1) return false;

        // Clamp position to valid range
        newPosition = Math.max(0, Math.min(newPosition, route.nodes.length - 1));

        const nodes = [...route.nodes];
        const [node] = nodes.splice(nodeIndex, 1);
        nodes.splice(newPosition, 0, node);

        const updatedRoute = {
            ...route,
            nodes,
            updatedAt: new Date()
        };

        routesMap.set(routeId, updatedRoute);
        saveToStorage(routesMap);
        return true;
    },

    getNode(routeId: string, nodeId: string): QuestNode | CustomNode | undefined {
        const route = routesMap.get(routeId);
        if (!route) return undefined;
        return route.nodes.find(node => node.id === nodeId);
    }
}; 