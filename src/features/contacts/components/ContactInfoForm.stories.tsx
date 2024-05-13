import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Provider, createStore } from "jotai";
import { MemoryRouter } from "react-router-dom";

import { ContactInfoForm } from "./ContactInfoForm";
import { contactAtom, emptyContact } from "../atoms";

const meta: Meta<typeof ContactInfoForm> = {
  component: ContactInfoForm,
  title: "ContactInfoForm",
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={["/contacts/edit"]}>
          <Story />
        </MemoryRouter>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ContactInfoForm>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const store = createStore();
      store.set(contactAtom, emptyContact);
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textboxes = canvas.getAllByRole("textbox");
    const nameTextBox = textboxes[0];
    const phoneNumberTextBox = textboxes[1];
    await userEvent.type(nameTextBox, "新規登録者の名前");
    await userEvent.type(phoneNumberTextBox, "080-1111-1111");
  },
};

export const NameError: Story = {
  decorators: Default.decorators,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textboxes = canvas.getAllByRole("textbox");
    const phoneNumberTextBox = textboxes[1];
    const okButton = canvas.getByRole("button");
    await userEvent.type(phoneNumberTextBox, "080-1111-1111");
    await userEvent.click(okButton);
  },
};

export const PhoneNumberErrror: Story = {
  decorators: Default.decorators,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textboxes = canvas.getAllByRole("textbox");
    const nameTextBox = textboxes[0];
    const phoneNumberTextBox = textboxes[1];
    const okButton = canvas.getByRole("button");
    await userEvent.type(nameTextBox, "新規登録者の名前");
    await userEvent.type(phoneNumberTextBox, "000-0000-0000");
    await userEvent.click(okButton);
  },
};

export const NoData: Story = {};
