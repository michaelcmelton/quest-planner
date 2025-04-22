# AI Development Guidelines for Quest Planner

## Project Overview
Quest Planner is a SvelteKit-based web application for OSRS quest route planning. The application uses quest data from the OSRS Wiki to help players plan efficient quest completion paths.

## Tech Stack
- Frontend & Backend: SvelteKit 2.x
- Styling: SCSS Modules
- Testing: Vitest + Testing Library
- Type Safety: TypeScript
- Code Quality: ESLint, Prettier

## Project Structure
```
src/
├── lib/           # Shared libraries and utilities
│   ├── styles/    # Global styles and SCSS modules
│   ├── types/     # TypeScript type definitions
│   ├── stores/    # Svelte stores
│   ├── utils/     # Utility functions
│   └── data/      # Data management
├── routes/        # SvelteKit routes and pages
└── app.html       # App template
```

## Development Guidelines

### 1. Code Organization
- Keep components close to where they're used
- Place shared components in `lib/components`
- Maintain clear separation of concerns
- Use TypeScript for type safety

### 2. Testing Requirements
- Write tests before implementing features (TDD)
- Maintain high test coverage (target: 80%+)
- Test files should be next to the components they test
- Use `@testing-library/svelte` for component testing

### 3. Styling Conventions
- Use SCSS modules for component-specific styles
- Follow BEM naming convention
- Maintain dark mode compatibility
- Ensure responsive design
- Use CSS variables for theming

### 4. State Management
- Use Svelte stores for global state
- Keep state close to where it's used
- Implement proper state persistence
- Handle loading and error states

### 5. Performance Guidelines
- Optimize bundle size
- Implement proper code splitting
- Use lazy loading where appropriate
- Monitor and optimize render performance

### 6. Accessibility Requirements
- Follow WCAG 2.1 guidelines
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Support screen readers
- Maintain proper contrast ratios

### 7. Data Management
- Quest data is sourced from OSRS Wiki
- Implement proper data validation
- Handle loading and error states
- Cache data appropriately
- Keep data structures immutable

### 8. Error Handling
- Implement proper error boundaries
- Log errors appropriately
- Show user-friendly error messages
- Handle edge cases gracefully

### 9. Documentation
- Document complex logic
- Use JSDoc for function documentation
- Keep README.md updated
- Document API endpoints and data structures

### 10. Git Workflow
- Use meaningful commit messages
- Follow conventional commits
- Create feature branches
- Review code before merging

## File Naming Conventions
- Components: PascalCase (e.g., `QuestCard.svelte`)
- Tests: `ComponentName.test.ts`
- Utilities: camelCase
- Types: PascalCase with `.d.ts` extension
- Styles: `ComponentName.module.scss`

## Best Practices
1. Follow SOLID principles
2. Keep components small and focused
3. Use TypeScript effectively
4. Write clear, self-documenting code
5. Optimize for maintainability
6. Consider mobile-first design
7. Implement proper error handling
8. Follow security best practices

## Development Workflow
1. Write failing tests
2. Implement minimum code to pass tests
3. Refactor while maintaining test coverage
4. Review and optimize
5. Document changes
6. Update relevant documentation

## Security Guidelines
1. Validate all inputs
2. Sanitize data output
3. Implement proper CORS policies
4. Follow security best practices
5. Keep dependencies updated

## Performance Considerations
1. Optimize bundle size
2. Implement code splitting
3. Use lazy loading
4. Optimize images and assets
5. Monitor performance metrics

## Deployment
1. Build for production
2. Run all tests
3. Check bundle size
4. Verify accessibility
5. Test in multiple browsers
6. Monitor performance
7. Deploy to static hosting

Remember to update this document as the project evolves and new patterns or requirements emerge. 