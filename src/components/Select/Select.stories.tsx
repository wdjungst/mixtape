import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from './Select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  args: {
    placeholder: 'Choose a genre',
    'aria-label': 'Genre',
    onValueChange: fn(),
    children: null,
  },
  argTypes: { children: { control: false } },
  render: (args) => (
    <div style={{ maxWidth: '16rem' }}>
      <Select {...args}>
        <SelectGroup>
          <SelectLabel>Electronic</SelectLabel>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="techno">Techno</SelectItem>
          <SelectItem value="trance">Trance</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Classics</SelectLabel>
          <SelectItem value="disco">Disco</SelectItem>
          <SelectItem value="funk">Funk</SelectItem>
          <SelectItem value="soul" disabled>
            Soul (coming soon)
          </SelectItem>
        </SelectGroup>
      </Select>
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'techno' } };
export const Small: Story = { args: { size: 'sm' } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
