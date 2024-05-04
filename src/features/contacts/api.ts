import axios from "axios";

import { Contact } from "./types/Contact";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/react-query";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createContact = async (contact: Contact): Promise<Contact> => {
  const { data } = await axios.post(`${baseUrl}/api/contacts`, contact);
  return data;
};

const getContacts = async (): Promise<Contact[]> => {
  const { data } = await axios.get(`${baseUrl}/api/contacts`);
  return data ?? [];
};

export const useGetContacts = () => {
  return useQuery({ queryKey: ["contacts"], queryFn: getContacts });
};

export const updateContact = async (contact: Contact) => {
  return axios.put(`${baseUrl}/api/contacts/${contact.id}`, contact);
};

const deleteContact = async (id: string) => {
  return axios.delete(`${baseUrl}/api/contacts/${id}`);
};

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};
