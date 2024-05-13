import clsx from "clsx";

import styles from "./Button.module.scss";

const sizeClasses = {
  sm: "button-small",
  md: "button-medium",
  lg: "button-large",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizeClasses;
};

export const Button = ({ size = "md", ...props }: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[sizeClasses[size]])}
      {...props}
    />
  );
};
