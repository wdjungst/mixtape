import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Field } from '../Field';
import { Input } from '../Input';
import { VStack } from '../Stack';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './Dialog';

const meta = {
  title: 'Overlays/Dialog',
  component: DialogContent,
  args: {
    title: 'Save this mix',
    description: 'Give your mix a name so you can find it later.',
    size: 'md',
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Save mix</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <VStack gap="4">
          <Field label="Name">
            <Input defaultValue="Friday night warm-up" />
          </Field>
        </VStack>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" tone="neutral">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof DialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    title: 'Delete playlist?',
    description: 'This removes all 48 tracks. This can’t be undone.',
    size: 'sm',
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button tone="danger" variant="soft">
          Delete playlist
        </Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" tone="neutral">
              Keep it
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button tone="danger">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
