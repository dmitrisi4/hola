import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { clearAccessToken } from "@/shared/api/http";

import { logoutApi } from "../api/logout";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      try {
        await logoutApi();
      } catch {
        // Best-effort: clear local state even if server call fails
      }
      clearAccessToken();
      try {
        localStorage.removeItem("hola_user_id");
      } catch {
        // noop
      }
      await queryClient.invalidateQueries();
    },
    onSuccess: () => {
      void router.navigate({ to: "/login", replace: true });
    },
  });
}
