# Architecture Guidelines

## Project Structure
- Follow SvelteKit's file-based routing
- Use the `src/lib` directory for shared components and utilities
- Keep page components in `src/routes`
- Use `src/routes/+layout.svelte` for shared layouts
- Organize API routes in `src/routes/api`
- Use TypeScript for type safety

## Component Design
- Design components to be reusable and composable
- Follow the single responsibility principle
- Keep components small and focused
- Use props for configuration
- Implement proper state management with Svelte stores
- Use slots for component composition

## State Management
- Use Svelte stores for shared state
- Keep stores in `src/lib/stores` directory
- Keep types in `src/lib/types` directory
- Use writable stores for mutable state
- Use derived stores for computed values
- Use custom stores for complex state logic
- Implement proper state persistence when needed
- Export stores through `index.ts` files for cleaner imports

## Data Flow
- Use SvelteKit's load functions for data fetching
- Implement proper data validation
- Handle loading and error states
- Cache data appropriately
- Use SvelteKit's form actions for form handling
- Implement proper data synchronization

## API Design
- Use SvelteKit's API routes
- Follow RESTful principles
- Use consistent naming conventions
- Version APIs appropriately
- Document API endpoints
- Handle errors consistently

## Performance
- Use SvelteKit's built-in optimizations
- Implement proper code splitting
- Use lazy loading where appropriate
- Optimize assets and resources
- Monitor and measure performance
- Use SvelteKit's server-side rendering capabilities

## Testing
- Write unit tests with Vitest
- Write component tests with @testing-library/svelte
- Write end-to-end tests with Playwright
- Test both client and server-side code
- Maintain high test coverage
- Test error cases and edge conditions 