import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";

import { contactAtom, emptyContact } from "../atoms";
import { ContactInfoPage } from "./ContactInfoPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ContactInfoPage", () => {
  it("renders back button and contact info form", () => {
    const store = createStore();
    store.set(contactAtom, emptyContact);
    render(
      <Provider store={store}>
        <ContactInfoPage />
      </Provider>
    );
    expect(screen.getByLabelText("back").parentElement).not.toBeDisabled();
    expect(screen.getAllByRole("textbox").length).toBe(2);
  });

  it("fires back event", () => {
    render(<ContactInfoPage />);
    const backButton = screen.getByLabelText("back").parentElement;
    if (backButton) {
      fireEvent.click(backButton);
      expect(mockNavigate).toBeCalledWith("/contacts");
    }
  });
});
