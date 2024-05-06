import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const editButton = canvas.getByLabelText("edit").parentElement;
    const deleteButton = canvas.getByLabelText("delete").parentElement;
    if (editButton) {
      await userEvent.click(editButton);
      await expect(args.onEdit).toHaveBeenCalled();
    }
    if (deleteButton) {
      await userEvent.click(deleteButton);
      await expect(args.onDelete).toHaveBeenCalled();
    }
  },
};

export const Working: Story = {
  args: { ...Default.args, isWorking: true },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editButton = canvas.getByLabelText("edit").parentElement;
    const deleteButton = canvas.getByLabelText("delete").parentElement;
    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  },
};
