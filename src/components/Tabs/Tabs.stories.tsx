import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta = {
  title: 'Overlays/Tabs',
  component: Tabs,
  args: { defaultValue: 'tracks', variant: 'line', orientation: 'horizontal' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Mix details">
        <TabsTrigger value="tracks">Tracklist</TabsTrigger>
        <TabsTrigger value="notes">Liner notes</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="locked" disabled>
          Stems
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tracks">
        <Text>1. Intro · 2. Deep Cuts · 3. Peak Time · 4. Sunrise</Text>
      </TabsContent>
      <TabsContent value="notes">
        <Text>Recorded live, one take, no edits.</Text>
      </TabsContent>
      <TabsContent value="stats">
        <Text>12,480 plays · 312 likes</Text>
      </TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {};
export const Pill: Story = { args: { variant: 'pill' } };
export const Vertical: Story = { args: { orientation: 'vertical' } };
