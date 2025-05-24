import { nanoid } from 'nanoid';
import type { QuestRouteNode } from '$lib/types/quests';

export interface Route {
  id: string;
  name: string;
  nodes: QuestRouteNode[];
  lastModified: Date;
  isTemplate?: boolean;
}

// Initialize routes from localStorage if available
const storedRoutes = typeof localStorage !== 'undefined' 
  ? JSON.parse(localStorage.getItem('quest-routes') || '[]')
  : [];

// Convert stored dates back to Date objects
const initialRoutes = storedRoutes.map((route: Route) => ({
  ...route,
  lastModified: new Date(route.lastModified)
}));

// Create a reactive array of routes
const routes = $state(initialRoutes);

// Helper function to persist routes to localStorage
function persistRoutes() {
  if (typeof localStorage !== 'undefined') {
    // Convert dates to ISO strings before storing
    const routesToStore = routes.map((route: Route) => ({
      ...route,
      lastModified: route.lastModified.toISOString()
    }));
    localStorage.setItem('quest-routes', JSON.stringify(routesToStore));
  }
}

// Export a function to access the routes state
export function getRoutes() {
  return routes;
}

export function createRoute(name: string, nodes: QuestRouteNode[] = [], isTemplate = false): Route {
  const newRoute: Route = {
    id: nanoid(),
    name,
    nodes,
    lastModified: new Date(),
    isTemplate
  };
  
  routes.push(newRoute);
  persistRoutes();
  return newRoute;
}

export function updateRoute(id: string, updates: Partial<Omit<Route, 'id'>>) {
  const index = routes.findIndex((r: Route) => r.id === id);
  if (index === -1) throw new Error(`Route with id ${id} not found`);
  
  routes[index] = {
    ...routes[index],
    ...updates,
    lastModified: new Date()
  };
  
  persistRoutes();
}

export function deleteRoute(id: string) {
  const index = routes.findIndex((r: Route) => r.id === id);
  if (index === -1) throw new Error(`Route with id ${id} not found`);
  
  routes.splice(index, 1);
  persistRoutes();
}

export function getRoute(id: string): Route {
  const route = routes.find((r: Route) => r.id === id);
  if (!route) throw new Error(`Route with id ${id} not found`);
  return route;
}

export function clearRoutes() {
  routes.length = 0;
  persistRoutes();
}

export function addNode(routeId: string, node: QuestRouteNode) {
  const route = getRoute(routeId);
  const index = routes.findIndex((r: Route) => r.id === routeId);
  
  routes[index] = {
    ...route,
    nodes: [...route.nodes, node],
    lastModified: new Date()
  };
  
  persistRoutes();
}

export function removeNode(routeId: string, nodeIndex: number) {
  const route = getRoute(routeId);
  const index = routes.findIndex((r: Route) => r.id === routeId);
  
  routes[index] = {
    ...route,
    nodes: route.nodes.filter((_, i) => i !== nodeIndex),
    lastModified: new Date()
  };
  
  persistRoutes();
}

export function moveNode(routeId: string, fromIndex: number, toIndex: number) {
  const route = getRoute(routeId);
  const index = routes.findIndex((r: Route) => r.id === routeId);
  
  const nodes = [...route.nodes];
  const [node] = nodes.splice(fromIndex, 1);
  nodes.splice(toIndex, 0, node);
  
  routes[index] = {
    ...route,
    nodes,
    lastModified: new Date()
  };
  
  persistRoutes();
}

export function duplicateRoute(id: string, newName?: string): Route {
  const route = getRoute(id);
  return createRoute(
    newName || `${route.name} (Copy)`,
    [...route.nodes],
    route.isTemplate
  );
} 