# Quest Planner

A web application for planning and optimizing quest routes in Old School RuneScape (OSRS). Built with SvelteKit and modern web technologies.

## Features

- Browse all OSRS quests and their requirements
- Create and optimize quest completion routes
- Track quest requirements and progress
- Modern, responsive design with dark mode support
- Data sourced from the OSRS Wiki

## Tech Stack

- **Frontend Framework**: SvelteKit 2.x
- **Styling**: SCSS Modules
- **Testing**: Vitest + Testing Library
- **Type Safety**: TypeScript
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm (comes with Node.js)

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

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier

### Data Updates

The application includes scripts to fetch and update quest data:

- `npm run fetch-quests` - Fetch latest quest data from OSRS Wiki
- `npm run fetch-skill-icons` - Download skill icons
- `npm run generate-quest-data` - Generate processed quest data

## Testing

The project uses Vitest and Testing Library for testing. Tests are located next to the components they test.

To run tests:
```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 