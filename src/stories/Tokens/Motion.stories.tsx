import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'Design Tokens/Motion',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Motion tokens define animation durations and easing functions for consistent animations throughout the design system.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const motionTokens = {
  'Duration': [
    '--gl-motion-duration-none',
    '--gl-motion-duration',
    '--gl-motion-duration-slow',
    '--gl-motion-duration-all',
    '--gl-motion-duration-transform',
    '--gl-motion-duration-opacity',
  ],
  'Easing': [
    '--gl-motion-easing',
    '--gl-motion-easing-all',
    '--gl-motion-easing-transform',
    '--gl-motion-easing-textcolor',
    '--gl-motion-easing-backgroundcolor',
    '--gl-motion-easing-opacity',
  ],
};

const MotionTokenDisplay = ({ token }: { token: string }) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  
  return (
    <div style={{ marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '0.25rem' }}>
        {token}
      </div>
      <div style={{ fontSize: '11px', color: '#666' }}>{value || 'N/A'}</div>
    </div>
  );
};

export const MotionTokens: Story = {
  render: () => (
    <div>
      <h2>Motion Tokens</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>Duration Tokens</h3>
          {motionTokens['Duration'].map((token) => (
            <MotionTokenDisplay key={token} token={token} />
          ))}
        </div>
        <div>
          <h3>Easing Tokens</h3>
          {motionTokens['Easing'].map((token) => (
            <MotionTokenDisplay key={token} token={token} />
          ))}
        </div>
      </div>
    </div>
  ),
};

const AnimatedBox = ({ duration, easing }: { duration: string; easing: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '150px',
        height: '150px',
        backgroundColor: isHovered ? 'var(--gl-color-blue)' : 'var(--gl-color-grey-400)',
        borderRadius: '8px',
        transition: `background-color ${duration} ${easing}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      Hover me
    </div>
  );
};

export const MotionExamples: Story = {
  render: () => {
    const duration = getComputedStyle(document.documentElement)
      .getPropertyValue('--gl-motion-duration')
      .trim();
    const easing = getComputedStyle(document.documentElement)
      .getPropertyValue('--gl-motion-easing')
      .trim();
    
    return (
      <div>
        <h2>Motion Examples</h2>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Hover over the boxes to see animations using motion tokens.
        </p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h3>Standard Duration & Easing</h3>
            <AnimatedBox 
              duration={duration || '0.3s'} 
              easing={easing || 'cubic-bezier(0.3, 0, 0, 1)'} 
            />
          </div>
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Usage in CSS</h3>
          <pre style={{ fontSize: '12px', margin: 0 }}>
{`.element {
  transition: background-color var(--gl-motion-duration) var(--gl-motion-easing);
}`}
          </pre>
        </div>
      </div>
    );
  },
};

