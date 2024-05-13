import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";

import * as api from "../api";
import { contactAtom, emptyContact } from "../atoms";
import { Contact } from "../types/Contact";
import { contactList } from "../mockData";
import { ContactInfoForm } from "./ContactInfoForm";

type Props = {
  contact: Contact | null;
};

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const TestComponent = ({ contact }: Props) => {
  const store = createStore();
  store.set(contactAtom, contact);
  return (
    <Provider store={store}>
      <ContactInfoForm />
    </Provider>
  );
};

describe("ContactInfoForm", () => {
  it("renders labels, empty inputs and a button", () => {
    render(<TestComponent contact={emptyContact} />);
    expect(screen.getByLabelText("名前 :")).toBeInTheDocument();
    expect(screen.getByLabelText("TEL :")).toBeInTheDocument();
    const textBoxes = screen.getAllByRole("textbox");
    expect(textBoxes[0]).toHaveValue("");
    expect(textBoxes[1]).toHaveValue("");
    expect(screen.getByRole("button")).toHaveTextContent("OK");
  });

  it("renders inputs with text", () => {
    const contact = contactList[0];
    render(<TestComponent contact={contact} />);
    const textBoxes = screen.getAllByRole("textbox");
    expect(textBoxes[0]).toHaveValue(contact.name);
    expect(textBoxes[1]).toHaveValue(contact.phoneNumber);
  });

  it("calls create api", async () => {
    render(<TestComponent contact={emptyContact} />);
    const textBoxes = screen.getAllByRole("textbox");
    fireEvent.change(textBoxes[0], { target: { value: contactList[0].name } });
    fireEvent.change(textBoxes[1], {
      target: { value: contactList[0].phoneNumber },
    });
    const button = screen.getByRole("button");
    const createContactSpy = vi
      .spyOn(api, "createContact")
      .mockResolvedValue(contactList[0]);
    userEvent.click(button);

    await waitFor(() => {
      expect(createContactSpy).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/contacts");
    });
  });

  it("calls update api", async () => {
    const contact = contactList[0];
    render(<TestComponent contact={contact} />);
    const button = screen.getByRole("button");
    const updateContactSpy = vi.spyOn(api, "updateContact");
    userEvent.click(button);
    await waitFor(() => {
      expect(updateContactSpy).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/contacts");
    });
  });

  it("renders name error", async () => {
    render(<TestComponent contact={emptyContact} />);
    const textBoxes = screen.getAllByRole("textbox");
    fireEvent.change(textBoxes[1], {
      target: { value: contactList[0].phoneNumber },
    });
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("名前を入力してください")).toBeInTheDocument();
    });
  });

  it("renders phone number error", async () => {
    render(<TestComponent contact={emptyContact} />);
    const textBoxes = screen.getAllByRole("textbox");
    fireEvent.change(textBoxes[0], { target: { value: contactList[0].name } });
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText("携帯電話番号を入力してください")
      ).toBeInTheDocument();
    });
    fireEvent.change(textBoxes[1], { target: { value: "000-0000-0000" } });
    await waitFor(() => {
      expect(
        screen.getByText("携帯電話番号の形式が正しくありません")
      ).toBeInTheDocument();
    });
  });

  it("renderes nodata error", () => {
    render(<TestComponent contact={null} />);
    expect(screen.getByText("データが見つかりません")).toBeInTheDocument();
  });

  it("renders update error", async () => {
    const contact = contactList[0];
    render(<TestComponent contact={contact} />);
    const button = screen.getByRole("button");
    const updateContactSpy = vi
      .spyOn(api, "updateContact")
      .mockRejectedValue(new Error("errror"));
    userEvent.click(button);
    await waitFor(() => {
      expect(updateContactSpy).toHaveBeenCalled();
      expect(screen.getByText("更新に失敗しました")).toBeInTheDocument();
    });
  });
});
