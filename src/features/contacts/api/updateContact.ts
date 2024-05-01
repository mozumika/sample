import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Contact } from "../types/Contact";
import { queryClient } from "../../../lib/react-query";

const baseUrl = import.meta.env.VITE_BASE_URL;

const updateContact = async (contact: Contact) => {
  return axios.put(`${baseUrl}/api/contacts/${contact.id}`, contact);
};

export const useUpdateContact = () => {
  return useMutation({
    mutationFn: (contact: Contact) => updateContact(contact),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};
