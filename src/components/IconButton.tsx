import React from "react";
import clsx from "clsx";
import { IconContext } from "react-icons";
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

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconType: keyof typeof iconTypes;
};

export const IconButton = ({ iconType, className, ...props }: Props) => {
  const Icon = iconTypes[iconType];

  return (
    <button type="button" {...props}>
      <IconContext.Provider value={{ className: clsx(styles.icon, className) }}>
        <Icon aria-label={iconType} />
      </IconContext.Provider>
    </button>
  );
};
