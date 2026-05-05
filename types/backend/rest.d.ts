// AUTO-GENERATED. DO NOT EDIT.
// Source: application/domain/contracts.js
// API version: 1.0.0

export type UUID = string;
export type UnixMs = number;
export type JWT = string;
export type Base64 = string;
export type Json = Record<string, unknown>;

export interface Ok {
  ok: boolean;
}

export interface AuthTokens {
  userId: UUID;
  accessToken: JWT;
  refreshToken: JWT;
  accessExp: number;
  refreshExp: number;
  jti: UUID;
}

export interface AuthAccess {
  userId: UUID;
  accessToken: JWT;
  accessExp: number;
}

export interface DeviceInfo {
  id: number;
  deviceId: string;
  publicKey: Base64 | null;
  peerId: UUID;
  createdAt: string;
  revokedAt: string | null;
}

export interface PresencePeer {
  peerId: UUID;
  tileId: string;
  devicePublicKey: Base64;
  caps: Json;
  ts: UnixMs;
}

export interface InboxMessage {
  from: UUID;
  type: string;
  ciphertext: string;
  ts: UnixMs;
}

export interface FeatureFlag {
  key: string;
  value: Json;
  scope: string;
  updatedAt: string;
}

export interface SystemVersion {
  apiVersion: string;
  serverVersion: string;
  buildTime: string | null;
}

export interface RestAuthSignupParams {
  email: string;
  password: string;
}

export interface RestAuthSignupResult {
  userId: UUID;
}

export interface RestAuthLoginParams {
  email: string;
  password: string;
}

export interface RestAuthRefreshParams {
  refreshToken?: JWT;
}

export interface RestAuthLogoutParams {
  refreshToken?: JWT;
}

export interface RestApi {
  auth: {
    signup(params: RestAuthSignupParams): Promise<RestAuthSignupResult>;
    login(params: RestAuthLoginParams): Promise<AuthAccess>;
    refresh(params?: RestAuthRefreshParams): Promise<AuthAccess>;
    logout(params?: RestAuthLogoutParams): Promise<Ok>;
  };
}

export type RestApiNamespace = keyof RestApi;
export type RestApiMethods<N extends RestApiNamespace> = keyof RestApi[N];