import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IQueryParams, TypeUserUpdatePayload } from "../types/dashboard";
import { destroyUser, getUser, updateUser } from "../services/api";

export default function useUser(params?: IQueryParams, shouldFetch = true) {
  const queryClient = useQueryClient();

  const {
    data: users,
    error,
    isError,
    isPending,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: params ? ["users", params] : ["users"],
    queryFn: () => getUser(params),
    enabled: shouldFetch,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TypeUserUpdatePayload;
    }) => updateUser(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => destroyUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return {
    users,
    error,
    isError,
    isPending,
    isLoading,
    isFetching,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    isPendingMutation: updateMutation.isPending,
    isErrorMutation: updateMutation.isError,
    errorMutation: updateMutation.error,
  };
}
