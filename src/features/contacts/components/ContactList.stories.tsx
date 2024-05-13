import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";

import { delay, http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ContactList } from "./ContactList";
import { contactList, maxContactList } from "../mockData";

const meta: Meta<typeof ContactList> = {
  component: ContactList,
  title: "ContactList",
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/contacts"]}>
            <Story />
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ContactList>;

const baseUrl = import.meta.env.VITE_BASE_URL;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${baseUrl}/api/contacts`, () => {
          return HttpResponse.json(contactList);
        }),
        http.delete(`${baseUrl}/api/contacts/*`, () => {
          return new HttpResponse(null, { status: 204 });
        }),
      ],
    },
  },
};

export const Fetching: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${baseUrl}/api/contacts`, async () => {
          return await delay("infinite");
        }),
      ],
    },
  },
};

export const FetchError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${baseUrl}/api/contacts`, () => {
          return new HttpResponse(null, { status: 400 });
        }),
      ],
    },
  },
};

export const Working: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${baseUrl}/api/contacts`, () => {
          return HttpResponse.json(contactList);
        }),
        http.delete(`${baseUrl}/api/contacts/*`, async () => {
          return await delay("infinite");
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      const deleteButton = canvas.getAllByLabelText("delete")[0].parentElement;
      if (deleteButton) {
        await userEvent.click(deleteButton);
      }
    });
  },
};

export const MaxContacts: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${baseUrl}/api/contacts`, () => {
          return HttpResponse.json(maxContactList);
        }),
        http.delete(`${baseUrl}/api/contacts/*`, () => {
          return new HttpResponse(null, { status: 204 });
        }),
      ],
    },
  },
};
