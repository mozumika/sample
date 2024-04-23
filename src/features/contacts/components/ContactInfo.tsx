import { Contacts } from "../types/Contacts";

export const ContactInfo = ({ id, name, phoneNumber }: Contacts) => {
  return (
    <ul>
      <li>{id}</li>
      <li>{name}</li>
      <li>{phoneNumber}</li>
    </ul>
  );
};
