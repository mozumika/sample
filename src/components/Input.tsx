import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import styles from "./Input.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, name, ...props }: Props) => {
  const { register } = useFormContext();
  return (
    <input
      className={clsx(styles.input, className)}
      {...register(name ?? "")}
      {...props}
    />
  );
};
