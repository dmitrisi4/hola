import { http, type HttpError } from "@/shared/api/http";

import type { RestAuthSignupResult } from "@backend-types/rest";

export type SignupRequest = {
  email: string;
  password: string;
};

export type SignupResponse = RestAuthSignupResult;

export async function signup(req: SignupRequest): Promise<SignupResponse> {
  try {
    const { data } = await http<SignupResponse>("auth/signup", {
      method: "POST",
      json: req,
      context: {
        skipAuthRefresh: true,
      },
    });
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw new Error(String((error as HttpError).message));
    }
    throw error instanceof Error ? error : new Error("Signup failed");
  }
}
