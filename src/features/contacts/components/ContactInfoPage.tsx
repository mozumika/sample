import { useNavigate } from "react-router-dom";
import { IconButton } from "../../../components/IconButton";
import { ContactInfoForm } from "./ContactInfoForm";

import styles from "./ContactInfoPage.module.scss";

export const ContactInfoPage = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/contacts");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <IconButton iconType="back" onClick={handleClickBack} />
      </header>
      <div className={styles.formArea}>
        <ContactInfoForm />
      </div>
    </div>
  );
};
