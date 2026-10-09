import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../test/a11y';
import { IconButton } from '../IconButton';
import { Button } from './Button';

describe('Button', () => {
  it('renders a type="button" with variant, tone and size attributes', () => {
    render(
      <Button variant="outline" tone="danger" size="lg">
        Delete
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-mt-tone', 'danger');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Play</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled and busy while loading, keeping its accessible name', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders its child with asChild', () => {
    render(
      <Button asChild>
        <a href="/mixes">Mixes</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Mixes' });
    expect(link).toHaveAttribute('data-variant', 'solid');
    expect(link).not.toHaveAttribute('type');
  });

  it('forwards refs', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <>
        <Button>Text</Button>
        <Button loading>Loading</Button>
        <IconButton icon={<svg aria-hidden="true" />} aria-label="Favorite" />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});
