import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { HStack } from '../Stack';
import { IconButton } from './IconButton';

const HeartIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M8 13.5S2 10 2 5.75A2.75 2.75 0 0 1 8 4.5a2.75 2.75 0 0 1 6 1.25C14 10 8 13.5 8 13.5z" />
  </svg>
);

const meta = {
  title: 'Forms/IconButton',
  component: IconButton,
  args: { icon: <HeartIcon />, 'aria-label': 'Add to favorites', onClick: fn() },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <HStack gap="3">
      <IconButton {...args} variant="solid" tone="accent" />
      <IconButton {...args} variant="soft" tone="accent" />
      <IconButton {...args} variant="outline" />
      <IconButton {...args} variant="ghost" />
    </HStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <HStack gap="3">
      <IconButton {...args} size="sm" variant="outline" />
      <IconButton {...args} size="md" variant="outline" />
      <IconButton {...args} size="lg" variant="outline" />
    </HStack>
  ),
};
