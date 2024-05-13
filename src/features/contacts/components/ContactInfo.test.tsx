import { render, screen } from "@testing-library/react";

import { ContactInfo } from "./ContactInfo";
import { contactList } from "../mockData";

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe("ContactInfo Component", () => {
  it("renders name, phone number and buttons", () => {
    render(
      <ContactInfo
        contact={contactList[0]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isWorking={false}
      />
    );

    expect(screen.getByText(contactList[0].name)).toBeInTheDocument();
    expect(screen.getByText(contactList[0].phoneNumber)).toBeInTheDocument();
    expect(screen.getByLabelText("edit").parentElement).not.toBeDisabled();
    expect(screen.getByLabelText("delete").parentElement).not.toBeDisabled();
  });

  it("renders disabled buttons", () => {
    render(
      <ContactInfo
        contact={contactList[0]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isWorking={true}
      />
    );
    expect(screen.getByLabelText("edit").parentElement).toBeDisabled();
    expect(screen.getByLabelText("delete").parentElement).toBeDisabled();
  });

  it("fires edit event", () => {
    render(
      <ContactInfo
        contact={contactList[0]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isWorking={false}
      />
    );
    const editButton = screen.getByLabelText("edit").parentElement;
    if (editButton) {
      editButton.click();
      expect(mockOnEdit).toHaveBeenCalled();
    }
  });

  it("fires delete event", () => {
    render(
      <ContactInfo
        contact={contactList[0]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isWorking={false}
      />
    );

    const deleteButton = screen.getByLabelText("delete").parentElement;
    if (deleteButton) {
      deleteButton.click();
      expect(mockOnDelete).toHaveBeenCalled();
    }
  });
});
