import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qLixniaoEYTPiEcS373zEn/GTS-Central-Library-v2?node-id=4545-138351",
    },
    docs: {
      description: {
        component:
          "Button component following the adidas Locker Room design system. Supports primary, secondary, and tertiary variants with base and destructive modes. Interactive states (hover, pressed, focused) are handled by CSS and should not be shown as separate stories.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["base", "destructive"],
      description: "Button mode",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Button variant",
    },
    state: {
      control: "select",
      options: ["default", "loading", "disabled"],
      description:
        "Button state (interactive states like hover/pressed are handled by CSS)",
    },
    label: {
      control: "text",
      description: "Button label",
    },
    showArrow: {
      control: "boolean",
      description: "Show arrow icon",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Call to action",
    mode: "base",
    variant: "primary",
    state: "default",
  },
};

export const Secondary: Story = {
  args: {
    label: "Call to action",
    mode: "base",
    variant: "secondary",
    state: "default",
  },
};

export const Tertiary: Story = {
  args: {
    label: "Call to action",
    mode: "base",
    variant: "tertiary",
    state: "default",
  },
};

export const Destructive: Story = {
  args: {
    label: "Call to action",
    mode: "destructive",
    variant: "primary",
    state: "default",
  },
};

export const Loading: Story = {
  args: {
    label: "Call to action",
    mode: "base",
    variant: "primary",
    state: "loading",
  },
};
