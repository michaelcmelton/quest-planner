# Quest Planner - AI Assistant Guidelines

This document provides guidelines for AI assistants working on the Quest Planner project. It outlines the project's current state, development practices, and specific requirements for AI assistance.

## Project Context

Quest Planner is a web application for planning and optimizing quest routes in Old School RuneScape. The project originated from a need to optimize quest routes for specialized accounts, particularly Slayer-locked accounts with combat level experience limits.

## Current State

### Core Features Implemented
- Quest graph system for dependency validation
- Real-time route validation
- Quest data integration

### In Development
- Mobile-friendly navigation
- Dark mode Support
- Quest Summary component
- Route management system
- Enhanced validation rules
- Specialized account support

## AI Assistant Guidelines

### File Management
- Always provide full file paths in the format: `src/path/to/file.ts`
- Update project structure documentation when adding new files
- Maintain consistent file naming conventions
- Keep related files together in appropriate directories

### Code Quality
- Follow SOLID principles
- Maintain 80%+ test coverage
- Use TypeScript for type safety
- Implement comprehensive error handling
- Keep code DRY and maintainable

### Testing Requirements
- Write tests before implementing features (TDD)
- Use Vitest and @testing-library/svelte
- Test files should be co-located with their components
- Include tests for edge cases and error conditions

### Documentation Standards
- Use JSDoc for TypeScript files
- Keep README.md and AI.MD updated
- Document complex algorithms
- Maintain clear commit messages

### Development Workflow
1. Review requirements
2. Write failing tests
3. Implement minimum code to pass tests
4. Refactor while maintaining tests
5. Update documentation

## Tech Stack Details

### Frontend
- SvelteKit for routing and SSR
- CSS Modules with SCSS for styling
- TypeScript for type safety
- Vitest for testing

### Data Management
- Quest graph system for validation
- Svelte stores for state management
- JSON data from OSRS Wiki

## File Structure Guidelines

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

## Best Practices

### Code Organization
- Keep components small and focused
- Use proper TypeScript types
- Implement proper error handling
- Follow SvelteKit conventions

### Performance
- Optimize bundle size
- Implement proper code splitting
- Use efficient data structures
- Minimize re-renders

### Security
- Validate all user input
- Sanitize data before rendering
- Follow security best practices
- Keep dependencies updated

## AI Assistant Responsibilities

1. **Code Generation**
   - Follow established patterns
   - Include proper error handling
   - Add necessary tests
   - Update documentation

2. **Code Review**
   - Check for adherence to standards
   - Verify test coverage
   - Ensure proper error handling
   - Validate performance considerations

3. **Documentation**
   - Keep documentation up-to-date
   - Add JSDoc comments
   - Update README.md
   - Maintain AI.MD

4. **Testing**
   - Ensure test coverage
   - Add tests for edge cases
   - Verify error handling
   - Check performance

## Current Focus Areas

1. Quest graph system
2. Route validation
3. UI components
4. Testing coverage
5. Documentation

## Notes for AI Assistants

- Always provide full file paths
- Follow the established patterns
- Maintain test coverage
- Update documentation
- Consider performance implications
- Validate security considerations

# Quest Planner Documentation

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
│   │   └── about/
│   │       └── +page.svelte      # About page
│   └── app.d.ts                  # TypeScript declarations
├── static/
│   └── icons/                   # Icons from the wiki.
├── package.json                 # Project dependencies
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

## Layout Structure

The application uses a consistent layout structure across all pages:

1. **Root Layout** (`src/routes/+layout.svelte`):
   - Header with navigation links
   - Theme toggle button
   - Main content area with proper spacing
   - Footer with copyright information
   - Responsive design for all screen sizes

2. **Page Layout**:
   - Centered content with `min-h-[calc(100vh-8rem)]` to fill viewport
   - Consistent padding and margins
   - Dark mode support
   - Responsive grid layouts

3. **Error Page** (`src/routes/+error.svelte`):
   - Centered error message
   - Clear call-to-action buttons
   - Consistent styling with main layout

## Styling Guidelines

1. **CSS Architecture**:
   - Use SCSS directly in Svelte components
   - BEM methodology for class naming
   - CSS custom properties for theming
   - Component-scoped styles by default

2. **Component Structure**:
   ```
   src/
   └── components/
       └── ComponentName.svelte
   ```

3. **Naming Conventions**:
   - Component files: PascalCase (e.g., `QuestList.svelte`)
   - BEM classes: `block__element--modifier`
   - Variables: kebab-case (e.g., `$primary-color`)

4. **Theme Management**:
   - CSS custom properties for theme values
   - Dark mode support through CSS variables
   - Smooth transitions between themes
   - Consistent spacing and typography

5. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints:
     - sm: 640px
     - md: 768px
     - lg: 1024px
   - Flexible grids using CSS Grid and Flexbox
   - Media queries in component styles

6. **Component Styling**:
   - Use `<style lang="scss">` in Svelte components
   - Shared variables in a global SCSS file
   - Consistent spacing using variables
   - Accessible color contrast
   - Proper focus states

Example component structure:
```svelte
<script lang="ts">
  // Component logic
</script>

<div class="quest-list">
  <div class="quest-list__header">
    <h2 class="quest-list__title">Quests</h2>
  </div>
  <div class="quest-list__content">
    <!-- Content -->
  </div>
</div>

<style lang="scss">
  $spacing-unit: 1rem;
  $primary-color: var(--color-primary);
  
  .quest-list {
    padding: $spacing-unit;
    
    &__header {
      margin-bottom: $spacing-unit;
    }
    
    &__title {
      color: $primary-color;
    }
    
    &__content {
      display: grid;
      gap: $spacing-unit;
    }
  }
</style>
```

## Theme Management

The application includes a theme management system:

1. **Theme Store** (`src/lib/stores/theme.ts`):
   - Persists user preference in localStorage
   - Respects system color scheme
   - Provides theme toggle functionality

2. **Theme Implementation**:
   - Uses Tailwind's dark mode feature
   - Applies theme classes to root element
   - Smooth transitions between themes

## Testing

1. **Theme Tests** (`src/lib/stores/theme.test.ts`):
   - Theme initialization
   - Theme persistence
   - Theme toggle functionality

2. **Layout Tests** (`tests/layout.test.ts`):
   - Navigation rendering
   - Theme toggle functionality
   - Responsive behavior

## Development Guidelines

1. **Component Structure**:
   - Use semantic HTML elements
   - Maintain consistent spacing
   - Implement responsive design
   - Support dark mode

2. **Styling**:
   - Use Tailwind utility classes
   - Follow established color scheme
   - Maintain consistent spacing
   - Ensure proper contrast

3. **Accessibility**:
   - Use semantic HTML
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Maintain color contrast

4. **Performance**:
   - Optimize images and assets
   - Minimize CSS and JavaScript
   - Use efficient rendering
   - Implement lazy loading

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm run test
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Contributing

1. Follow the established project structure
2. Maintain consistent styling
3. Write tests for new features
4. Update documentation
5. Follow accessibility guidelines