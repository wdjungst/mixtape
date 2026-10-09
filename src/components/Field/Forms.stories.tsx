import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Radio, RadioGroup } from '../RadioGroup';
import { Select, SelectItem } from '../Select';
import { HStack, VStack } from '../Stack';
import { Switch } from '../Switch';
import { Textarea } from '../Textarea';
import { Field } from './Field';

const meta = {
  title: 'Forms/Field',
  component: Field,
  args: {
    label: 'Artist name',
    description: 'How you want to be credited on the tracklist.',
    children: <Input placeholder="DJ …" />,
  },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Artist name is required.', required: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const SubmitAMix: Story = {
  name: 'Example: Submit a mix',
  render: function Render() {
    const [title, setTitle] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const error = submitted && !title ? 'Give your mix a title.' : undefined;
    return (
      <Card style={{ maxWidth: '32rem' }}>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <VStack gap="5">
            <Field label="Mix title" required error={error}>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field label="Genre" description="Pick the closest match.">
              <Select placeholder="Choose a genre" name="genre">
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="techno">Techno</SelectItem>
                <SelectItem value="dnb">Drum &amp; Bass</SelectItem>
                <SelectItem value="disco">Disco</SelectItem>
              </Select>
            </Field>
            <Field label="Liner notes">
              <Textarea placeholder="Tell listeners about this set…" />
            </Field>
            <RadioGroup label="Visibility" defaultValue="public" name="visibility">
              <Radio value="public" label="Public" description="Anyone can listen." />
              <Radio value="unlisted" label="Unlisted" description="Only people with the link." />
            </RadioGroup>
            <Switch label="Allow downloads" defaultChecked />
            <Checkbox label="I own the rights to every track in this mix" />
            <HStack justify="flex-end" gap="2">
              <Button variant="ghost" tone="neutral" type="reset">
                Cancel
              </Button>
              <Button type="submit">Publish mix</Button>
            </HStack>
          </VStack>
        </form>
      </Card>
    );
  },
};
