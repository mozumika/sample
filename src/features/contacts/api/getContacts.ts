import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Contacts } from "../types/Contacts";

const baseUrl = import.meta.env.VITE_BASE_URL;

const getContacts = async (): Promise<Contacts[]> => {
  const { data } = await axios.get(`${baseUrl}/api/contacts`);
  return data ?? [];
};

export const useGetContacts = () => {
  return useQuery({ queryKey: ["contacts"], queryFn: getContacts });
};
