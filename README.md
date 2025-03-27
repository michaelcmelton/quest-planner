# Quest Planner

A modern web application for planning quest routes in Old School RuneScape (OSRS). Built with SvelteKit and Tailwind CSS.

## Features

Current features:
- SvelteKit-based routing system
- Responsive design with Tailwind CSS
- Dark mode support
- Test-driven development setup with Vitest
- TypeScript integration

Planned features:
- Interactive quest route planning interface
- OSRS Wiki data integration
- Quest requirements visualization
- Skill requirement tracking
- MDX content rendering for quest details
- Quest data from OSRS WikiMedia API

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
│   │   ├── components/    # Reusable UI components
│   │   ├── stores/       # Svelte stores
│   │   └── utils/        # Utility functions
│   ├── routes/           # SvelteKit routes (pages and layouts)
│   │   ├── about/        # About page
│   │   ├── planner/      # Quest planner feature
│   │   ├── +layout.svelte # Root layout
│   │   └── +page.svelte  # Home page
│   ├── app.css          # Global styles
│   ├── app.html         # HTML template
│   └── app.d.ts         # TypeScript declarations
├── static/              # Static assets
├── data/               # Quest data JSON files
├── tests/              # Test files
└── ...                 # Configuration files
```

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
