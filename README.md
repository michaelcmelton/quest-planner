# Quest Planner

A web application for planning and optimizing quest routes in Old School RuneScape. Built with SvelteKit and Tailwind CSS.

## Features

- 🎯 Interactive quest planning interface
- 📊 Quest requirements tracking
- 🗺️ Route optimization
- 🌓 Dark mode support
- 📱 Responsive design
- 🔄 Real-time validation

## Tech Stack

- **Frontend**: SvelteKit
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Type Safety**: TypeScript

## Project Structure

```
quest-planner/
├── src/
│   ├── lib/
│   │   ├── stores/
│   │   │   ├── theme.ts           # Theme management store
│   │   │   └── theme.test.ts      # Theme store tests
│   │   └── components/
│   │       └── QuestList.svelte   # Quest list component
│   ├── routes/
│   │   ├── +layout.svelte        # Root layout with navigation and theme toggle
│   │   ├── +page.svelte          # Home page with feature tiles
│   │   ├── +error.svelte         # Custom 404 error page
│   │   ├── about/
│   │   │   └── +page.svelte      # About page
│   │   ├── quests/
│   │   │   └── +page.svelte      # Quest list page
│   │   └── planner/
│   │       └── +page.svelte      # Quest planner page
│   └── app.d.ts                  # TypeScript declarations
├── static/
│   └── icons/                   # Icons from the wiki
├── tests/                      # Test files
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts             # Vite configuration
└── tsconfig.json              # TypeScript configuration
```

## Getting Started

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

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

## Design System

### Layout

- Centered content with proper spacing
- Responsive design for all screen sizes
- Consistent padding and margins
- Dark mode support

### Color Scheme

#### Light Mode
- Background: Light gray (`bg-gray-100`)
- Content: White (`bg-white` or `bg-gray-50`)
- Text: Dark gray (`text-gray-900` for headings, `text-gray-600` for body)
- Borders: Light gray (`border-gray-300`)

#### Dark Mode
- Background: Dark gray (`bg-gray-900`)
- Content: Slightly lighter gray (`bg-gray-800`)
- Text: White (`text-white` for headings, `text-gray-300` for body)
- Borders: Dark gray (`border-gray-700`)

### Components

#### Cards
- Rounded corners (`rounded-xl`)
- Subtle shadow (`shadow-lg`)
- Border definition (`border`)
- Hover effects for interactivity

#### Buttons
- Primary: Blue with hover state
- Secondary: Gray with hover state
- Consistent padding and rounded corners
- Icon support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OSRS Wiki for quest data
- SvelteKit team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
