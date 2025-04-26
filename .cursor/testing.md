# Testing Guidelines

## General Principles
- Write tests for all new features
- Maintain high test coverage
- Tests should be independent and isolated
- Tests should be deterministic
- Write tests before fixing bugs
- Test both client and server-side code

## Unit Testing (Vitest)
- Use Vitest for unit testing
- Test individual components in isolation
- Mock external dependencies
- Test edge cases and error conditions
- Keep tests focused and specific
- Use descriptive test names
- Use TypeScript for type-safe tests

## Component Testing (@testing-library/svelte)
- Test Svelte components in isolation
- Use @testing-library/svelte for component tests
- Test component interactions
- Test component state changes
- Test component props
- Test component slots
- Test component events

## End-to-End Testing (Playwright)
- Use Playwright for end-to-end tests
- Test critical user journeys
- Test across different browsers
- Test responsive design
- Test accessibility
- Test performance
- Test form submissions
- Test API interactions

## Testing Tools
- Use Vitest for unit tests
- Use @testing-library/svelte for component tests
- Use Playwright for end-to-end tests
- Use jsdom for DOM testing
- Use @testing-library/jest-dom for DOM assertions
- Use code coverage tools
- Use performance testing tools

## Test Organization
- Group related tests together
- Use descriptive test suites
- Keep test files close to the code they test
- Maintain test data separately
- Document test setup and requirements
- Use TypeScript for test files
- Follow the same directory structure as the source code 