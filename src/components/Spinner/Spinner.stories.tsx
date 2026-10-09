import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack } from '../Stack';
import { Spinner } from './Spinner';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  args: { label: 'Loading tracks' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <HStack gap="4" style={{ color: 'var(--mt-color-accent-text)' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </HStack>
  ),
};
