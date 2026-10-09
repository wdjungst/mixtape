import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { HStack, VStack } from '../Stack';
import { Button } from './Button';

const PlayIcon = () => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M4 2.5v11l9-5.5z" />
  </svg>
);

const meta = {
  title: 'Forms/Button',
  component: Button,
  args: { children: 'Drop the beat', onClick: fn() },
  argTypes: {
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <HStack gap="3" wrap>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </HStack>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <VStack gap="3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <HStack key={variant} gap="3" wrap>
          {(['accent', 'neutral', 'success', 'warning', 'danger'] as const).map((tone) => (
            <Button key={tone} {...args} variant={variant} tone={tone}>
              {tone}
            </Button>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <HStack gap="3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </HStack>
  ),
};

export const WithIcons: Story = {
  args: { startIcon: <PlayIcon />, children: 'Play set' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving mix' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const AsLink: Story = {
  name: 'As a link (asChild)',
  args: { asChild: true, variant: 'outline', children: <a href="#tracklist">View tracklist</a> },
};
