# Quest Planner - Project Documentation

## Project Overview
Quest Planner is a web application that helps users plan their quest routes in Old School RuneScape (OSRS). The application uses pre-processed data from the OSRS WikiMedia API and presents it in an interactive, user-friendly interface.

## Tech Stack
- Frontend & Backend: SvelteKit
- Styling: Tailwind CSS
- Testing: Vitest
- Language: TypeScript

## Project Structure
```
quest-planner/
├── src/                    # Source code
│   ├── lib/               # Shared components and utilities
│   ├── routes/            # SvelteKit routes
│   └── app.html          # Main HTML template
├── static/                # Static assets
├── data/                  # Quest data JSON files
├── tests/                 # Test files
├── .svelte-kit/          # Build output (ignored)
└── node_modules/         # Dependencies (ignored)
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow SOLID, DRY, KISS, and YAGNI principles
- Implement proper error handling
- Write comprehensive tests
- Use JSDoc comments for documentation

### Testing
- Write tests before implementing features (TDD)
- Maintain minimum 80% test coverage
- Use Vitest for unit and integration tests

### UI/UX
- Implement responsive design
- Support dark mode
- Follow accessibility best practices
- Create modern and beautiful interfaces

### File Naming Conventions
- Components: PascalCase (e.g., QuestCard.svelte)
- Routes: kebab-case (e.g., quest-details)
- Utilities: camelCase (e.g., questUtils.ts)
- Test files: ComponentName.test.ts

### Git Workflow
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Update documentation when making significant changes

### Performance
- Optimize bundle size
- Implement lazy loading where appropriate
- Monitor and optimize rendering performance

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