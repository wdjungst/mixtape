import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '../Stack';
import { Textarea } from '../Textarea';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: { placeholder: 'Search tracks…', 'aria-label': 'Search tracks' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <VStack gap="3" style={{ maxWidth: '20rem' }}>
      <Input {...args} size="sm" />
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </VStack>
  ),
};

export const Invalid: Story = { args: { invalid: true, defaultValue: 'not-an-email' } };

export const Disabled: Story = { args: { disabled: true } };

export const TextareaStory: Story = {
  name: 'Textarea',
  render: () => <Textarea aria-label="Liner notes" placeholder="Liner notes…" rows={4} />,
};
