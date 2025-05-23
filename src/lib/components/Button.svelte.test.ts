import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, { props: { children: 'Click me' } });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'primary', 'medium');
  });

  it('renders with secondary variant', () => {
    const { getByRole } = render(Button, { props: { variant: 'secondary', children: 'Click me' } });
    const button = getByRole('button');
    expect(button).toHaveClass('button', 'secondary', 'medium');
  });

  it('renders with different sizes', () => {
    const { getByRole } = render(Button, { props: { size: 'large', children: 'Click me' } });
    const button = getByRole('button');
    expect(button).toHaveClass('button', 'primary', 'large');
  });

  it('handles click events', async () => {
    const { getByRole } = render(Button, { props: { children: 'Click me' } });
    const button = getByRole('button');
    const clickHandler = vi.fn();
    button.addEventListener('click', clickHandler);
    await fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });

  it('applies disabled state', () => {
    const { getByRole } = render(Button, { props: { disabled: true, children: 'Click me' } });
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('button');
  });

  it('renders with custom type', () => {
    const { getByRole } = render(Button, { props: { type: 'submit', children: 'Submit' } });
    const button = getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
}); 