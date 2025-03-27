# Quest Planner - Project Documentation

## Project Overview
Quest Planner is a web application that helps users plan their quest routes in Old School RuneScape (OSRS). The application will use pre-processed data from the OSRS WikiMedia API and present it in an interactive, user-friendly interface. The project follows modern web development practices and emphasizes maintainability, performance, and user experience.

## Current State
- Basic routing system implemented
- Test infrastructure set up with Vitest and @testing-library/svelte
- Core layout and navigation in place
- Development environment configured with TypeScript and Tailwind CSS
- Dark mode support implemented
- Responsive design implemented

## Planned Features
- Interactive quest route planning interface
- OSRS Wiki data integration
- MDX content rendering for quest details
- Quest requirements visualization
- Skill requirement tracking

## Tech Stack
- Frontend & Backend: SvelteKit
- Styling: Tailwind CSS
- Testing: Vitest + @testing-library/svelte
- Language: TypeScript
- Development Tools:
  - ESLint for linting
  - Prettier for code formatting
  - Vitest for testing
  - TypeScript for type safety
  - SvelteKit for routing and SSR

## Project Structure
```
quest-planner/
├── src/
│   ├── lib/               # Shared components and utilities
│   │   ├── components/    # Reusable UI components
│   │   │   ├── quest/     # Quest-related components
│   │   │   ├── layout/    # Layout components
│   │   │   └── common/    # Common UI components
│   │   ├── stores/       # Svelte stores
│   │   └── utils/        # Utility functions
│   ├── routes/           # SvelteKit routes
│   │   ├── about/        # About page
│   │   ├── planner/      # Quest planner feature
│   │   ├── +layout.svelte # Root layout
│   │   └── +page.svelte  # Home page
│   ├── app.css          # Global styles
│   ├── app.html         # Main HTML template
│   └── app.d.ts         # TypeScript declarations
├── static/              # Static assets
├── data/               # Quest data JSON files
├── tests/              # Test files
└── configuration files  # Various config files
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow SOLID, DRY, KISS, and YAGNI principles
- Implement proper error handling
- Write comprehensive tests
- Use JSDoc comments for documentation
- Follow SvelteKit best practices
- Use proper TypeScript types and interfaces

### Testing Strategy
- Write tests before implementing features (TDD)
- Co-locate test files with their components
- Use @testing-library/svelte for component testing
- Test files should follow the pattern: `ComponentName.test.ts`
- Maintain minimum 80% test coverage
- Include integration tests for critical user flows
- Test error handling and edge cases

### UI/UX Standards
- Implement responsive design using Tailwind CSS
- Support dark mode
- Follow accessibility best practices (WCAG 2.1)
- Use semantic HTML
- Ensure mobile-first approach
- Implement proper loading states
- Provide clear error messages
- Use consistent spacing and typography

### File Naming Conventions
- Components: PascalCase (e.g., QuestCard.svelte)
- Routes: kebab-case (e.g., quest-details)
- Utilities: camelCase (e.g., questUtils.ts)
- Test files: ComponentName.test.ts
- Types/Interfaces: PascalCase (e.g., QuestData.ts)
- Store files: camelCase with .store.ts suffix

### State Management
- Use SvelteKit's built-in stores for global state
- Implement local component state where appropriate
- Keep state management simple and predictable
- Use proper TypeScript types for store values
- Implement proper store subscriptions and cleanup

### Performance Guidelines
- Implement lazy loading for routes
- Optimize bundle size
- Use proper image optimization
- Implement proper caching strategies
- Monitor and optimize rendering performance
- Use proper code splitting
- Implement proper error boundaries
- Optimize API calls and data fetching

### Git Workflow
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Update documentation when making significant changes
- Follow conventional commits format
- Create feature branches for new development
- Review code before merging
- Keep the main branch stable

## Setup Instructions
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Run tests: `npm test`
4. Build for production: `npm run build`
5. Preview production build: `npm run preview`

## Important Notes
- Always update this document when making structural changes
- Keep package.json and dependencies up to date
- Document any new features or significant changes
- Follow the established coding patterns and practices
- Ensure all new features have corresponding tests
- Keep the project structure clean and organized
- Monitor and update dependencies regularly
- Follow security best practices
- Keep performance metrics in mind
- Maintain proper error handling throughout the application 