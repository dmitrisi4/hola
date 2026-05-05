import { API_BASE } from "@/shared/api/http-config";

function getApiOrigin() {
  if (API_BASE.startsWith("http://") || API_BASE.startsWith("https://")) {
    return API_BASE;
  }

  if (typeof window === "undefined") return API_BASE;

  const { hostname, origin, port } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  if (API_BASE.startsWith("/") && isLocalHost && port !== "8000") {
    return `http://localhost:8000${API_BASE}`;
  }

  return `${origin}${API_BASE}`;
}

export function getGoogleSignInUrl() {
  return `${getApiOrigin().replace(/\/$/, "")}/auth/google/signin`;
}

export function decodeJwtSubject(token: string): string | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { sub?: string | number };

    if (typeof json.sub === "string") return json.sub;
    if (typeof json.sub === "number") return String(json.sub);
    return null;
  } catch {
    return null;
  }
}
