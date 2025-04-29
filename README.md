# OSRS Quest Planner

A modern web application built with SvelteKit to help players plan and track their quest progress in Old School RuneScape.

## Features

- Quest tracking and progress management
- Modern, responsive user interface
- Built with SvelteKit and TypeScript
- Comprehensive testing setup with Vitest and Playwright

## Getting Started

### Prerequisites

- Node.js (version specified in .nvmrc)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Testing

The project includes both unit and end-to-end testing:

```bash
# Run unit tests
npm run test:unit

# Run end-to-end tests
npm run test:e2e

# Run all tests
npm run test
```

### Building for Production

To create a production build:

```bash
npm run build
```

You can preview the production build with:
```bash
npm run preview
```

## Project Structure

- `src/` - Main source code
- `e2e/` - End-to-end tests
- `static/` - Static assets
- `vite.config.ts` - Vite configuration
- `svelte.config.js` - SvelteKit configuration
- `tsconfig.json` - TypeScript configuration

## Development Tools

- TypeScript for type safety
- ESLint and Prettier for code formatting
- Vitest for unit testing
- Playwright for end-to-end testing

## License

This project is licensed under the MIT License - see the LICENSE file for details.
