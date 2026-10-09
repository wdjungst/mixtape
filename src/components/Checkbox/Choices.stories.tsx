import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Radio, RadioGroup } from '../RadioGroup';
import { VStack } from '../Stack';
import { Switch } from '../Switch';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox, Radio & Switch',
  component: Checkbox,
  args: { label: 'Crossfade between tracks' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxDefault: Story = { name: 'Checkbox' };

export const CheckboxStates: Story = {
  name: 'Checkbox states',
  render: () => (
    <VStack gap="3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox
        label="With description"
        description="Smoothly blend the end of one track into the next."
      />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Small" size="sm" defaultChecked />
    </VStack>
  ),
};

export const SelectAll: Story = {
  name: 'Example: Select all',
  render: function Render() {
    const tracks = ['Intro', 'Deep Cuts', 'Peak Time', 'Sunrise'];
    const [selected, setSelected] = useState<string[]>(['Deep Cuts']);
    const all = selected.length === tracks.length;
    return (
      <VStack gap="2">
        <Checkbox
          label="All tracks"
          checked={all ? true : selected.length ? 'indeterminate' : false}
          onCheckedChange={() => setSelected(all ? [] : tracks)}
        />
        <VStack gap="2" style={{ paddingInlineStart: '1.75rem' }}>
          {tracks.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={selected.includes(t)}
              onCheckedChange={(c) =>
                setSelected((s) => (c ? [...s, t] : s.filter((x) => x !== t)))
              }
            />
          ))}
        </VStack>
      </VStack>
    );
  },
};

export const Radios: Story = {
  render: () => (
    <VStack gap="6">
      <RadioGroup label="Tempo" defaultValue="120">
        <Radio value="90" label="90 BPM" description="Hip-hop, downtempo" />
        <Radio value="120" label="120 BPM" description="House" />
        <Radio value="174" label="174 BPM" description="Drum & bass" />
        <Radio value="200" label="200 BPM" disabled />
      </RadioGroup>
      <RadioGroup label="Deck" defaultValue="a" orientation="horizontal">
        <Radio value="a" label="Deck A" />
        <Radio value="b" label="Deck B" />
      </RadioGroup>
    </VStack>
  ),
};

export const Switches: Story = {
  render: () => (
    <VStack gap="3">
      <Switch label="Sync BPM" defaultChecked />
      <Switch label="Key lock" description="Keep pitch constant when changing tempo." />
      <Switch label="Small" size="sm" />
      <Switch label="Disabled" disabled />
    </VStack>
  ),
};
