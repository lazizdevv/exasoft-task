import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../../configs/request";

export const useDelete = (endpoint: string, queryKey:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      request.delete(endpoint, { data: id }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error("Xato:", error);
    },
  });
};
