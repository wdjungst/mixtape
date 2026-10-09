import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Container } from '../Container';
import { Grid } from '../Grid';
import { Heading } from '../Heading';
import { Spinner } from '../Spinner';
import { HStack, Stack } from '../Stack';
import { Text } from '../Text';
import { Box } from './Box';

describe('layout primitives', () => {
  it('Box maps props to token variables and supports `as`', () => {
    render(
      <Box
        as="section"
        data-testid="box"
        p="4"
        px="6"
        bg="bgSubtle"
        radius="lg"
        shadow="md"
        bordered
      >
        Hi
      </Box>,
    );
    const box = screen.getByTestId('box');
    expect(box.tagName).toBe('SECTION');
    expect(box.style.paddingBlock).toBe('var(--mt-space-4)');
    expect(box.style.paddingInline).toBe('var(--mt-space-6)');
    expect(box.style.backgroundColor).toBe('var(--mt-color-bg-subtle)');
    expect(box.style.borderRadius).toBe('var(--mt-radius-lg)');
  });

  it('Stack and HStack set direction and gap', () => {
    render(
      <>
        <Stack data-testid="stack" gap="6" />
        <HStack data-testid="hstack" />
      </>,
    );
    expect(screen.getByTestId('stack').style.flexDirection).toBe('column');
    expect(screen.getByTestId('stack').style.gap).toBe('var(--mt-space-6)');
    expect(screen.getByTestId('hstack').style.flexDirection).toBe('row');
    expect(screen.getByTestId('hstack').style.alignItems).toBe('center');
  });

  it('Grid builds column templates', () => {
    render(
      <>
        <Grid data-testid="a" columns={3} />
        <Grid data-testid="b" minChildWidth="10rem" />
      </>,
    );
    expect(screen.getByTestId('a').style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    expect(screen.getByTestId('b').style.gridTemplateColumns).toContain('auto-fill');
  });

  it('Heading picks the element from level and Text supports `as`', () => {
    render(
      <>
        <Heading level={3}>Title</Heading>
        <Text as="span" tone="muted">
          Muted
        </Text>
      </>,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Muted').tagName).toBe('SPAN');
    expect(screen.getByText('Muted')).toHaveAttribute('data-tone', 'muted');
  });

  it('Card, Container, Badge and Spinner render', () => {
    render(
      <Container size="sm" data-testid="container">
        <Card as="article" variant="elevated">
          <Badge tone="success">Live</Badge>
          <Spinner label="Loading tracks" />
        </Card>
      </Container>,
    );
    expect(screen.getByTestId('container')).toHaveAttribute('data-size', 'sm');
    expect(screen.getByRole('article')).toHaveAttribute('data-variant', 'elevated');
    expect(screen.getByText('Live')).toHaveAttribute('data-mt-tone', 'success');
    expect(screen.getByRole('status')).toHaveTextContent('Loading tracks');
  });
});
