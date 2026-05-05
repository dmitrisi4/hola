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

export interface SystemVersionParams {
  // empty
}

export interface DevicesRegisterParams {
  deviceId: string;
  publicKey: Base64;
}

export interface DevicesRegisterResult {
  peerId: UUID;
}

export interface DevicesListParams {
  // empty
}

export interface DevicesRevokeParams {
  deviceId: string;
}

export interface PresenceAnnounceParams {
  tileId: string;
  peerId?: UUID;
  caps?: Json;
  ts?: UnixMs;
}

export interface PresenceHeartbeatParams {
  peerId: UUID;
  tileId: string;
}

export interface PresenceGetPeersParams {
  tileId: string;
  limit?: number;
}

export interface SignalOfferParams {
  toPeerId: UUID;
  sdp?: Json;
  payload?: Json;
}

export interface SignalAnswerParams {
  toPeerId: UUID;
  sdp?: Json;
  payload?: Json;
}

export interface SignalIceParams {
  toPeerId: UUID;
  candidate?: Json;
  payload?: Json;
}

export interface InboxPushParams {
  toUserId: UUID;
  ciphertext: string;
  type?: string;
  ts?: UnixMs;
}

export interface InboxPullParams {
  // empty
}

export interface AbuseReportParams {
  targetUserId: UUID;
  reason: string;
  contextCiphertext?: string;
}

export interface AdminBanUserParams {
  userId: UUID;
  durationMinutes?: number;
  reason: string;
  type?: string;
}

export interface AdminShadowBanParams {
  userId: UUID;
  flags?: string[];
}

export interface FlagsSetFeatureParams {
  key: string;
  value: Json;
  scope?: string;
}

export interface FlagsGetFeatureParams {
  key: string;
}

export interface Api {
  system: {
    introspect(params?: string[]): Promise<Json>;
    version(params?: SystemVersionParams): Promise<SystemVersion>;
  };
  devices: {
    register(params: DevicesRegisterParams): Promise<DevicesRegisterResult>;
    list(params?: DevicesListParams): Promise<DeviceInfo[]>;
    revoke(params: DevicesRevokeParams): Promise<Ok>;
  };
  presence: {
    announce(params: PresenceAnnounceParams): Promise<Ok>;
    heartbeat(params: PresenceHeartbeatParams): Promise<Ok>;
    getPeers(params: PresenceGetPeersParams): Promise<PresencePeer[]>;
  };
  signal: {
    offer(params: SignalOfferParams): Promise<Ok>;
    answer(params: SignalAnswerParams): Promise<Ok>;
    ice(params: SignalIceParams): Promise<Ok>;
  };
  inbox: {
    push(params: InboxPushParams): Promise<Ok>;
    pull(params?: InboxPullParams): Promise<InboxMessage[]>;
  };
  abuse: {
    report(params: AbuseReportParams): Promise<Ok>;
  };
  admin: {
    banUser(params: AdminBanUserParams): Promise<Ok>;
    shadowBan(params: AdminShadowBanParams): Promise<Ok>;
  };
  flags: {
    setFeature(params: FlagsSetFeatureParams): Promise<Ok>;
    getFeature(params: FlagsGetFeatureParams): Promise<FeatureFlag | null>;
  };
}

export type ApiNamespace = keyof Api;
export type ApiMethods<N extends ApiNamespace> = keyof Api[N];