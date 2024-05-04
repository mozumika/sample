import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";

import { createContact, updateContact } from "../api";
import { contactAtom } from "../atoms";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import styles from "./ContactInfoForm.module.scss";

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

export const ContactInfoForm = () => {
  const nameId = useId();
  const phoneNumberId = useId();
  const contact = useAtomValue(contactAtom);
  const navigate = useNavigate();

  const methods = useForm<ContactInfoFormSchemaType>({
    resolver: zodResolver(contactInfoFormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<ContactInfoFormSchemaType> = (data) => {
    const submitData = { ...data, id: contact?.id ?? "" };
    const submitPromise = submitData.id
      ? updateContact(submitData)
      : createContact(submitData);
    submitPromise
      .then(() => {
        navigate("/contacts");
      })
      .catch(() => {
        setError("root.common", { type: "common" });
      });
  };

  if (!contact) {
    return (
      <div className={styles.errorMessage}>
        <span>データが見つかりません</span>
      </div>
    );
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <main className={styles.main}>
            <div className={styles.formItem}>
              <label htmlFor={`${nameId}-input`}>名前 : </label>
              <div>
                <Input
                  maxLength={50}
                  defaultValue={contact.name}
                  name="name"
                  id={`${nameId}-input`}
                  aria-describedby={`${nameId}-errorMessage`}
                />
                {errors.name && (
                  <p id={`${nameId}-errorMessage`}>{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className={styles.formItem}>
              <label htmlFor={`${phoneNumberId}-input`}>TEL : </label>
              <div>
                <Input
                  maxLength={13}
                  defaultValue={contact.phoneNumber}
                  name="phoneNumber"
                  id={`${phoneNumberId}-input`}
                  aria-describedby={`${phoneNumberId}-errorMessage`}
                ></Input>
                {errors.phoneNumber && (
                  <p id={`${phoneNumberId}-errorMessage`}>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </main>
          <footer className={styles.footer}>
            <Button type="submit" disabled={isSubmitting}>
              OK
            </Button>
          </footer>
          {errors.root?.common && (
            <div className={styles.errorMessage}>
              <span>更新に失敗しました</span>
            </div>
          )}
        </form>
      </FormProvider>
    </>
  );
};
