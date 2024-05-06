import type { Meta, StoryObj } from "@storybook/react";
import { Provider, createStore } from "jotai";
import { MemoryRouter } from "react-router-dom";

import { ContactInfoPage } from "./ContactInfoPage";
import { contactAtom, emptyContact } from "../atoms";

const meta: Meta<typeof ContactInfoPage> = {
  component: ContactInfoPage,
  title: "ContactInfoPage",
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const store = createStore();
      store.set(contactAtom, emptyContact);
      return (
        <Provider store={store}>
          <MemoryRouter initialEntries={["/contacts/edit"]}>
            <Story />
          </MemoryRouter>
        </Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ContactInfoPage>;

export const Default: Story = {};
