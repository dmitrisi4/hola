import { HTTPError } from "ky";

import { getMessage, parseJsonSafe } from "./http-response";

import type { HttpError } from "./http-types";

export class RefreshError extends Error {
  readonly status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = "RefreshError";
    this.status = status;
  }
}

export async function toHttpError(error: unknown): Promise<HttpError> {
  if (error instanceof RefreshError) {
    return { status: error.status, message: error.message };
  }

  if (error instanceof HTTPError) {
    const payload = await parseJsonSafe(error.response.clone());
    return {
      status: error.response.status,
      message: getMessage(payload, error.response.statusText || "Request failed"),
    };
  }

  if (error instanceof Error) {
    return { status: 0, message: error.message || "Request failed" };
  }

  return { status: 0, message: "Request failed" };
}
