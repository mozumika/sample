import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue } from "jotai";

import { useCreateContact } from "../api/createContact";
import { useUpdateContact } from "../api/updateContact";
import { contactAtom, workingAtom } from "../atoms";
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
  const [isWorking, setWorking] = useAtom(workingAtom);
  const createContactMutation = useCreateContact();
  const updateContactMutation = useUpdateContact();
  const navigate = useNavigate();

  const methods = useForm<ContactInfoFormSchemaType>({
    resolver: zodResolver(contactInfoFormSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const options = {
    onSuccess: () => {
      navigate("/contacts");
    },
    onSettled: () => {
      setWorking(false);
    },
  };

  const onSubmit: SubmitHandler<ContactInfoFormSchemaType> = (data) => {
    setWorking(true);
    const submitData = { ...data, id: contact?.id ?? "" };
    if (!submitData.id) {
      createContactMutation.mutate(submitData, options);
    } else {
      updateContactMutation.mutate(submitData, options);
    }
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
              <label htmlFor={nameId}>名前 : </label>
              <div>
                <Input
                  maxLength={50}
                  defaultValue={contact.name}
                  name="name"
                  aria-describedby={nameId}
                />
                {errors.name && <p id={nameId}>{errors.name.message}</p>}
              </div>
            </div>
            <div className={styles.formItem}>
              <label htmlFor={phoneNumberId}>TEL : </label>
              <div>
                <Input
                  maxLength={13}
                  defaultValue={contact.phoneNumber}
                  name="phoneNumber"
                  aria-describedby={phoneNumberId}
                ></Input>
                {errors.phoneNumber && (
                  <p id={phoneNumberId}>{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
          </main>
          <footer className={styles.footer}>
            <Button type="submit" disabled={isWorking}>
              OK
            </Button>
          </footer>
          {(createContactMutation.error || updateContactMutation.error) && (
            <div className={styles.errorMessage}>
              <span>更新に失敗しました</span>
            </div>
          )}
        </form>
      </FormProvider>
    </>
  );
};
