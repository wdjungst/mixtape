import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack, VStack } from '../Stack';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  args: { children: 'New release' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <VStack gap="3">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <HStack key={variant} gap="2">
          {(['accent', 'neutral', 'success', 'warning', 'danger'] as const).map((tone) => (
            <Badge key={tone} variant={variant} tone={tone}>
              {tone}
            </Badge>
          ))}
        </HStack>
      ))}
      <HStack gap="2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
      </HStack>
    </VStack>
  ),
};
