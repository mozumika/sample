import clsx from "clsx";

import styles from "./Button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: Props) => {
  return (
    <button
      className={clsx(styles.button, className ? styles[className] : "")}
      {...props}
    />
  );
};
