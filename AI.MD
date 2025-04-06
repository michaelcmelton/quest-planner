# Quest Planner - AI Assistant Guidelines

This document provides guidelines for AI assistants working on the Quest Planner project. It outlines the project's current state, development practices, and specific requirements for AI assistance.

## Project Context

Quest Planner is a web application for planning and optimizing quest routes in Old School RuneScape. The project originated from a need to optimize quest routes for specialized accounts, particularly Slayer-locked accounts with combat level experience limits.

## Current State

### Core Features Implemented
- Quest graph system for dependency validation
- Real-time route validation
- Quest data integration

### In Development
- Mobile-friendly navigation
- Dark mode Support
- Quest Summary component
- Route management system
- Enhanced validation rules
- Specialized account support

## AI Assistant Guidelines

### File Management
- Always provide full file paths in the format: `src/path/to/file.ts`
- Update project structure documentation when adding new files
- Maintain consistent file naming conventions
- Keep related files together in appropriate directories

### Code Quality
- Follow SOLID principles
- Maintain 80%+ test coverage
- Use TypeScript for type safety
- Implement comprehensive error handling
- Keep code DRY and maintainable

### Testing Requirements
- Write tests before implementing features (TDD)
- Use Vitest and @testing-library/svelte
- Test files should be co-located with their components
- Include tests for edge cases and error conditions

### Documentation Standards
- Use JSDoc for TypeScript files
- Keep README.md and AI.MD updated
- Document complex algorithms
- Maintain clear commit messages

### Development Workflow
1. Review requirements
2. Write failing tests
3. Implement minimum code to pass tests
4. Refactor while maintaining tests
5. Update documentation

## Tech Stack Details

### Frontend
- SvelteKit for routing and SSR
- Tailwind CSS for styling
- TypeScript for type safety
- Vitest for testing

### Data Management
- Quest graph system for validation
- Svelte stores for state management
- JSON data from OSRS Wiki

## File Structure Guidelines

```
src/
├── lib/
│   ├── graph/           # Quest graph implementation
│   │   ├── graph.ts     # Core graph logic
│   │   └── graph.test.ts # Graph tests
│   ├── types/           # TypeScript interfaces
│   │   └── quest.ts     # Quest data types
│   └── stores/          # Svelte stores
├── routes/              # SvelteKit routes
└── components/          # UI components
```

## Best Practices

### Code Organization
- Keep components small and focused
- Use proper TypeScript types
- Implement proper error handling
- Follow SvelteKit conventions

### Performance
- Optimize bundle size
- Implement proper code splitting
- Use efficient data structures
- Minimize re-renders

### Security
- Validate all user input
- Sanitize data before rendering
- Follow security best practices
- Keep dependencies updated

## AI Assistant Responsibilities

1. **Code Generation**
   - Follow established patterns
   - Include proper error handling
   - Add necessary tests
   - Update documentation

2. **Code Review**
   - Check for adherence to standards
   - Verify test coverage
   - Ensure proper error handling
   - Validate performance considerations

3. **Documentation**
   - Keep documentation up-to-date
   - Add JSDoc comments
   - Update README.md
   - Maintain AI.MD

4. **Testing**
   - Ensure test coverage
   - Add tests for edge cases
   - Verify error handling
   - Check performance

## Current Focus Areas

1. Quest graph system
2. Route validation
3. UI components
4. Testing coverage
5. Documentation

## Notes for AI Assistants

- Always provide full file paths
- Follow the established patterns
- Maintain test coverage
- Update documentation
- Consider performance implications
- Validate security considerations 