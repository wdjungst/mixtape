import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Field } from '../Field';
import { Input } from '../Input';
import { VStack } from '../Stack';
import { Text } from '../Text';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = {
  title: 'Overlays/Popover',
  component: PopoverContent,
  args: { side: 'bottom', align: 'center', arrow: true },
  render: (args) => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Set cue point</Button>
        </PopoverTrigger>
        <PopoverContent {...args} aria-label="Cue point">
          <VStack gap="3">
            <Text size="sm" weight="semibold">
              Cue point
            </Text>
            <Field label="Timestamp">
              <Input size="sm" defaultValue="01:32" />
            </Field>
            <Button size="sm">Save cue</Button>
          </VStack>
        </PopoverContent>
      </Popover>
    </div>
  ),
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Right: Story = { args: { side: 'right' } };
