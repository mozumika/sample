import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import { useGetContacts, useDeleteContact } from "../api";
import { contactAtom, emptyContact } from "../atoms";
import { ContactInfo } from "./ContactInfo";
import { IconButton } from "../../../components/IconButton";
import { Contact } from "../types/Contact";

import styles from "./ContactList.module.scss";

const MAX_CONTACTS = 20;

export const ContactList = () => {
  const { data, status } = useGetContacts();

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
    deleteContactMutation.mutate(id, {
      onError: () => alert("データ削除に失敗しました"),
    });
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
              disabled={
                deleteContactMutation.isPending ||
                (data && data.length >= MAX_CONTACTS)
              }
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
                    isWorking={deleteContactMutation.isPending}
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
