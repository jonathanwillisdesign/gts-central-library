import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";

const meta = {
  title: "Design Tokens/Motion",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Motion tokens define animation durations and easing functions for consistent animations throughout the design system.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Animated box that moves back and forth to demonstrate duration
const DurationDemo = ({
  label,
  duration,
  easing,
}: {
  label: string;
  duration: string;
  easing: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "14px" }}>{label}</span>
        <span style={{ fontSize: "12px", color: "#666" }}>{duration}</span>
      </div>
      <div
        style={{
          position: "relative",
          height: "48px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: isAnimating ? "calc(100% - 72px)" : "8px",
            width: "64px",
            height: "32px",
            backgroundColor: "#000",
            borderRadius: "4px",
            transition: `left ${duration} ${easing}`,
          }}
        />
      </div>
    </div>
  );
};

export const Duration: Story = {
  name: "Duration",
  render: () => (
    <div>
      <h2 style={{ marginBottom: "0.5rem" }}>Duration</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Animation duration tokens. Watch the elements move to compare speeds.
      </p>

      <DurationDemo
        label="--gl-motion-duration-none"
        duration="0s"
        easing="cubic-bezier(0.3, 0, 0, 1)"
      />
      <DurationDemo
        label="--gl-motion-duration"
        duration="0.3s"
        easing="cubic-bezier(0.3, 0, 0, 1)"
      />
      <DurationDemo
        label="--gl-motion-duration-slow"
        duration="0.7s"
        easing="cubic-bezier(0.3, 0, 0, 1)"
      />
      <DurationDemo
        label="--gl-animation-motion-duration-loading-shimmer"
        duration="2s"
        easing="cubic-bezier(0.3, 0, 0, 1)"
      />
    </div>
  ),
};

// Easing comparison demo
const EasingDemo = ({
  label,
  easing,
}: {
  label: string;
  easing: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "14px" }}>{label}</span>
        <span style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}>{easing}</span>
      </div>
      <div
        style={{
          position: "relative",
          height: "48px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: isAnimating ? "calc(100% - 72px)" : "8px",
            width: "64px",
            height: "32px",
            backgroundColor: "#000",
            borderRadius: "4px",
            transition: `left 0.5s ${easing}`,
          }}
        />
      </div>
    </div>
  );
};

export const Easing: Story = {
  name: "Easing",
  render: () => (
    <div>
      <h2 style={{ marginBottom: "0.5rem" }}>Easing</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        The standard easing curve used throughout the design system.
      </p>

      <EasingDemo
        label="--gl-motion-easing"
        easing="cubic-bezier(0.3, 0, 0, 1)"
      />
      <EasingDemo
        label="Linear (for comparison)"
        easing="linear"
      />
      <EasingDemo
        label="Ease (for comparison)"
        easing="ease"
      />
    </div>
  ),
};
