import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { Heading } from '../Heading';
import { HStack, VStack } from '../Stack';
import { Text } from '../Text';
import { Card } from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const AlbumCard = ({ variant }: { variant: 'outline' | 'elevated' | 'filled' }) => (
  <Card variant={variant} as="article">
    <VStack gap="3">
      <HStack justify="space-between">
        <Heading level={3} size="lg">
          Midnight Mixtape
        </Heading>
        <Badge size="sm">{variant}</Badge>
      </HStack>
      <Text tone="muted" size="sm">
        12 tracks · 48 min. Deep house cuts for the drive home.
      </Text>
      <HStack gap="2">
        <Button size="sm">Play</Button>
        <Button size="sm" variant="ghost" tone="neutral">
          Share
        </Button>
      </HStack>
    </VStack>
  </Card>
);

export const Variants: Story = {
  render: () => (
    <Grid minChildWidth="16rem">
      <AlbumCard variant="outline" />
      <AlbumCard variant="elevated" />
      <AlbumCard variant="filled" />
    </Grid>
  ),
};
