import type { ApiContext } from "./http-types";
import type { Options } from "ky";

export function parseContext(options?: Options): ApiContext {
  if (!options?.context || typeof options.context !== "object") return {};
  return options.context as ApiContext;
}

export function mergeContext(context: Options["context"], patch: ApiContext) {
  if (!context || typeof context !== "object") return patch;
  return { ...context, ...patch };
}

export function isAuthRoute(url: string) {
  const pathname = new URL(url).pathname;
  return /\/auth\/(login|signup|logout|refresh)$/.test(pathname);
}
