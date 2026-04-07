import { getAccessToken } from "@/shared/api/http";

export function checkAuth(): string | undefined {
  const token = getAccessToken();
  if (!token) return undefined;
  return token;
}
