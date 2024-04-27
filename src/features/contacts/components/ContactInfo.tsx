import { Contact } from "../types/Contact";

import { workingAtom } from "../atoms";
import { useAtomValue } from "jotai";

import styles from "./ContactInfo.module.scss";
import { IconButton } from "../../../components/IconButton";

type Props = {
  contact: Contact;
  handleClickEdit: (contact: Contact) => void;
  handleClickDelete: (id: string) => void;
};

export const ContactInfo = ({
  contact,
  handleClickEdit,
  handleClickDelete,
}: Props) => {
  const isWorking = useAtomValue(workingAtom);

  return (
    <li className={styles.card}>
      <div className={styles.contentArea}>
        <span className={styles.name}>{contact.name}</span>
        <span className={styles.info}>{contact.phoneNumber}</span>
      </div>
      <div className={styles.buttonArea}>
        <IconButton
          iconType="edit"
          onClick={() => handleClickEdit(contact)}
          disabled={isWorking}
        />
        <IconButton
          iconType="delete"
          onClick={() => handleClickDelete(contact.id)}
          disabled={isWorking}
        />
      </div>
    </li>
  );
};
