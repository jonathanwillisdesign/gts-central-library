import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography tokens define font families, sizes, weights, line heights, and letter spacing for consistent text styling throughout the design system.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TypographyExample = ({ 
  label, 
  familyToken, 
  sizeToken, 
  weightToken, 
  lineHeightToken 
}: { 
  label: string;
  familyToken: string;
  sizeToken: string;
  weightToken: string;
  lineHeightToken: string;
}) => {
  const family = getComputedStyle(document.documentElement)
    .getPropertyValue(familyToken)
    .trim();
  const size = getComputedStyle(document.documentElement)
    .getPropertyValue(sizeToken)
    .trim();
  const weight = getComputedStyle(document.documentElement)
    .getPropertyValue(weightToken)
    .trim();
  const lineHeight = getComputedStyle(document.documentElement)
    .getPropertyValue(lineHeightToken)
    .trim();
  
  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: family || 'inherit',
          fontSize: size || 'inherit',
          fontWeight: weight || 'normal',
          lineHeight: lineHeight || 'normal',
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div style={{ fontSize: '11px', color: '#999', marginTop: '0.5rem' }}>
        Family: {familyToken} | Size: {sizeToken} ({size}) | Weight: {weightToken} ({weight}) | Line Height: {lineHeightToken} ({lineHeight})
      </div>
    </div>
  );
};

export const BodyTypography: Story = {
  render: () => (
    <div>
      <h2>Body Typography</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Body font sets for functional text content.
      </p>
      <TypographyExample
        label="Body Functional 1 (12px, Regular)"
        familyToken="--gl-body-font-set-family-functional-1"
        sizeToken="--gl-body-font-set-size-functional-1"
        weightToken="--gl-body-font-set-weight-functional-1"
        lineHeightToken="--gl-body-font-set-lineheight-functional-1"
      />
      <TypographyExample
        label="Body Functional 2 (12px, Medium)"
        familyToken="--gl-body-font-set-family-functional-2"
        sizeToken="--gl-body-font-set-size-functional-2"
        weightToken="--gl-body-font-set-weight-functional-2"
        lineHeightToken="--gl-body-font-set-lineheight-functional-2"
      />
      <TypographyExample
        label="Body Functional 4 (14px, Regular)"
        familyToken="--gl-body-font-set-family-functional-4"
        sizeToken="--gl-body-font-set-size-functional-4"
        weightToken="--gl-body-font-set-weight-functional-4"
        lineHeightToken="--gl-body-font-set-lineheight-functional-4"
      />
    </div>
  ),
};

export const HeadingTypography: Story = {
  render: () => (
    <div>
      <h2>Heading Typography</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Heading font sets for titles and headings.
      </p>
      <TypographyExample
        label="Heading Functional 1"
        familyToken="--gl-heading-font-set-family-functional-1"
        sizeToken="--gl-heading-font-set-size-functional-1"
        weightToken="--gl-heading-font-set-weight-functional-1"
        lineHeightToken="--gl-heading-font-set-lineheight-functional-1"
      />
      <TypographyExample
        label="Heading Functional 2"
        familyToken="--gl-heading-font-set-family-functional-2"
        sizeToken="--gl-heading-font-set-size-functional-2"
        weightToken="--gl-heading-font-set-weight-functional-2"
        lineHeightToken="--gl-heading-font-set-lineheight-functional-2"
      />
    </div>
  ),
};

export const TypographyUsage: Story = {
  render: () => (
    <div>
      <h2>Usage Examples</h2>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Using Typography Tokens</h3>
        <div
          style={{
            fontFamily: 'var(--gl-body-font-set-family-functional-4)',
            fontSize: 'var(--gl-body-font-set-size-functional-4)',
            fontWeight: 'var(--gl-body-font-set-weight-functional-4)',
            lineHeight: 'var(--gl-body-font-set-lineheight-functional-4)',
            color: 'var(--gl-color-text)',
            marginBottom: '1rem',
          }}
        >
          This paragraph uses body functional 4 tokens for consistent typography.
        </div>
        <div
          style={{
            fontFamily: 'var(--gl-heading-font-set-family-functional-1)',
            fontSize: 'var(--gl-heading-font-set-size-functional-1)',
            fontWeight: 'var(--gl-heading-font-set-weight-functional-1)',
            lineHeight: 'var(--gl-heading-font-set-lineheight-functional-1)',
            color: 'var(--gl-color-text)',
            marginBottom: '1rem',
          }}
        >
          This is a heading using heading functional 1 tokens.
        </div>
      </div>
    </div>
  ),
};

