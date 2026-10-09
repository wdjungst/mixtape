import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../Heading';
import { VStack } from '../Stack';
import { Text } from './Text';

const meta = {
  title: 'Layout/Typography',
  component: Text,
  args: { children: 'Every great set starts with a single track.' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Headings: Story = {
  render: () => (
    <VStack gap="3">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading level {level}
        </Heading>
      ))}
    </VStack>
  ),
};

export const Tones: Story = {
  render: () => (
    <VStack gap="2">
      {(['default', 'muted', 'subtle', 'accent', 'success', 'warning', 'danger'] as const).map(
        (tone) => (
          <Text key={tone} tone={tone}>
            {tone}: the bassline drops at 1:32
          </Text>
        ),
      )}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="2">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Text key={size} size={size}>
          {size}: Mixtape
        </Text>
      ))}
    </VStack>
  ),
};

export const Truncate: Story = {
  args: {
    truncate: true,
    style: { maxWidth: '16rem' },
    children: 'An extremely long track title (Extended Club Remix) [Radio Edit] feat. Everybody',
  },
};
