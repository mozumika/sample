import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { queryClient } from "../../../lib/react-query";

const baseUrl = import.meta.env.VITE_BASE_URL;

const deleteContact = async (id: string) => {
  return axios.delete(`${baseUrl}/api/contacts/${id}`);
};

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};
