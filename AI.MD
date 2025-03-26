# Quest Planner - Project Documentation

## Project Overview
Quest Planner is a web application that helps users plan their quest routes in Old School RuneScape (OSRS). The application uses pre-processed data from the OSRS WikiMedia API and presents it in an interactive, user-friendly interface.

## Current State
- Basic routing system implemented
- Test infrastructure set up with Vitest
- Core layout and navigation in place
- Development environment configured with TypeScript and Tailwind CSS

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

## Project Structure
```
quest-planner/
├── src/
│   ├── lib/               # Shared components and utilities
│   ├── routes/            # SvelteKit routes
│   │   ├── about/        # About page
│   │   ├── planner/      # Quest planner feature
│   │   ├── +layout.svelte # Root layout
│   │   └── +page.svelte  # Home page
│   ├── app.css          # Global styles
│   ├── app.html         # Main HTML template
│   └── app.d.ts         # TypeScript declarations
├── static/               # Static assets
├── data/                # Quest data JSON files
├── tests/               # Test files
└── configuration files  # Various config files
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow SOLID, DRY, KISS, and YAGNI principles
- Implement proper error handling
- Write comprehensive tests
- Use JSDoc comments for documentation

### Testing Strategy
- Write tests before implementing features (TDD)
- Co-locate test files with their components
- Use @testing-library/svelte for component testing
- Test files should follow the pattern: `ComponentName.test.ts`
- Maintain minimum 80% test coverage

### UI/UX Standards
- Implement responsive design using Tailwind CSS
- Support dark mode
- Follow accessibility best practices (WCAG 2.1)
- Use semantic HTML
- Ensure mobile-first approach

### File Naming Conventions
- Components: PascalCase (e.g., QuestCard.svelte)
- Routes: kebab-case (e.g., quest-details)
- Utilities: camelCase (e.g., questUtils.ts)
- Test files: ComponentName.test.ts
- Types/Interfaces: PascalCase (e.g., QuestData.ts)

### State Management
- Use SvelteKit's built-in stores for global state
- Implement local component state where appropriate
- Keep state management simple and predictable

### Performance Guidelines
- Implement lazy loading for routes
- Optimize bundle size
- Use proper image optimization
- Implement proper caching strategies
- Monitor and optimize rendering performance

### Git Workflow
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Update documentation when making significant changes
- Follow conventional commits format

## Setup Instructions
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Run tests: `npm test`
4. Build for production: `npm run build`

## Important Notes
- Always update this document when making structural changes
- Keep package.json and dependencies up to date
- Document any new features or significant changes
- Follow the established coding patterns and practices
- Ensure all new features have corresponding tests
- Keep the project structure clean and organized 