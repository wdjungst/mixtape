import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button';
import { VStack } from '../Stack';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    title: 'New version available',
    children: 'Mixtape 2.0 adds stem separation and a new effects rack.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <VStack gap="3">
      <Alert tone="accent" title="Heads up">
        Your set starts in 15 minutes.
      </Alert>
      <Alert tone="neutral" title="Note">
        Auto-gain is off for this deck.
      </Alert>
      <Alert tone="success" title="Mix uploaded">
        It’s live on your profile.
      </Alert>
      <Alert tone="warning" title="Clipping detected">
        Lower the master gain by 3 dB.
      </Alert>
      <Alert tone="danger" title="Upload failed">
        The file is larger than 500 MB.
      </Alert>
    </VStack>
  ),
};

export const Outline: Story = { args: { variant: 'outline', tone: 'success', title: 'Saved' } };

export const WithActionAndDismiss: Story = {
  args: {
    tone: 'warning',
    title: 'Unsaved changes',
    children: 'Your cue points haven’t been saved.',
    action: (
      <Button size="sm" tone="warning" variant="soft">
        Save now
      </Button>
    ),
    onDismiss: fn(),
  },
};

export const NoIcon: Story = { args: { icon: false } };
