import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin, postRegister } from "../service/api";

export default function useAuth() {
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (payload: ILoginPayload) => postLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: IRegisterPayload) => postRegister(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    loginMutation: loginMutation.mutateAsync,
    registerMutation: registerMutation.mutate,
    isPending: loginMutation.isPending || registerMutation.isPending,
    isError: loginMutation.isError || registerMutation.isError,
    error: loginMutation.error || registerMutation.error,
  };
}
