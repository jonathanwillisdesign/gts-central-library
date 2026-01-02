import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design Tokens/Shadows',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shadow tokens define text shadows for web and app contexts.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const shadowTokens = [
  '--gl-web-shadow-textshadow-1',
  '--gl-web-shadow-textshadow-inverse-1',
  '--gl-app-shadow-textshadow-inverse-1',
];

const ShadowExample = ({ token }: { token: string }) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  
  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>
        {token}
      </div>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: value || 'none',
          color: token.includes('inverse') ? '#fff' : '#000',
          backgroundColor: token.includes('inverse') ? '#000' : 'transparent',
          padding: token.includes('inverse') ? '1rem' : '0',
          borderRadius: '4px',
        }}
      >
        Text with {token}
      </div>
      <div style={{ fontSize: '11px', color: '#999', marginTop: '0.5rem' }}>
        Value: {value || 'N/A'}
      </div>
    </div>
  );
};

export const TextShadows: Story = {
  render: () => (
    <div>
      <h2>Text Shadow Tokens</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Text shadow tokens provide consistent text shadows for web and app contexts.
      </p>
      {shadowTokens.map((token) => (
        <ShadowExample key={token} token={token} />
      ))}
    </div>
  ),
};

export const ShadowUsage: Story = {
  render: () => (
    <div>
      <h2>Usage Examples</h2>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Web Text Shadow</h3>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textShadow: 'var(--gl-web-shadow-textshadow-1)',
            marginBottom: '1rem',
          }}
        >
          Heading with web text shadow
        </div>
        <pre style={{ fontSize: '12px', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', margin: 0 }}>
{`.heading {
  text-shadow: var(--gl-web-shadow-textshadow-1);
}`}
        </pre>
      </div>
      <div>
        <h3>Inverse Text Shadow</h3>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textShadow: 'var(--gl-web-shadow-textshadow-inverse-1)',
            color: '#fff',
            backgroundColor: '#000',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          Heading with inverse text shadow
        </div>
        <pre style={{ fontSize: '12px', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', margin: 0 }}>
{`.heading-inverse {
  text-shadow: var(--gl-web-shadow-textshadow-inverse-1);
}`}
        </pre>
      </div>
    </div>
  ),
};

