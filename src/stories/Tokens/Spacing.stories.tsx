import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design Tokens/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing tokens provide consistent spacing values throughout the design system. All spacing tokens follow the `--gl-spacing-*` naming convention.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spacingTokens = [
  '--gl-spacing-0000',
  '--gl-spacing-0025',
  '--gl-spacing-0050',
  '--gl-spacing-0100',
  '--gl-spacing-0150',
  '--gl-spacing-0200',
  '--gl-spacing-0300',
  '--gl-spacing-0400',
  '--gl-spacing-0600',
  '--gl-spacing-0800',
  '--gl-spacing-1000',
  '--gl-spacing-1200',
  '--gl-spacing-1500',
];

const SpacingExample = ({ token }: { token: string }) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  
  return (
    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div
        style={{
          width: value,
          height: '40px',
          backgroundColor: 'var(--gl-color-blue, #007bc6)',
          borderRadius: '4px',
          minWidth: '4px',
        }}
      />
      <div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0.25rem' }}>
          {token}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>{value}</div>
      </div>
    </div>
  );
};

export const SpacingScale: Story = {
  render: () => (
    <div>
      <h2>Spacing Scale</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Use spacing tokens to maintain consistent spacing throughout the application.
      </p>
      <div style={{ maxWidth: '800px' }}>
        {spacingTokens.map((token) => (
          <SpacingExample key={token} token={token} />
        ))}
      </div>
    </div>
  ),
};

export const SpacingUsage: Story = {
  render: () => (
    <div>
      <h2>Usage Examples</h2>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Padding Example</h3>
        <div
          style={{
            padding: 'var(--gl-spacing-0200)',
            backgroundColor: 'var(--gl-color-background-alternative)',
            borderRadius: '4px',
          }}
        >
          This box uses <code>padding: var(--gl-spacing-0200)</code> (20px)
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Margin Example</h3>
        <div
          style={{
            marginBottom: 'var(--gl-spacing-0100)',
            padding: 'var(--gl-spacing-0150)',
            backgroundColor: 'var(--gl-color-background-alternative)',
            borderRadius: '4px',
          }}
        >
          First element with <code>margin-bottom: var(--gl-spacing-0100)</code>
        </div>
        <div
          style={{
            padding: 'var(--gl-spacing-0150)',
            backgroundColor: 'var(--gl-color-background-alternative)',
            borderRadius: '4px',
          }}
        >
          Second element
        </div>
      </div>
      <div>
        <h3>Gap Example</h3>
        <div
          style={{
            display: 'flex',
            gap: 'var(--gl-spacing-0200)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              padding: 'var(--gl-spacing-0100)',
              backgroundColor: 'var(--gl-color-blue)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Item 1
          </div>
          <div
            style={{
              padding: 'var(--gl-spacing-0100)',
              backgroundColor: 'var(--gl-color-blue)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Item 2
          </div>
          <div
            style={{
              padding: 'var(--gl-spacing-0100)',
              backgroundColor: 'var(--gl-color-blue)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Item 3
          </div>
        </div>
      </div>
    </div>
  ),
};

