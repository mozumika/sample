import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ContactInfo } from "./ContactInfo";
import { contactList } from "../mockData";

const meta: Meta<typeof ContactInfo> = {
  component: ContactInfo,
  title: "ContactInfo",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContactInfo>;

export const Default: Story = {
  args: {
    contact: contactList[0],
    isWorking: false,
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const Working: Story = {
  args: { ...Default.args, isWorking: true },
};
