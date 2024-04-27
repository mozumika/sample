import { atom } from "jotai";
import { Contact } from "./types/Contact";

export const emptyContact: Contact = {
  id: "",
  name: "",
  phoneNumber: "",
};

export const contactAtom = atom<Contact>(emptyContact);

export const workingAtom = atom(false);
