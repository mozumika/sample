import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "IconButton",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Add: Story = {
  args: {
    iconType: "add",
  },
};

export const Edit: Story = {
  args: {
    iconType: "edit",
  },
};
export const Delete: Story = {
  args: {
    iconType: "delete",
  },
};

export const Small: Story = {
  args: {
    ...Add.args,
    className: "icon-small",
  },
};

export const Large: Story = {
  args: {
    ...Add.args,
    className: "icon-large",
  },
};
