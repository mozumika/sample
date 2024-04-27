import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";

import { contactAtom, workingAtom } from "../atoms";
import { Contact } from "../types/Contact";

import styles from "./ContactInfoModal.module.scss";

type Props = {
  handleExecuteForm: (contact: Contact) => void;
  handleClickCancel: () => void;
};

const contactInfoFormSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  phoneNumber: z
    .string()
    .min(1, { message: "携帯電話番号を入力してください" })
    .regex(/^0[789]0-[0-9]{4}-[0-9]{4}$/, {
      message: "携帯電話番号の形式が正しくありません",
    }),
});

type ContactInfoFormSchemaType = z.infer<typeof contactInfoFormSchema>;

export const ContactInfoModal = ({
  handleExecuteForm: handleExecute,
  handleClickCancel: handleCancel,
}: Props) => {
  const contact = useAtomValue(contactAtom);
  const isWorking = useAtomValue(workingAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoFormSchemaType>({
    resolver: zodResolver(contactInfoFormSchema),
  });

  const onSubmit: SubmitHandler<ContactInfoFormSchemaType> = (data) => {
    handleExecute({ ...data, id: contact.id });
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
        <main className={styles.main}>
          <div className={styles.formItem}>
            <label>名前 : </label>
            <div>
              <input
                maxLength={50}
                defaultValue={contact.name}
                {...register("name")}
              ></input>
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className={styles.formItem}>
            <label>TEL : </label>
            <div>
              <input
                maxLength={13}
                defaultValue={contact.phoneNumber}
                {...register("phoneNumber")}
              ></input>
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <button className={styles.button} type="submit" disabled={isWorking}>
            OK
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleCancel}
            disabled={isWorking}
          >
            キャンセル
          </button>
        </footer>
      </form>
    </div>
  );
};
