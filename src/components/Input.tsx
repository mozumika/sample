import { useFormContext } from "react-hook-form";

import styles from "./Input.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ name, ...props }: Props) => {
  const { register } = useFormContext();
  return (
    <input className={styles.input} {...register(name ?? "")} {...props} />
  );
};
