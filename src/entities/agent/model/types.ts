export type AgentVoiceStyle = "warm" | "playful" | "direct";
export type AgentHumorStyle = "dry" | "flirty" | "chaotic";
export type AgentFlirtingLevel = "low" | "medium" | "high";
export type AgentIntent = "relationship" | "casual" | "friends" | "open";
export type EncounterVibe = "spark" | "steady" | "awkward";
export type EncounterStatus = "new" | "active" | "completed" | "stalled";
export type RelationshipStage =
  | "first contact"
  | "repeat spark"
  | "warming up"
  | "not landing";

export interface AgentPersona {
  displayName: string;
  tagline: string;
  voiceStyle: AgentVoiceStyle;
  humorStyle: AgentHumorStyle;
  flirtingLevel: AgentFlirtingLevel;
  intent: AgentIntent;
  favoriteTopics: string[];
  avoidTopics: string[];
  boundaries: string;
  autoRunAfterMatch: boolean;
}

export interface AgentEncounterMessage {
  id: string;
  speaker: "mine" | "theirs" | "system";
  content: string;
}

export interface AgentEncounterRun {
  id: string;
  updatedAt: string;
  runCount: number;
  status: EncounterStatus;
  relationshipStage: RelationshipStage;
  vibe: EncounterVibe;
  chemistryScore: number;
  summary: string;
  sharedTopics: string[];
  frictionPoints: string[];
  suggestedOpener: string;
  openerOptions: AgentHandoffOption[];
  selectedOpenerStyle: HandoffOpenerStyle;
  transcript: AgentEncounterMessage[];
}

export type HandoffOpenerStyle = "safe" | "playful" | "direct";

export interface AgentHandoffOption {
  style: HandoffOpenerStyle;
  label: string;
  opener: string;
}

export interface AgentEncounter {
  id: string;
  profileId: string;
  title: string;
  counterpartLabel: string;
  avatar: string;
  status: EncounterStatus;
  updatedAt: string;
  runCount: number;
  relationshipStage: RelationshipStage;
  vibe: EncounterVibe;
  chemistryScore: number;
  summary: string;
  sharedTopics: string[];
  frictionPoints: string[];
  suggestedOpener: string;
  openerOptions: AgentHandoffOption[];
  selectedOpenerStyle: HandoffOpenerStyle;
  transcript: AgentEncounterMessage[];
  transcriptHidden: boolean;
  archived: boolean;
  history: AgentEncounterRun[];
  chatId: string;
}

export interface AgentChatHandoff {
  encounterId: string;
  chatId: string;
  counterpartLabel: string;
  chemistryScore: number;
  sharedTopics: string[];
  frictionPoints: string[];
  openerOptions: AgentHandoffOption[];
  selectedOpenerStyle: HandoffOpenerStyle;
  selectedOpener: string;
}

export interface AgentPersonaInsight {
  title: string;
  detail: string;
}

export interface AgentPersonaPerformanceSnapshot {
  totalEncounters: number;
  sparkRateLabel: string;
  strongestTopic: string;
  strongestCounterpart: string;
  bestOpenerStyle: HandoffOpenerStyle;
  momentumLabel: string;
  insights: AgentPersonaInsight[];
}
