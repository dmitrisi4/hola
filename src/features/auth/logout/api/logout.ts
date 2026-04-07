import { http, type HttpError } from "@/shared/api/http";

import type { Ok } from "@backend-types/rest";

export type LogoutResponse = Ok;

export async function logoutApi(): Promise<LogoutResponse> {
  try {
    const { data } = await http<LogoutResponse>("auth/logout", {
      method: "POST",
      context: {
        skipAuthRefresh: true,
      },
    });
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw new Error(String((error as HttpError).message));
    }
    throw error instanceof Error ? error : new Error("Logout failed");
  }
}
