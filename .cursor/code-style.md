# Code Style Guidelines

## General Principles
- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Document complex logic and non-obvious decisions
- Keep functions and components focused and single-purpose
- Use TypeScript for type safety and better developer experience

## Svelte Component Guidelines
- Use `.svelte` extension for Svelte components
- Keep components small and focused
- Use TypeScript in Svelte components with `<script lang="ts">`
- Use Svelte 5 runes for state management (no imports required, globally available):
  - `$state()` for mutable state
  - `$derived()` for computed values
  - `$effect()` for side effects
  - `$props()` for component props (replaces `export let` from Svelte 4)
    - Always type props using TypeScript interfaces or types
    - Example: `const { name, age } = $props<{ name: string; age: number }>()`
    - Use destructuring for cleaner prop access
    - Optional props should be marked with `?` in the type definition
- Use stores only for shared state between components
- Follow Svelte's naming conventions for lifecycle methods
- Use the new `{#snippet}` syntax for reusable template blocks
- Prefer the new `bind:this` syntax for component references

## Naming Conventions
- Use descriptive names that indicate purpose or functionality
- Follow camelCase for variables and functions
- Use PascalCase for component names
- Use UPPER_SNAKE_CASE for constants
- Prefix boolean variables with 'is', 'has', 'should', etc.
- Use kebab-case for file names

## Formatting
- Use 2 spaces for indentation
- Maximum line length: 100 characters
- Use single quotes for strings unless double quotes are required
- Always use semicolons to terminate statements
- Use trailing commas in multi-line object and array definitions
- Follow Prettier configuration for consistent formatting

## Comments
- Use JSDoc-style comments for functions and classes
- Keep comments up-to-date with code changes
- Explain why, not what (the code should be self-documenting)
- Remove commented-out code before committing
- Document complex Svelte component logic
- Document rune usage and state management patterns

## File Organization
- One component per file
- Group related files in directories
- Keep stores in `src/lib/stores`
- Keep types in `src/lib/types`
- Keep static data in `src/lib/data`
- Keep imports organized and grouped
- Export only what's necessary
- Use index files for cleaner imports
- Follow SvelteKit's routing conventions

## Error Handling
- Use try-catch blocks for expected errors
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases explicitly
- Use Svelte's error boundaries where appropriate
- Use the new `$error()` rune for error handling (no import required) 