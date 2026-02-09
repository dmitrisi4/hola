import { useMutation } from "@tanstack/react-query";

import { login, type LoginRequest, type LoginResponse } from "../api/login";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
}
