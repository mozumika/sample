import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { delay, http, HttpResponse } from "msw";

import * as api from "../api";
import { server } from "../../../lib/msw";
import { contactList, maxContactList } from "../mockData";
import { ContactList } from "./ContactList";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

window.alert = vi.fn();

describe("ContactList", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        retry: false,
      },
    },
  });
  const TestComponent = () => (
    <QueryClientProvider client={queryClient}>
      <ContactList />
    </QueryClientProvider>
  );

  const baseUrl = import.meta.env.VITE_BASE_URL;

  afterEach(() => {
    queryClient.clear();
  });

  it("renders title and list", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(contactList);
      })
    );
    render(<TestComponent />);
    expect(screen.getByRole("heading")).toHaveTextContent("連絡先");
    await waitFor(() => {
      expect(screen.getAllByRole("listitem").length).toBe(contactList.length);
    });
  });

  it("renders pending message", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, async () => {
        return await delay("infinite");
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.getByText("読み込み中...")).toBeInTheDocument();
    });
  });

  it("renders error message", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    ),
      render(<TestComponent />);
    await waitFor(() => {
      expect(screen.getByText("データ取得に失敗しました")).toBeInTheDocument();
    });
  });

  it("renders disabled buttons when isWorking is true", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(contactList);
      }),
      http.delete(`${baseUrl}/api/contacts/*`, async () => {
        return await delay("infinite");
      })
    );
    render(<TestComponent />);
    await waitFor(async () => {
      const addButton = screen.getByLabelText("add").parentElement;
      const editButton = screen.getAllByLabelText("edit")[0].parentElement;
      const deleteButton = screen.getAllByLabelText("delete")[0].parentElement;
      if (deleteButton) {
        userEvent.click(deleteButton);
        await waitFor(() => {
          expect(addButton).toBeDisabled();
          expect(editButton).toBeDisabled();
          expect(deleteButton).toBeDisabled();
        });
      }
    });
  });

  it("renders a disabled button when the number of contacts exceeds limit", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(maxContactList);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      const addButton = screen.getByLabelText("add").parentElement;
      expect(addButton).toBeDisabled();
    });
  });

  it("fires add event", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(contactList);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      const addButton = screen.getByLabelText("add").parentElement;
      if (addButton) {
        userEvent.click(addButton);
        expect(mockNavigate).toBeCalledWith("/contacts/edit");
      }
    });
  });

  it("fires edit event", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(contactList);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      const editButton = screen.getAllByLabelText("edit")[0].parentElement;
      if (editButton) {
        userEvent.click(editButton);
        expect(mockNavigate).toBeCalledWith("/contacts/edit");
      }
    });
  });

  it("fires delete event", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(contactList);
      }),
      http.delete(`${baseUrl}/api/contacts/*`, () => {
        return new HttpResponse(null, { status: 204 });
      })
    );
    render(<TestComponent />);
    await waitFor(async () => {
      expect(screen.getAllByRole("listitem").length).toBe(contactList.length);
      const deleteButton = screen.getAllByLabelText("delete")[0].parentElement;
      const deleteContactSpy = vi.spyOn(api, "useDeleteContact");
      if (deleteButton) {
        userEvent.click(deleteButton);
        await waitFor(() => {
          expect(deleteContactSpy).toBeCalled();
        });
      }
    });
  });

  it("fires delete event : error", async () => {
    server.use(
      http.get(`${baseUrl}/api/contacts`, () => {
        return HttpResponse.json(contactList);
      }),
      http.delete(`${baseUrl}/api/contacts/*`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    render(<TestComponent />);
    await waitFor(async () => {
      const deleteButton = screen.getAllByLabelText("delete")[0].parentElement;
      if (deleteButton) {
        userEvent.click(deleteButton);
        await waitFor(() => {
          expect(window.alert).toHaveBeenCalledWith("データ削除に失敗しました");
        });
      }
    });
  });
});
