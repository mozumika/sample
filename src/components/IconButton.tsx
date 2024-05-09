import React from "react";
import clsx from "clsx";
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import styles from "./IconButton.module.scss";

const iconTypes = {
  add: AiOutlinePlusCircle,
  edit: AiOutlineEdit,
  delete: AiOutlineDelete,
  back: AiOutlineArrowLeft,
};

const sizeClasses = {
  sm: "icon-small",
  md: "icon-medium",
  lg: "icon-large",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconType: keyof typeof iconTypes;
  size?: keyof typeof sizeClasses;
};

export const IconButton = ({ iconType, size = "md", ...props }: Props) => {
  const Icon = iconTypes[iconType];

  return (
    <button type="button" {...props}>
      <Icon
        className={clsx(styles.icon, styles[sizeClasses[size]])}
        aria-label={iconType}
      />
    </button>
  );
};
