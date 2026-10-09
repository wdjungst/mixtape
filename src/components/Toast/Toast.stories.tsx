import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { HStack } from '../Stack';
import { ToastProvider, useToast } from './Toast';

function Demo() {
  const { toast } = useToast();
  return (
    <HStack gap="2" wrap>
      <Button
        onClick={() =>
          toast({ title: 'Track added', description: '“Sunrise” was added to your queue.' })
        }
      >
        Show toast
      </Button>
      <Button
        tone="success"
        variant="soft"
        onClick={() => toast({ title: 'Mix published', tone: 'success' })}
      >
        Success
      </Button>
      <Button
        tone="danger"
        variant="soft"
        onClick={() =>
          toast({
            title: 'Track removed',
            tone: 'danger',
            action: { label: 'Undo', onClick: () => toast({ title: 'Restored' }) },
          })
        }
      >
        With action
      </Button>
    </HStack>
  );
}

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Wrap your app in `<ToastProvider>` (inside `ThemeProvider`) and call `useToast().toast({...})` anywhere.',
      },
    },
  },
  render: () => <Demo />,
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
