import {
  AUTH_CHANNEL_NAME,
  REFRESH_LOCK_TTL_MS,
  TOKEN_WAIT_TIMEOUT_MS,
} from "./http-config";

import type { AuthChannelMessage } from "./http-types";

type CreateAuthBroadcastParams = {
  getToken: () => string | null;
  onToken: (token: string) => void;
  onTokenCleared: () => void;
};

export function createAuthBroadcast({
  getToken,
  onToken,
  onTokenCleared,
}: CreateAuthBroadcastParams) {
  const authChannel =
    typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel(AUTH_CHANNEL_NAME)
      : null;

  let isPeerRefreshLocked = false;
  let peerRefreshTimeoutId: number | null = null;

  function stopPeerRefreshLock() {
    isPeerRefreshLocked = false;
    if (!peerRefreshTimeoutId) return;
    window.clearTimeout(peerRefreshTimeoutId);
    peerRefreshTimeoutId = null;
  }

  function startPeerRefreshLock() {
    isPeerRefreshLocked = true;
    if (peerRefreshTimeoutId) {
      window.clearTimeout(peerRefreshTimeoutId);
    }
    peerRefreshTimeoutId = window.setTimeout(() => {
      stopPeerRefreshLock();
    }, REFRESH_LOCK_TTL_MS);
  }

  function postAuthMessage(message: AuthChannelMessage) {
    if (!authChannel) return;
    authChannel.postMessage(message);
  }

  async function waitForTokenRefresh(timeoutMs = TOKEN_WAIT_TIMEOUT_MS) {
    if (!authChannel) return null;

    return new Promise<string | null>((resolve) => {
      let completed = false;
      const initialToken = getToken();

      const finish = (token: string | null) => {
        if (completed) return;
        completed = true;
        window.clearTimeout(timeoutId);
        authChannel.removeEventListener("message", onMessage);
        resolve(token);
      };

      const onMessage = (event: MessageEvent<AuthChannelMessage>) => {
        const message = event.data;
        if (message.type === "TOKEN") {
          finish(message.token);
        } else if (message.type === "REFRESH_FINISHED") {
          const currentToken = getToken();
          finish(currentToken !== initialToken ? currentToken : null);
        }
      };

      const timeoutId = window.setTimeout(() => {
        finish(null);
      }, timeoutMs);

      authChannel.addEventListener("message", onMessage);
    });
  }

  if (authChannel) {
    authChannel.addEventListener("message", (event: MessageEvent<AuthChannelMessage>) => {
      const message = event.data;
      switch (message.type) {
        case "TOKEN":
          onToken(message.token);
          break;
        case "TOKEN_CLEARED":
          onTokenCleared();
          break;
        case "REFRESH_STARTED":
          startPeerRefreshLock();
          break;
        case "REFRESH_FINISHED":
          stopPeerRefreshLock();
          break;
        default:
          break;
      }
    });
  }

  return {
    isPeerRefreshLocked: () => isPeerRefreshLocked,
    waitForTokenRefresh,
    postToken: (token: string) => postAuthMessage({ type: "TOKEN", token }),
    postTokenCleared: () => postAuthMessage({ type: "TOKEN_CLEARED" }),
    postRefreshStarted: () => postAuthMessage({ type: "REFRESH_STARTED" }),
    postRefreshFinished: () => postAuthMessage({ type: "REFRESH_FINISHED" }),
  };
}
