import { browser } from '$app/environment';

export type SavedRoute = {
  id: string;
  name: string;
  quests: string[];
  createdAt: string;
};

export interface RoutesState {
  addRoute: (route: SavedRoute) => void;
  deleteRoute: (routeName: string) => void;
  updateRoute: (route: SavedRoute) => void;
  routes: SavedRoute[];
  hasRoutes: () => boolean;
}

export class Routes {
  private _routes: SavedRoute[] = $state([]);

  constructor() {
    if (browser) {
      this._routes = JSON.parse(localStorage.getItem('routes') || '[]');
    }
  }

  hasRoutes() {
    return this._routes.length > 0;
  }

  addRoute(route: SavedRoute) {
    this._routes.push(route);
    localStorage.setItem('routes', JSON.stringify(this._routes));
  }

  deleteRoute(routeId: string) {
    this._routes = this._routes.filter((route) => route.id !== routeId);
    localStorage.setItem('routes', JSON.stringify(this._routes));
  }

  updateRoute(route: SavedRoute) {
    this._routes = this._routes.map((r) => (r.name === route.name ? route : r));
    localStorage.setItem('routes', JSON.stringify(this._routes));
  }

  get routes() {
    return this._routes;
  }
}

let routes: Routes | null = null;

export const getRoutes = () => {
  if (!routes) {
    routes = new Routes();
  }

  return routes;
}