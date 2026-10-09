import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../test/a11y';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Textarea } from '../Textarea';
import { Field } from './Field';

describe('Field', () => {
  it('labels the control and links description and error', () => {
    render(
      <Field label="Email" description="We never share it." error="Required" required>
        <Input type="email" />
      </Field>,
    );
    const input = screen.getByLabelText(/Email/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('We never share it. Required');
  });

  it('passes disabled to the control', () => {
    render(
      <Field label="Notes" disabled>
        <Textarea />
      </Field>,
    );
    expect(screen.getByLabelText('Notes')).toBeDisabled();
  });

  it('keeps a control-provided id and merges aria-describedby', () => {
    render(
      <>
        <span id="extra">Extra</span>
        <Field label="Name" description="Desc" controlId="name">
          <Input aria-describedby="extra" />
        </Field>
      </>,
    );
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('id', 'name');
    expect(input).toHaveAccessibleDescription('Desc Extra');
  });

  it('labels a Select trigger', () => {
    render(
      <Field label="Genre" error="Pick one">
        <Select placeholder="Choose">
          <SelectItem value="house">House</SelectItem>
        </Select>
      </Field>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Genre' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Pick one');
  });

  it('accepts typing and has no a11y violations', async () => {
    const { container } = render(
      <Field label="Artist" error="Too short">
        <Input />
      </Field>,
    );
    await userEvent.type(screen.getByLabelText('Artist'), 'DJ');
    expect(screen.getByLabelText('Artist')).toHaveValue('DJ');
    await expectNoA11yViolations(container);
  });
});

describe('Input', () => {
  it('works standalone with invalid', () => {
    render(<Input aria-label="Search" invalid />);
    const input = screen.getByRole('textbox', { name: 'Search' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).not.toHaveAttribute('invalid');
  });
});
