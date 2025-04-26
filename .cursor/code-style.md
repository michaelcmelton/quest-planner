# Code Style Guidelines

## General Principles
- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Document complex logic and non-obvious decisions
- Keep functions and components focused and single-purpose

## Naming Conventions
- Use descriptive names that indicate purpose or functionality
- Follow camelCase for variables and functions
- Use PascalCase for class and component names
- Use UPPER_SNAKE_CASE for constants
- Prefix boolean variables with 'is', 'has', 'should', etc.

## Formatting
- Use 2 spaces for indentation
- Maximum line length: 100 characters
- Use single quotes for strings unless double quotes are required
- Always use semicolons to terminate statements
- Use trailing commas in multi-line object and array definitions

## Comments
- Use JSDoc-style comments for functions and classes
- Keep comments up-to-date with code changes
- Explain why, not what (the code should be self-documenting)
- Remove commented-out code before committing

## File Organization
- One component/class per file
- Group related files in directories
- Keep imports organized and grouped
- Export only what's necessary

## Error Handling
- Use try-catch blocks for expected errors
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases explicitly 