import type { AuthAccess } from "@backend-types/rest";

import { http } from "@/shared/api/http";
import type { HttpError } from "@/shared/api/http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = AuthAccess;

const API_BASE = import.meta.env.VITE_API_HTTP ?? "http://localhost:8000/api";

export async function login(req: LoginRequest): Promise<LoginResponse> {
  try {
    const { data } = await http<LoginResponse>(`${API_BASE}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(req),
    });
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw new Error(String((error as HttpError).message));
    }
    throw error instanceof Error ? error : new Error("Login failed");
  }
}
