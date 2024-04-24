import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Contact } from "../types/Contact";

const baseUrl = import.meta.env.VITE_BASE_URL;

const getContacts = async (): Promise<Contact[]> => {
  const { data } = await axios.get(`${baseUrl}/api/contacts`);
  return data ?? [];
};

export const useGetContacts = () => {
  return useQuery({ queryKey: ["contacts"], queryFn: getContacts });
};
