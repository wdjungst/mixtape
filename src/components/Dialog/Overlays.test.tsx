import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../test/a11y';
import { ThemeProvider } from '../../theme';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs';
import { ToastProvider, useToast } from '../Toast';
import { Tooltip } from '../Tooltip';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';

describe('Dialog', () => {
  it('opens, is labelled, and closes with Escape', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent title="Save mix" description="Name it">
          <input aria-label="Name" />
        </DialogContent>
      </Dialog>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog', { name: 'Save mix' });
    expect(dialog).toHaveAccessibleDescription('Name it');
    await expectNoA11yViolations(dialog);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes via the close button', async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent title="Hi" />
      </Dialog>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('portals inside the nearest ThemeProvider so scoped themes apply', () => {
    render(
      <ThemeProvider theme="neon">
        <Dialog defaultOpen>
          <DialogContent title="Themed" />
        </Dialog>
      </ThemeProvider>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.closest('[data-mt-theme]')).toHaveAttribute('data-mt-theme', 'neon');
  });
});

describe('Popover', () => {
  it('opens on click', async () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Cue</Button>
        </PopoverTrigger>
        <PopoverContent aria-label="Cue point">Cue body</PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Cue' }));
    expect(screen.getByRole('dialog', { name: 'Cue point' })).toHaveTextContent('Cue body');
  });
});

describe('Tooltip', () => {
  it('shows on keyboard focus', async () => {
    render(
      <Tooltip content="Loop 8 bars">
        <Button>Loop</Button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Loop 8 bars');
  });
});

describe('Tabs', () => {
  it('switches panels with arrow keys', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Details">
          <TabsTrigger value="a">Tracks</TabsTrigger>
          <TabsTrigger value="b">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Track panel</TabsContent>
        <TabsContent value="b">Notes panel</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Track panel');
    await userEvent.click(screen.getByRole('tab', { name: 'Tracks' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Notes' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Notes panel');
  });
});

describe('Toast', () => {
  function Trigger() {
    const { toast } = useToast();
    return <Button onClick={() => toast({ title: 'Track added', tone: 'success' })}>Add</Button>;
  }

  it('shows a toast from useToast and dismisses it', async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Track added')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    await act(() => new Promise((r) => setTimeout(r, 300)));
    expect(screen.queryByText('Track added')).not.toBeInTheDocument();
  });

  it('throws a helpful error outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});

describe('Alert', () => {
  it('uses role=alert for danger and status otherwise', () => {
    render(
      <>
        <Alert tone="danger" title="Failed" />
        <Alert tone="success" title="Saved" />
      </>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('calls onDismiss', async () => {
    const onDismiss = vi.fn();
    render(<Alert title="Hi" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
