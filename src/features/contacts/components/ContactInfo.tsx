import { Contact } from "../types/Contact";

type Props = {
  contact: Contact;
};

export const ContactInfo = ({ contact }: Props) => {
  return (
    <ul>
      <li>{contact.id}</li>
      <li>{contact.name}</li>
      <li>{contact.phoneNumber}</li>
    </ul>
  );
};
