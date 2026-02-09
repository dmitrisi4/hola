import { useMutation } from "@tanstack/react-query";

import { signup, type SignupRequest, type SignupResponse } from "../api/signup";

export function useSignup() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
  });
}
