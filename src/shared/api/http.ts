import ky, { type Options } from "ky";

import { createAuthBroadcast } from "./http-broadcast";
import { API_BASE, REFRESH_SKEW_SEC } from "./http-config";
import { isAuthRoute, mergeContext, parseContext } from "./http-context";
import { RefreshError, toHttpError } from "./http-errors";
import { getMessage, parseJsonSafe } from "./http-response";
import { getRefreshDelayMs } from "./http-token";

import type { HttpError, TokenUpdateOptions } from "./http-types";
import type { AuthAccess } from "@backend-types/rest";

export type { ApiContext, HttpError } from "./http-types";

let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;
let refreshTimeoutId: number | null = null;

function clearRefreshTimer() {
  if (!refreshTimeoutId) return;
  window.clearTimeout(refreshTimeoutId);
  refreshTimeoutId = null;
}

function setAccessTokenInternal(
  token: string | null,
  { broadcast = true, schedule = true }: TokenUpdateOptions = {},
) {
  accessToken = token;
  clearRefreshTimer();

  if (token && schedule) {
    scheduleAutoRefresh(token);
  }

  if (broadcast) {
    if (token) {
      authBroadcast.postToken(token);
    } else {
      authBroadcast.postTokenCleared();
    }
  }
}

const authBroadcast = createAuthBroadcast({
  getToken: () => accessToken,
  onToken: (token) => {
    setAccessTokenInternal(token, { broadcast: false });
  },
  onTokenCleared: () => {
    setAccessTokenInternal(null, { broadcast: false, schedule: false });
  },
});

function scheduleAutoRefresh(token: string) {
  clearRefreshTimer();

  const delayMs = getRefreshDelayMs(token, REFRESH_SKEW_SEC);
  if (delayMs === null) return;

  refreshTimeoutId = window.setTimeout(() => {
    void refreshAccess().catch(() => {
      clearAccessToken();
    });
  }, Math.max(delayMs, 1000));
}

export function setAccessToken(token: string | null | undefined) {
  setAccessTokenInternal(token ?? null);
}

export function clearAccessToken() {
  setAccessTokenInternal(null, { schedule: false });
}

export function getAccessToken() {
  return accessToken;
}

async function requestRefresh() {
  authBroadcast.postRefreshStarted();
  try {
    const response = await ky.post(`${API_BASE}/auth/refresh`, {
      credentials: "include",
      throwHttpErrors: false,
    });

    if (!response.ok) {
      const payload = await parseJsonSafe(response.clone());
      const message = getMessage(payload, "Session expired. Please sign in again.");
      throw new RefreshError(message, response.status);
    }

    const payload = await response.json<AuthAccess>();
    setAccessToken(payload.accessToken);
    return payload.accessToken;
  } finally {
    authBroadcast.postRefreshFinished();
  }
}

async function refreshAccess() {
  if (authBroadcast.isPeerRefreshLocked()) {
    const tokenFromPeer = await authBroadcast.waitForTokenRefresh();
    if (tokenFromPeer) {
      setAccessTokenInternal(tokenFromPeer, { broadcast: false });
      return tokenFromPeer;
    }
  }

  if (!refreshPromise) {
    refreshPromise = requestRefresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export const apiClient = ky.create({
  prefixUrl: API_BASE,
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        if (!accessToken || request.headers.has("authorization")) return;
        request.headers.set("authorization", `Bearer ${accessToken}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response;

        const context = parseContext(options);
        if (context.skipAuthRefresh || context.isRetryAfterRefresh || isAuthRoute(request.url)) {
          return response;
        }

        try {
          const refreshedToken = await refreshAccess();
          request.headers.set("authorization", `Bearer ${refreshedToken}`);
          return apiClient(request, {
            ...options,
            context: mergeContext(options.context, { isRetryAfterRefresh: true }),
          });
        } catch (error) {
          clearAccessToken();
          throw error;
        }
      },
    ],
  },
});

export async function http<T>(input: string, init?: Options): Promise<{ data: T; status: number }> {
  try {
    const response = await apiClient(input, init);
    const payload = await parseJsonSafe(response);
    return { data: payload as T, status: response.status };
  } catch (error) {
    throw (await toHttpError(error)) as HttpError;
  }
}
