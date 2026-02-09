import { http, setAccessToken, type HttpError } from "@/shared/api/http";

import type { AuthAccess } from "@backend-types/rest";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = AuthAccess;

export async function login(req: LoginRequest): Promise<LoginResponse> {
  try {
    const { data } = await http<LoginResponse>("auth/login", {
      method: "POST",
      json: req,
      context: {
        skipAuthRefresh: true,
      },
    });
    setAccessToken(data.accessToken);
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw new Error(String((error as HttpError).message));
    }
    throw error instanceof Error ? error : new Error("Login failed");
  }
}
