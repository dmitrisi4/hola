export type ApiContext = {
  skipAuthRefresh?: boolean;
  isRetryAfterRefresh?: boolean;
};

export type HttpError = {
  status: number;
  message: string;
};

export type AuthChannelMessage =
  | { type: "TOKEN"; token: string }
  | { type: "TOKEN_CLEARED" }
  | { type: "REFRESH_STARTED" }
  | { type: "REFRESH_FINISHED" };

export type TokenUpdateOptions = {
  broadcast?: boolean;
  schedule?: boolean;
};
