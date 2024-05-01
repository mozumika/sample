import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Contact } from "../types/Contact";
import { queryClient } from "../../../lib/react-query";

const baseUrl = import.meta.env.VITE_BASE_URL;

const createContact = async (contact: Contact): Promise<Contact> => {
  const { data } = await axios.post(`${baseUrl}/api/contacts`, contact);
  return data;
};

export const useCreateContact = () => {
  return useMutation({
    mutationFn: (contact: Contact) => createContact(contact),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};
