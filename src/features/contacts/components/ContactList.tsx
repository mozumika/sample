import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";

import { useGetContacts } from "../api/getContacts";
import { useDeleteContact } from "../api/deleteContact";
import { contactAtom, emptyContact, workingAtom } from "../atoms";
import { ContactInfo } from "./ContactInfo";
import { IconButton } from "../../../components/IconButton";
import { Contact } from "../types/Contact";

import styles from "./ContactList.module.scss";

const MAX_CONTACTS = 20;

export const ContactList = () => {
  const { data, status } = useGetContacts();

  const [isWorking, setWorking] = useAtom(workingAtom);
  const setCurrentContact = useSetAtom(contactAtom);
  const deleteContactMutation = useDeleteContact();
  const navigate = useNavigate();

  const handleClickAdd = () => {
    setCurrentContact(emptyContact);
    navigate("/contacts/edit");
  };

  const handleClickEdit = (contact: Contact) => {
    setCurrentContact(contact);
    navigate("/contacts/edit");
  };

  const handleClickDelete = (id: string) => {
    setWorking(true);
    deleteContactMutation.mutate(id, { onSettled: () => setWorking(false) });
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>連絡先</h1>
        </header>
        <main>
          <div className={styles.buttonArea}>
            <IconButton
              iconType="add"
              onClick={handleClickAdd}
              disabled={isWorking || (data && data.length >= MAX_CONTACTS)}
            />
          </div>
          <div className={styles.contactList}>
            {status === "pending" && (
              <span className={styles.message}>読み込み中...</span>
            )}
            {status === "error" && (
              <span className={styles.message}>データ取得に失敗しました</span>
            )}
            {status === "success" && (
              <ol>
                {data.map((contact) => (
                  <ContactInfo
                    key={contact.id}
                    contact={contact}
                    onEdit={handleClickEdit}
                    onDelete={handleClickDelete}
                  />
                ))}
              </ol>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
