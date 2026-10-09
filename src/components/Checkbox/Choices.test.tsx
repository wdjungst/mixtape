import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../test/a11y';
import { Radio, RadioGroup } from '../RadioGroup';
import { Switch } from '../Switch';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles when its label is clicked', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Loop" onCheckedChange={onChange} />);
    const box = screen.getByRole('checkbox', { name: 'Loop' });
    expect(box).not.toBeChecked();
    await userEvent.click(screen.getByText('Loop'));
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('supports indeterminate and descriptions', () => {
    render(<Checkbox label="All" description="Every track" checked="indeterminate" />);
    const box = screen.getByRole('checkbox', { name: 'All' });
    expect(box).toHaveAttribute('aria-checked', 'mixed');
    expect(box).toHaveAccessibleDescription('Every track');
  });
});

describe('RadioGroup', () => {
  it('selects with click and arrow keys', async () => {
    render(
      <RadioGroup label="Tempo" defaultValue="90">
        <Radio value="90" label="90 BPM" />
        <Radio value="120" label="120 BPM" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Tempo' })).toBeInTheDocument();
    const slow = screen.getByRole('radio', { name: '90 BPM' });
    const fast = screen.getByRole('radio', { name: '120 BPM' });
    expect(slow).toBeChecked();
    await userEvent.click(screen.getByText('120 BPM'));
    expect(fast).toBeChecked();
    await userEvent.click(fast); // focus the radio; label clicks don't move focus in jsdom
    // Hold the key: Radix moves focus on a timer and only checks while an arrow key is down.
    await userEvent.keyboard('{ArrowUp>}');
    await waitFor(() => expect(slow).toBeChecked());
    await userEvent.keyboard('{/ArrowUp}');
  });
});

describe('Switch', () => {
  it('toggles', async () => {
    render(<Switch label="Sync" />);
    const sw = screen.getByRole('switch', { name: 'Sync' });
    await userEvent.click(sw);
    expect(sw).toBeChecked();
  });
});

it('choice controls have no a11y violations', async () => {
  const { container } = render(
    <>
      <Checkbox label="A" defaultChecked />
      <Checkbox aria-label="Unlabeled visually" />
      <RadioGroup label="Group" defaultValue="x">
        <Radio value="x" label="X" description="desc" />
      </RadioGroup>
      <Switch label="S" />
    </>,
  );
  await expectNoA11yViolations(container);
});
