export function decodeTokenExpSec(token: string) {
  const payload = token.split(".")[1];
  if (!payload || typeof atob !== "function") return null;

  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  try {
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as { exp?: unknown };
    return typeof parsed.exp === "number" ? parsed.exp : null;
  } catch {
    return null;
  }
}

export function getRefreshDelayMs(token: string, skewSec: number) {
  const expSec = decodeTokenExpSec(token);
  if (!expSec) return null;
  const nowSec = Math.floor(Date.now() / 1000);
  return Math.max((expSec - nowSec - skewSec) * 1000, 0);
}
