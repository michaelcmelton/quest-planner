# Quest Planner

A modern web application for planning and optimizing quest routes in Old School RuneScape (OSRS). Born from the need to optimize quest routes for specialized accounts, Quest Planner provides an intuitive interface for planning efficient quest completion paths.

## Features

### Current Features
- 🗺️ Interactive quest route planning
- 🔍 Comprehensive quest information
- ✅ Real-time requirement validation
- 🔄 Quest dependency tracking

### Planned Features
- 🎮 Advanced route optimization
- 🤝 Community route sharing
- 📊 Progress tracking
- 🔑 User authentication
- 📱 Mobile support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

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

### Development Environment Setup
1. Install recommended VS Code extensions:
   - Svelte for VS Code
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

2. Configure your environment:
   ```bash
   # Install global dependencies
   npm install -g svelte-language-server
   ```

## Project Structure
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

## Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues**
   - Check existing issues before creating a new one
   - Use the issue template
   - Provide detailed reproduction steps
   - Include relevant screenshots or logs

2. **Submit Pull Requests**
   - Fork the repository
   - Create a feature branch
   - Write tests for new features
   - Follow the coding standards
   - Submit a pull request

3. **Development Process**
   - Write tests first (TDD)
   - Keep commits focused and atomic
   - Update documentation
   - Follow conventional commits

### Code Standards
- TypeScript for type safety
- SOLID principles
- 80%+ test coverage
- ESLint and Prettier for code formatting
- JSDoc for documentation (if writing JS)

## Tech Stack
- Frontend: SvelteKit
- Styling: Tailwind CSS
- Testing: Vitest, @testing-library/svelte
- Language: TypeScript, JavaScript for the `scripts/` directory.

## Support

- 📝 [Documentation](AI.MD)
- 🐛 [File an Issue](https://github.com/michaelcmelton/quest-planner/issues)
- 💬 [Discord Community](https://discord.gg/quest-planner)
- 📧 Email: your-email@example.com

When filing an issue, please:
1. Check if the issue has already been reported
2. Use the appropriate issue template
3. Provide detailed reproduction steps
4. Include relevant screenshots or logs
5. Specify your environment (OS, browser, etc.)
6. Add any relevant error messages

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- OSRS Wiki for quest data
- Svelte and SvelteKit teams
- All contributors and supporters
