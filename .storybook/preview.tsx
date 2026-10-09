import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider, ToastProvider, presets, type PresetName } from '../src';
import '../src/styles/index.css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'light') as PresetName;
  return (
    <ThemeProvider theme={theme} style={{ padding: '1.5rem', minHeight: '100%' }}>
      <ToastProvider>
        <Story />
      </ToastProvider>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Mixtape theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: Object.keys(presets).map((name) => ({ value: name, title: name })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Introduction', 'Theming', 'Tokens', 'Layout', 'Forms', 'Overlays', 'Feedback'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
