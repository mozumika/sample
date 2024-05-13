import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { FormProvider, useForm } from "react-hook-form";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input",
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <FormProvider {...useForm()}>
          <Story />
        </FormProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    name: "name",
  },
};

export const Focused: Story = {
  args: { ...Default.args },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("textbox").focus();
  },
};

export const Typed: Story = {
  args: { ...Default.args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await userEvent.type(input, "TEXT_TEXT_TEXT");
  },
};
