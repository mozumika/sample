import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const WithoutText: Story = {};

export const WithLongText: Story = {
  args: {
    children: "aaaaaaaaaaaaaaaa",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
};
