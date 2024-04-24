import { useGetContacts } from "../api/getContacts";
import { ContactInfo } from "./ContactInfo";

export const ContactList = () => {
  const { data, status } = useGetContacts();

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <ol>
      {data.map((contact) => (
        <li key={contact.id}>
          <ContactInfo contact={contact} />
        </li>
      ))}
    </ol>
  );
};
