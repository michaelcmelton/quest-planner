# Quest Planner

A modern web application for planning quest routes in Old School RuneScape (OSRS). Built with SvelteKit and Tailwind CSS.

## Features

Current features:
- SvelteKit-based routing system
- Responsive design with Tailwind CSS
- Dark mode support
- Test-driven development setup with Vitest
- TypeScript integration
- Quest Data sourcing and reusable pipelines from the OSRS Wiki completed

Planned features:
1. Interactive Quest Route Planning Interface
   - Drag-and-drop quest ordering
   - Visual quest dependency graph
   - Real-time requirement tracking
   - Progress tracking and completion status
   - Quest grouping and categorization

2. Quick Sorting Features
   - Sort by quest difficulty (Novice to Grandmaster)
   - Sort by quest length (Very Short to Very Long)
   - Sort by skill requirements
   - Sort by quest series
   - Sort by region
   - Custom sorting filters

3. Quest Detail View
   - Comprehensive quest information display
   - Required items and skills visualization
   - Quest rewards breakdown
   - Quest walkthrough integration
   - Interactive maps and locations
   - Quest series context

4. Quest Route Saving
   - Save multiple routes
   - Share routes with others
   - Track progress on saved routes

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

## Getting Started

### Prerequisites

- Node.js (v20.11.1 or higher)
- npm (v10.2.4 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quest-planner.git
cd quest-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run check` - Type-check the codebase
- `npm run lint` - Lint the codebase
- `npm run format` - Format code with Prettier

### Project Structure

```
quest-planner/
├── src/
│   ├── lib/               # Shared components and utilities
│   │   └── data/          # Quest data
│   ├── routes/            # SvelteKit routes
│   │   ├── +layout.svelte # Root layout
│   │   └── +page.svelte   # Home page
│   ├── app.css            # Global styles
│   ├── app.html           # Main HTML template
│   └── app.d.ts           # TypeScript declarations
├── static/                # Static assets
└── configuration files    # Various config files
```

### Development Guidelines

#### Code Style
- Use TypeScript for all new code
- Follow SOLID, DRY, KISS, and YAGNI principles
- Implement proper error handling
- Write comprehensive tests
- Use JSDoc comments for documentation
- Follow SvelteKit best practices
- Use proper TypeScript types and interfaces

#### Testing Strategy
- Write tests before implementing features (TDD)
- Co-locate test files with their components
- Use @testing-library/svelte for component testing
- Test files should follow the pattern: `ComponentName.test.ts`
- Maintain minimum 80% test coverage
- Include integration tests for critical user flows
- Test error handling and edge cases

#### UI/UX Standards
- Implement responsive design using Tailwind CSS
- Support dark mode
- Follow accessibility best practices (WCAG 2.1)
- Use semantic HTML
- Ensure mobile-first approach
- Implement proper loading states
- Provide clear error messages
- Use consistent spacing and typography

#### Performance Guidelines
- Implement lazy loading for routes
- Optimize bundle size
- Use proper image optimization
- Implement proper caching strategies
- Monitor and optimize rendering performance
- Use proper code splitting
- Implement proper error boundaries
- Optimize API calls and data fetching

### Testing

We use Vitest for testing. Run the test suite with:

```bash
npm run test
```

Tests are co-located with their respective components and features. We maintain a minimum test coverage of 80%.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by the OSRS Wiki
- Built with SvelteKit and Tailwind CSS
- Special thanks to the OSRS community for their support and feedback
