import { atom, useAtom, useSetAtom } from "jotai";

import { useGetContacts } from "../api/getContacts";
import { contactAtom, emptyContact, workingAtom } from "../atoms";
import { ContactInfo } from "./ContactInfo";
import { ContactInfoModal } from "./ContactInfoModal";
import { IconButton } from "../../../components/IconButton";
import { Contact } from "../types/Contact";

import styles from "./ContactList.module.scss";

const modalAtom = atom(false);

export const ContactList = () => {
  const { data, status } = useGetContacts();

  const [isModalOpen, setModalOpen] = useAtom(modalAtom);
  const [isWorking] = useAtom(workingAtom); // TODO setWorkingの実装
  const setCurrentContact = useSetAtom(contactAtom);

  const handleClickAdd = () => {
    setCurrentContact(emptyContact);
    setModalOpen(true);
  };

  const handleClickEdit = (contact: Contact) => {
    setCurrentContact(contact);
    setModalOpen(true);
  };

  const handleClickDelete = (id: string) => {
    console.log(`delete ${id}`); // TODO Delete
    // TODO 削除中はisWorking===trueにする
    // TODO 処理が終わったらデータを再取得
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleExecuteForm = (contact: Contact) => {
    if (!contact.id) {
      console.log(`add ${JSON.stringify(contact)}`); // TODO Add
    } else {
      console.log(`update ${JSON.stringify(contact)}`); // TODO Update
    }
    // TODO 新規登録中、更新中はisWorking===trueにする
    // TODO 処理が終わったらデータを再取得
    closeModal();
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
              disabled={isWorking}
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
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                  />
                ))}
              </ol>
            )}
          </div>
        </main>
      </div>
      {isModalOpen && (
        <ContactInfoModal
          handleExecuteForm={handleExecuteForm}
          handleClickCancel={closeModal}
        />
      )}
    </>
  );
};
