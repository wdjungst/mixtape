import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { HStack } from '../Stack';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  args: { content: 'Loop the next 8 bars', children: <Button variant="outline">Loop</Button> },
  argTypes: { children: { control: false } },
  render: (args) => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sides: Story = {
  render: () => (
    <HStack gap="4" justify="center" style={{ padding: '4rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
          <Button variant="soft">{side}</Button>
        </Tooltip>
      ))}
    </HStack>
  ),
};
