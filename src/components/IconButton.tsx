import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import styles from "./IconButton.module.scss";

type Props = {
  iconType: "add" | "edit" | "delete";
  disabled: boolean;
  onClick: () => void;
};

const iconTypes = {
  add: AiOutlinePlusCircle,
  edit: AiOutlineEdit,
  delete: AiOutlineDelete,
};

export const IconButton = ({ iconType, disabled, onClick }: Props) => {
  const Icon = iconTypes[iconType];

  return (
    <Icon
      className={`${styles.icon} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      aria-label={iconType}
    />
  );
};
