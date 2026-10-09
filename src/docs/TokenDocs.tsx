import type { ReactNode } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  createTheme,
  Grid,
  Heading,
  HStack,
  Input,
  Switch,
  Text,
  ThemeProvider,
  useTheme,
  VStack,
  type PresetName,
  type Theme,
} from '../index';

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function Swatch({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <HStack gap="3">
      <span
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 'var(--mt-radius-md)',
          background: `var(${cssVar})`,
          border: '1px solid var(--mt-color-border)',
        }}
      />
      <VStack gap="0">
        <Text size="sm" weight="semibold">
          {name}
        </Text>
        <Text size="xs" tone="muted" mono>
          {cssVar}
        </Text>
      </VStack>
    </HStack>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <VStack gap="3" style={{ marginBottom: '2rem' }}>
      <Heading level={3} size="lg">
        {title}
      </Heading>
      {children}
    </VStack>
  );
}

/** Live view of the active theme's tokens; switch themes from the toolbar. */
export function TokenTable() {
  const { theme } = useTheme();
  const { accent, neutral, danger, success, warning, ...surface } = theme.colors;
  const tones = { accent, neutral, danger, success, warning };
  return (
    <div>
      <Section title="Surface & text colors">
        <Grid minChildWidth="14rem" gap="3">
          {Object.keys(surface).map((k) => (
            <Swatch key={k} name={k} cssVar={`--mt-color-${kebab(k)}`} />
          ))}
        </Grid>
      </Section>
      {Object.entries(tones).map(([tone, colors]) => (
        <Section key={tone} title={`Tone: ${tone}`}>
          <Grid minChildWidth="14rem" gap="3">
            {Object.keys(colors).map((k) => (
              <Swatch key={k} name={k} cssVar={`--mt-color-${tone}-${kebab(k)}`} />
            ))}
          </Grid>
        </Section>
      ))}
      <Section title="Type scale">
        {Object.keys(theme.fontSizes).map((k) => (
          <HStack key={k} gap="4" align="baseline">
            <Text size="xs" tone="muted" mono style={{ width: '9rem', flexShrink: 0 }}>
              --mt-font-size-{k}
            </Text>
            <Text style={{ fontSize: `var(--mt-font-size-${k})` }}>Mixtape</Text>
          </HStack>
        ))}
      </Section>
      <Section title="Space">
        {Object.entries(theme.space).map(([k, v]) => (
          <HStack key={k} gap="4">
            <Text size="xs" tone="muted" mono style={{ width: '9rem', flexShrink: 0 }}>
              --mt-space-{k} ({v})
            </Text>
            <span
              style={{
                height: 12,
                width: `var(--mt-space-${k})`,
                background: 'var(--mt-color-accent-solid)',
                borderRadius: 2,
              }}
            />
          </HStack>
        ))}
      </Section>
      <Section title="Radii & shadows">
        <HStack gap="4" wrap>
          {Object.keys(theme.radii).map((k) => (
            <Box
              key={k}
              p="4"
              bg="surface"
              bordered
              style={{ borderRadius: `var(--mt-radius-${k})`, width: 96, textAlign: 'center' }}
            >
              <Text size="xs" mono>
                radius-{k}
              </Text>
            </Box>
          ))}
        </HStack>
        <HStack gap="6" wrap style={{ paddingBlock: '1rem' }}>
          {Object.keys(theme.shadows).map((k) => (
            <Box key={k} p="6" bg="surfaceRaised" radius="lg" shadow={k as 'sm'}>
              <Text size="xs" mono>
                shadow-{k}
              </Text>
            </Box>
          ))}
        </HStack>
      </Section>
    </div>
  );
}

function Sampler({ label }: { label: string }) {
  return (
    <Card variant="outline" style={{ height: '100%' }}>
      <VStack gap="3">
        <HStack justify="space-between">
          <Heading level={3} size="lg">
            {label}
          </Heading>
          <Badge size="sm">Live</Badge>
        </HStack>
        <Text size="sm" tone="muted">
          Now playing: Midnight Mixtape
        </Text>
        <Input size="sm" aria-label={`Search (${label})`} placeholder="Search tracks…" />
        <HStack gap="3">
          <Checkbox label="Loop" defaultChecked size="sm" />
          <Switch label="Sync" defaultChecked size="sm" />
        </HStack>
        <HStack gap="2">
          <Button size="sm">Play</Button>
          <Button size="sm" variant="outline" tone="neutral">
            Queue
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}

/** Every preset side by side, each in its own nested ThemeProvider. */
export function PresetGallery() {
  const names: PresetName[] = ['light', 'dark', 'vinyl', 'neon', 'studio'];
  return (
    <Grid minChildWidth="15rem" gap="4">
      {names.map((name) => (
        <ThemeProvider key={name} theme={name} style={{ padding: '1rem', borderRadius: 12 }}>
          <Sampler label={name} />
        </ThemeProvider>
      ))}
    </Grid>
  );
}

const brand: Theme = createTheme(
  {
    name: 'brand',
    fonts: { heading: "Georgia, 'Times New Roman', serif" },
    radii: { md: '999px', lg: '20px' },
    colors: {
      accent: {
        solid: '#0b6e4f',
        solidHover: '#085a40',
        solidActive: '#064632',
        subtle: '#e6f4ef',
        subtleHover: '#cde9df',
        text: '#0b6e4f',
        border: '#7cc4a9',
      },
    },
  },
  'light',
);

/** Demonstrates a custom theme from createTheme. */
export function CustomThemeDemo() {
  return (
    <ThemeProvider theme={brand} style={{ padding: '1rem', borderRadius: 12, maxWidth: '22rem' }}>
      <Sampler label="brand" />
    </ThemeProvider>
  );
}
