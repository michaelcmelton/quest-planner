# Quest Planner

A modern web application for planning and tracking Old School RuneScape quest completion.

## Features

- Interactive quest route planning
- Comprehensive quest information
- Requirement tracking
- Route saving and sharing
- Mobile-friendly design
- Dark mode support

## Tech Stack

- Frontend & Backend: SvelteKit
- UI Styling: Tailwind CSS
- Testing: Vitest, @testing-library/svelte

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte      # Main layout with navigation
│   ├── +page.svelte        # Home/Landing page
│   ├── about/              # About page
│   ├── planner/            # Quest planner interface
│   ├── quests/             # Quest browser
│   └── routes/             # Saved routes management
├── lib/                    # Shared utilities and components
└── app.css                # Global styles
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- Follows Test-Driven Development (TDD) practices
- Uses TypeScript for type safety
- Implements responsive design principles
- Maintains high test coverage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Implement features
5. Submit a pull request

## License

MIT License
