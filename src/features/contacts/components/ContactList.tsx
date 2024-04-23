import { useGetContacts } from "../api/getContacts";
import { ContactInfo } from "./ContactInfo";

export const ContactList = () => {
  const { data } = useGetContacts();

  return data?.map((info) => {
    return (
      <ContactInfo
        key={info.id}
        id={info.id}
        name={info.name}
        phoneNumber={info.phoneNumber}
      />
    );
  });
};
