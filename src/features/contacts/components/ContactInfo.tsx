import { Contact } from "../types/Contact";

import styles from "./ContactInfo.module.scss";
import { IconButton } from "../../../components/IconButton";

type Props = {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  isWorking: boolean;
};

export const ContactInfo = ({
  contact,
  onEdit,
  onDelete,
  isWorking,
}: Props) => {
  return (
    <li className={styles.card}>
      <div className={styles.contentArea}>
        <span className={styles.name}>{contact.name}</span>
        <span className={styles.info}>{contact.phoneNumber}</span>
      </div>
      <div className={styles.buttonArea}>
        <IconButton
          iconType="edit"
          onClick={() => onEdit(contact)}
          disabled={isWorking}
        />
        <IconButton
          iconType="delete"
          onClick={() => onDelete(contact.id)}
          disabled={isWorking}
        />
      </div>
    </li>
  );
};
