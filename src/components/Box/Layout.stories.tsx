import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../Container';
import { Grid } from '../Grid';
import { Heading } from '../Heading';
import { HStack, Stack, VStack } from '../Stack';
import { Text } from '../Text';
import { Box } from './Box';

const meta = {
  title: 'Layout/Box',
  component: Box,
  args: { p: '6', bg: 'bgSubtle', radius: 'lg', bordered: true, children: 'A themed box' },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const Cell = ({ children }: { children: React.ReactNode }) => (
  <Box p="4" bg="surface" radius="md" bordered>
    {children}
  </Box>
);

export const StackLayouts: Story = {
  name: 'Stack, HStack & VStack',
  render: () => (
    <VStack gap="6">
      <Stack direction="row" gap="2">
        <Cell>Intro</Cell>
        <Cell>Verse</Cell>
        <Cell>Chorus</Cell>
      </Stack>
      <HStack gap="4" justify="space-between">
        <Cell>Left deck</Cell>
        <Cell>Mixer</Cell>
        <Cell>Right deck</Cell>
      </HStack>
      <VStack gap="2" align="flex-start">
        <Cell>Track 1</Cell>
        <Cell>Track 2</Cell>
      </VStack>
    </VStack>
  ),
};

export const GridLayouts: Story = {
  name: 'Grid',
  render: () => (
    <VStack gap="6">
      <Text tone="muted" size="sm">
        columns=4
      </Text>
      <Grid columns={4} gap="3">
        {Array.from({ length: 8 }, (_, i) => (
          <Cell key={i}>Pad {i + 1}</Cell>
        ))}
      </Grid>
      <Text tone="muted" size="sm">
        minChildWidth=&quot;10rem&quot; (resize the window)
      </Text>
      <Grid minChildWidth="10rem" gap="3">
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i}>Sample {i + 1}</Cell>
        ))}
      </Grid>
    </VStack>
  ),
};

export const ContainerLayout: Story = {
  name: 'Container',
  render: () => (
    <Container size="md">
      <Box p="6" bg="bgSubtle" radius="lg" bordered>
        <Heading level={3}>Max width: md (48rem)</Heading>
      </Box>
    </Container>
  ),
};
