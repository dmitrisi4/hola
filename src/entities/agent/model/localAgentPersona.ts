import { readLocalProfile } from "@/entities/profile/model/localProfile";
import { mockFeedProfiles } from "@/entities/profile/model/mockProfiles";
import { getMatchPreviews } from "@/entities/social/model/demoSocial";
import { clamp } from "@/shared/lib/clamp";

import type {
  AgentChatHandoff,
  AgentEncounter,
  AgentEncounterMessage,
  AgentEncounterRun,
  AgentHandoffOption,
  AgentPersonaPerformanceSnapshot,
  AgentFlirtingLevel,
  AgentHumorStyle,
  AgentIntent,
  AgentPersona,
  AgentVoiceStyle,
  EncounterStatus,
  HandoffOpenerStyle,
  EncounterVibe,
  RelationshipStage,
} from "./types";

const PERSONA_STORAGE_KEY = "hola_agent_persona";
const ENCOUNTER_STATE_STORAGE_KEY = "hola_agent_encounter_state";

type StoredEncounterState = {
  id: string;
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
  deleted: boolean;
  history: AgentEncounterRun[];
};

type AgentEncounterBase = Pick<
  AgentEncounter,
  "id" | "profileId" | "title" | "counterpartLabel" | "avatar" | "chatId"
>;

export const DEFAULT_AGENT_PERSONA: AgentPersona = {
  displayName: "Alex After Hours",
  tagline: "Warm, curious, and good at turning a match into an easy first conversation.",
  voiceStyle: "warm",
  humorStyle: "flirty",
  flirtingLevel: "medium",
  intent: "relationship",
  favoriteTopics: ["City walks", "Coffee spots", "Travel", "Music"],
  avoidTopics: ["Work stress", "Ex drama"],
  boundaries: "Keep it light, curious, and respectful. No manipulative flirting or false promises.",
  autoRunAfterMatch: true,
};

export const VOICE_STYLE_OPTIONS: { value: AgentVoiceStyle; label: string }[] = [
  { value: "warm", label: "Warm" },
  { value: "playful", label: "Playful" },
  { value: "direct", label: "Direct" },
];

export const HUMOR_STYLE_OPTIONS: { value: AgentHumorStyle; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "flirty", label: "Flirty" },
  { value: "chaotic", label: "Chaotic" },
];

export const FLIRTING_LEVEL_OPTIONS: { value: AgentFlirtingLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const INTENT_OPTIONS: { value: AgentIntent; label: string }[] = [
  { value: "relationship", label: "Relationship" },
  { value: "casual", label: "Casual" },
  { value: "friends", label: "Friends" },
  { value: "open", label: "Open" },
];

function sanitizeStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function sanitizeTranscript(value: unknown, fallback: AgentEncounterMessage[]) {
  if (!Array.isArray(value)) return fallback;

  const messages = value.filter(
    (item): item is AgentEncounterMessage =>
      Boolean(item) &&
      typeof item === "object" &&
      typeof (item as AgentEncounterMessage).id === "string" &&
      ((item as AgentEncounterMessage).speaker === "mine" ||
        (item as AgentEncounterMessage).speaker === "theirs" ||
        (item as AgentEncounterMessage).speaker === "system") &&
      typeof (item as AgentEncounterMessage).content === "string",
  );

  return messages.length > 0 ? messages : fallback;
}

function sanitizeHandoffStyle(
  value: unknown,
  fallback: HandoffOpenerStyle,
): HandoffOpenerStyle {
  return value === "safe" || value === "playful" || value === "direct" ? value : fallback;
}

function sanitizeOpenerOptions(value: unknown, fallback: AgentHandoffOption[]) {
  if (!Array.isArray(value)) return fallback;

  const options = value.filter(
    (item): item is AgentHandoffOption =>
      Boolean(item) &&
      typeof item === "object" &&
      sanitizeHandoffStyle((item as AgentHandoffOption).style, "safe") ===
        (item as AgentHandoffOption).style &&
      typeof (item as AgentHandoffOption).label === "string" &&
      typeof (item as AgentHandoffOption).opener === "string",
  );

  return options.length > 0 ? options : fallback;
}

function sanitizeStatus(value: unknown, fallback: EncounterStatus): EncounterStatus {
  return value === "new" || value === "active" || value === "completed" || value === "stalled"
    ? value
    : fallback;
}

function sanitizeVibe(value: unknown, fallback: EncounterVibe): EncounterVibe {
  return value === "spark" || value === "steady" || value === "awkward" ? value : fallback;
}

function sanitizeStage(value: unknown, fallback: RelationshipStage): RelationshipStage {
  return value === "first contact" ||
    value === "repeat spark" ||
    value === "warming up" ||
    value === "not landing"
    ? value
    : fallback;
}

function sanitizeRun(value: unknown, fallback: AgentEncounterRun): AgentEncounterRun {
  if (!value || typeof value !== "object") return fallback;

  const candidate = value as Partial<AgentEncounterRun>;

  return {
    id: typeof candidate.id === "string" && candidate.id.trim() ? candidate.id : fallback.id,
    updatedAt:
      typeof candidate.updatedAt === "string" && candidate.updatedAt.trim()
        ? candidate.updatedAt
        : fallback.updatedAt,
    runCount: typeof candidate.runCount === "number" ? candidate.runCount : fallback.runCount,
    status: sanitizeStatus(candidate.status, fallback.status),
    relationshipStage: sanitizeStage(candidate.relationshipStage, fallback.relationshipStage),
    vibe: sanitizeVibe(candidate.vibe, fallback.vibe),
    chemistryScore:
      typeof candidate.chemistryScore === "number"
        ? candidate.chemistryScore
        : fallback.chemistryScore,
    summary:
      typeof candidate.summary === "string" && candidate.summary.trim()
        ? candidate.summary
        : fallback.summary,
    sharedTopics: sanitizeStringArray(candidate.sharedTopics, fallback.sharedTopics),
    frictionPoints: sanitizeStringArray(candidate.frictionPoints, fallback.frictionPoints),
    suggestedOpener:
      typeof candidate.suggestedOpener === "string" && candidate.suggestedOpener.trim()
        ? candidate.suggestedOpener
        : fallback.suggestedOpener,
    openerOptions: sanitizeOpenerOptions(candidate.openerOptions, fallback.openerOptions),
    selectedOpenerStyle: sanitizeHandoffStyle(
      candidate.selectedOpenerStyle,
      fallback.selectedOpenerStyle,
    ),
    transcript: sanitizeTranscript(candidate.transcript, fallback.transcript),
  };
}

function sanitizeStoredEncounterState(
  value: unknown,
  fallback: StoredEncounterState,
): StoredEncounterState {
  if (!value || typeof value !== "object") return fallback;

  const candidate = value as Partial<StoredEncounterState>;

  return {
    id: typeof candidate.id === "string" && candidate.id.trim() ? candidate.id : fallback.id,
    status: sanitizeStatus(candidate.status, fallback.status),
    updatedAt:
      typeof candidate.updatedAt === "string" && candidate.updatedAt.trim()
        ? candidate.updatedAt
        : fallback.updatedAt,
    runCount: typeof candidate.runCount === "number" ? candidate.runCount : fallback.runCount,
    relationshipStage: sanitizeStage(candidate.relationshipStage, fallback.relationshipStage),
    vibe: sanitizeVibe(candidate.vibe, fallback.vibe),
    chemistryScore:
      typeof candidate.chemistryScore === "number"
        ? candidate.chemistryScore
        : fallback.chemistryScore,
    summary:
      typeof candidate.summary === "string" && candidate.summary.trim()
        ? candidate.summary
        : fallback.summary,
    sharedTopics: sanitizeStringArray(candidate.sharedTopics, fallback.sharedTopics),
    frictionPoints: sanitizeStringArray(candidate.frictionPoints, fallback.frictionPoints),
    suggestedOpener:
      typeof candidate.suggestedOpener === "string" && candidate.suggestedOpener.trim()
        ? candidate.suggestedOpener
        : fallback.suggestedOpener,
    openerOptions: sanitizeOpenerOptions(candidate.openerOptions, fallback.openerOptions),
    selectedOpenerStyle: sanitizeHandoffStyle(
      candidate.selectedOpenerStyle,
      fallback.selectedOpenerStyle,
    ),
    transcript: sanitizeTranscript(candidate.transcript, fallback.transcript),
    transcriptHidden:
      typeof candidate.transcriptHidden === "boolean"
        ? candidate.transcriptHidden
        : fallback.transcriptHidden,
    archived: typeof candidate.archived === "boolean" ? candidate.archived : fallback.archived,
    deleted: typeof candidate.deleted === "boolean" ? candidate.deleted : fallback.deleted,
    history: Array.isArray(candidate.history)
      ? candidate.history.map((item, index) => sanitizeRun(item, fallback.history[index] ?? fallback.history[0]))
      : fallback.history,
  };
}

function sanitizePersona(value: unknown): AgentPersona {
  if (!value || typeof value !== "object") return DEFAULT_AGENT_PERSONA;

  const candidate = value as Partial<AgentPersona>;

  return {
    displayName:
      typeof candidate.displayName === "string" && candidate.displayName.trim()
        ? candidate.displayName
        : DEFAULT_AGENT_PERSONA.displayName,
    tagline:
      typeof candidate.tagline === "string" && candidate.tagline.trim()
        ? candidate.tagline
        : DEFAULT_AGENT_PERSONA.tagline,
    voiceStyle:
      candidate.voiceStyle === "warm" ||
      candidate.voiceStyle === "playful" ||
      candidate.voiceStyle === "direct"
        ? candidate.voiceStyle
        : DEFAULT_AGENT_PERSONA.voiceStyle,
    humorStyle:
      candidate.humorStyle === "dry" ||
      candidate.humorStyle === "flirty" ||
      candidate.humorStyle === "chaotic"
        ? candidate.humorStyle
        : DEFAULT_AGENT_PERSONA.humorStyle,
    flirtingLevel:
      candidate.flirtingLevel === "low" ||
      candidate.flirtingLevel === "medium" ||
      candidate.flirtingLevel === "high"
        ? candidate.flirtingLevel
        : DEFAULT_AGENT_PERSONA.flirtingLevel,
    intent:
      candidate.intent === "relationship" ||
      candidate.intent === "casual" ||
      candidate.intent === "friends" ||
      candidate.intent === "open"
        ? candidate.intent
        : DEFAULT_AGENT_PERSONA.intent,
    favoriteTopics: sanitizeStringArray(candidate.favoriteTopics, DEFAULT_AGENT_PERSONA.favoriteTopics),
    avoidTopics: sanitizeStringArray(candidate.avoidTopics, DEFAULT_AGENT_PERSONA.avoidTopics),
    boundaries:
      typeof candidate.boundaries === "string" && candidate.boundaries.trim()
        ? candidate.boundaries
        : DEFAULT_AGENT_PERSONA.boundaries,
    autoRunAfterMatch:
      typeof candidate.autoRunAfterMatch === "boolean"
        ? candidate.autoRunAfterMatch
        : DEFAULT_AGENT_PERSONA.autoRunAfterMatch,
  };
}

function profileSeed(profileId: string) {
  return profileId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function vibeFromScore(score: number): EncounterVibe {
  if (score >= 84) return "spark";
  if (score >= 68) return "steady";
  return "awkward";
}

function statusFromIndex(index: number, vibe: EncounterVibe): EncounterStatus {
  if (index === 0) return "active";
  if (vibe === "awkward") return "stalled";
  if (index === 1) return "new";
  return "completed";
}

function stageFromStatus(status: EncounterStatus, vibe: EncounterVibe): RelationshipStage {
  if (status === "new") return "first contact";
  if (status === "active" && vibe === "spark") return "repeat spark";
  if (status === "stalled" || vibe === "awkward") return "not landing";
  return "warming up";
}

function updatedAtFromIndex(index: number, status: EncounterStatus): string {
  const minutesAgo = status === "new" ? 18 : status === "active" ? 57 : 60 * 8 + index * 75;
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
}

function buildEncounterSummary(
  title: string,
  score: number,
  voiceStyle: AgentVoiceStyle,
  flirtingLevel: AgentFlirtingLevel,
) {
  if (score >= 84) {
    return `${title}'s agent responded best to a ${voiceStyle} tone with ${flirtingLevel} flirting. The exchange kept returning to easy chemistry and shared curiosity.`;
  }

  if (score >= 68) {
    return `${title}'s agent settled into a comfortable rhythm, but the strongest moments came from shared topics rather than instant tension.`;
  }

  return `${title}'s agent stayed polite, but the conversation never fully caught fire. It felt more observational than magnetic.`;
}

function buildTranscript(
  persona: AgentPersona,
  title: string,
  interests: string[],
  score: number,
  runCount = 1,
) {
  const rotatedInterests =
    interests.length > 0
      ? interests.slice(runCount % interests.length).concat(interests.slice(0, runCount % interests.length))
      : [];
  const topInterest = rotatedInterests[0] ?? interests[0] ?? "good playlists";
  const altInterest = rotatedInterests[1] ?? interests[1] ?? "travel plans";

  if (score >= 84) {
    return [
      {
        id: `${title}-${runCount}-1`,
        speaker: "system" as const,
        content:
          runCount > 1
            ? `${persona.displayName} circled back for another chemistry check with ${title}'s agent.`
            : `${persona.displayName} met ${title}'s agent after the match.`,
      },
      {
        id: `${title}-${runCount}-2`,
        speaker: "mine" as const,
        content: `You seem like someone who could turn ${topInterest.toLowerCase()} into a whole date plan.`,
      },
      {
        id: `${title}-${runCount}-3`,
        speaker: "theirs" as const,
        content: `Only if you can keep up. ${topInterest} and ${altInterest.toLowerCase()} are usually where I test chemistry first.`,
      },
      {
        id: `${title}-${runCount}-4`,
        speaker: "mine" as const,
        content:
          runCount > 1
            ? `That second pass was even cleaner. The handoff to humans looks stronger now.`
            : `That is exactly the kind of answer that makes handing this over to humans feel justified.`,
      },
    ];
  }

  if (score >= 68) {
    return [
      {
        id: `${title}-${runCount}-1`,
        speaker: "system" as const,
        content:
          runCount > 1
            ? `${persona.displayName} reopened the conversation with a slightly sharper read on tone.`
            : `${persona.displayName} opened with a lighter, curiosity-first tone.`,
      },
      {
        id: `${title}-${runCount}-2`,
        speaker: "mine" as const,
        content: `You feel like someone who probably has strong opinions about ${topInterest.toLowerCase()}.`,
      },
      {
        id: `${title}-${runCount}-3`,
        speaker: "theirs" as const,
        content: `Strong enough to talk about it over coffee. ${altInterest} came up too, so there is something there.`,
      },
      {
        id: `${title}-${runCount}-4`,
        speaker: "mine" as const,
        content:
          runCount > 1
            ? `Still not fireworks, but the second run found a cleaner rhythm.`
            : `Not fireworks yet, but definitely enough signal to keep going.`,
      },
    ];
  }

  return [
    {
      id: `${title}-${runCount}-1`,
      speaker: "system" as const,
      content:
        runCount > 1
          ? `${persona.displayName} tried a rerun, but the exchange stayed cautious.`
          : `${persona.displayName} tried a gentle opener, but the energy stayed uneven.`,
    },
    {
      id: `${title}-${runCount}-2`,
      speaker: "mine" as const,
      content: `You seem thoughtful. What usually gets you talking first: ${topInterest.toLowerCase()} or ${altInterest.toLowerCase()}?`,
    },
    {
      id: `${title}-${runCount}-3`,
      speaker: "theirs" as const,
      content: `Depends on the mood. This one felt a little too careful to click right away.`,
    },
  ];
}

function buildSharedTopics(interests: string[], runCount: number) {
  if (interests.length === 0) return ["Music", "Coffee"];
  const rotation = runCount % interests.length;
  return interests.slice(rotation).concat(interests.slice(0, rotation)).slice(0, 3);
}

function buildFrictionPoints(vibe: EncounterVibe, runCount: number) {
  if (vibe === "awkward") {
    return runCount > 1
      ? ["Rerun still felt cautious", "No strong topic lock-in"]
      : ["Pacing felt too careful", "No strong topic lock-in"];
  }

  if (vibe === "steady") {
    return runCount > 1
      ? ["Needed a clearer spark moment", "Second run helped more than it surprised"]
      : ["Needed a clearer spark moment"];
  }

  return runCount > 1
    ? ["Keep the handoff human before the chemistry gets over-explained", "Momentum is real, but fragile"]
    : ["Keep the handoff human before the AI overexplains the chemistry"];
}

function buildSuggestedOpener(sharedTopics: string[], vibe: EncounterVibe, runCount: number) {
  const primaryTopic = sharedTopics[0]?.toLowerCase() ?? "music";

  if (vibe === "spark") {
    return runCount > 1
      ? `The rerun locked even harder on ${primaryTopic}. Want the human version of that chemistry now?`
      : `Your agent and mine already bonded over ${primaryTopic}. Want to test that in a real chat?`;
  }

  return runCount > 1
    ? `The second pass kept returning to ${primaryTopic}. I want to see if the human chat lands better.`
    : `Your agent mentioned ${primaryTopic} and I want the human version of that conversation.`;
}

function buildOpenerOptions(
  sharedTopics: string[],
  frictionPoints: string[],
  vibe: EncounterVibe,
): AgentHandoffOption[] {
  const topic = sharedTopics[0]?.toLowerCase() ?? "music";
  const secondTopic = sharedTopics[1]?.toLowerCase() ?? "coffee";
  const caution = frictionPoints[0]?.toLowerCase() ?? "keeping the energy light";

  return [
    {
      style: "safe",
      label: "Safe",
      opener: `Hey, our agents kept coming back to ${topic}. Want to start there?`,
    },
    {
      style: "playful",
      label: "Playful",
      opener:
        vibe === "spark"
          ? `Our agents already made ${topic} sound like a date plan. Should we test that ourselves?`
          : `Our agents almost made ${topic} and ${secondTopic} look smooth. Want a human retry?`,
    },
    {
      style: "direct",
      label: "Direct",
      opener: `The chemistry looked strongest around ${topic}. I would skip ${caution} and just talk for real.`,
    },
  ];
}

function buildRunSnapshot(
  id: string,
  title: string,
  persona: AgentPersona,
  interests: string[],
  chemistryScore: number,
  runCount: number,
  updatedAt: string,
): AgentEncounterRun {
  const vibe = vibeFromScore(chemistryScore);
  const status =
    vibe === "awkward" ? "stalled" : runCount === 1 ? "new" : vibe === "spark" ? "active" : "completed";
  const relationshipStage = stageFromStatus(status, vibe);
  const sharedTopics = buildSharedTopics(interests, runCount);
  const frictionPoints = buildFrictionPoints(vibe, runCount);
  const openerOptions = buildOpenerOptions(sharedTopics, frictionPoints, vibe);

  return {
    id: `${id}-run-${runCount}`,
    updatedAt,
    runCount,
    status,
    relationshipStage,
    vibe,
    chemistryScore,
    summary: buildEncounterSummary(title, chemistryScore, persona.voiceStyle, persona.flirtingLevel),
    sharedTopics,
    frictionPoints,
    suggestedOpener: buildSuggestedOpener(sharedTopics, vibe, runCount),
    openerOptions,
    selectedOpenerStyle: openerOptions[0]?.style ?? "safe",
    transcript: buildTranscript(persona, title, interests, chemistryScore, runCount),
  };
}

function encounterFromSnapshot(
  base: AgentEncounterBase,
  run: AgentEncounterRun,
  state?: Pick<StoredEncounterState, "transcriptHidden" | "archived" | "selectedOpenerStyle">,
  history: AgentEncounterRun[] = [],
): AgentEncounter {
  const selectedOpenerStyle = state?.selectedOpenerStyle ?? run.selectedOpenerStyle;

  return {
    ...base,
    ...run,
    id: base.id,
    selectedOpenerStyle,
    suggestedOpener:
      run.openerOptions.find((option) => option.style === selectedOpenerStyle)?.opener ??
      run.suggestedOpener,
    transcriptHidden: state?.transcriptHidden ?? false,
    archived: state?.archived ?? false,
    history,
  };
}

function toStoredState(encounter: AgentEncounter): StoredEncounterState {
  return {
    id: encounter.id,
    status: encounter.status,
    updatedAt: encounter.updatedAt,
    runCount: encounter.runCount,
    relationshipStage: encounter.relationshipStage,
    vibe: encounter.vibe,
    chemistryScore: encounter.chemistryScore,
    summary: encounter.summary,
    sharedTopics: encounter.sharedTopics,
    frictionPoints: encounter.frictionPoints,
    suggestedOpener: encounter.suggestedOpener,
    openerOptions: encounter.openerOptions,
    selectedOpenerStyle: encounter.selectedOpenerStyle,
    transcript: encounter.transcript,
    transcriptHidden: encounter.transcriptHidden,
    archived: encounter.archived,
    deleted: false,
    history: encounter.history,
  };
}

function buildBaseEncounter(
  profile: (typeof mockFeedProfiles)[number],
  index: number,
  persona: AgentPersona,
): AgentEncounter {
  const interestCount = profile.interests?.length ?? 0;
  const baseScore = 92 - index * 12 + interestCount;
  const chemistryScore = Math.max(58, Math.min(baseScore, 96));
  const initialStatus = statusFromIndex(index, vibeFromScore(chemistryScore));
  const updatedAt = updatedAtFromIndex(index, initialStatus);
  const initialRunCount = initialStatus === "new" ? 1 : index + 2;
  const currentRun = buildRunSnapshot(
    `agent-${profile.id}`,
    profile.displayName,
    persona,
    profile.interests ?? [],
    chemistryScore,
    initialRunCount,
    updatedAt,
  );

  return encounterFromSnapshot(
    {
      id: `agent-${profile.id}`,
      profileId: profile.id,
      title: profile.displayName,
      counterpartLabel: `${profile.displayName}'s agent`,
      avatar: profile.photos?.[0] ?? "",
      chatId: `match-${profile.id}`,
    },
    {
      ...currentRun,
      status: initialStatus,
      relationshipStage: stageFromStatus(initialStatus, currentRun.vibe),
    },
  );
}

function readEncounterStateMap() {
  try {
    const raw = localStorage.getItem(ENCOUNTER_STATE_STORAGE_KEY);
    if (!raw) return new Map<string, StoredEncounterState>();
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return new Map<string, StoredEncounterState>();

    return new Map(
      parsed
        .filter((item): item is StoredEncounterState => Boolean(item) && typeof item === "object")
        .map((item) => [item.id, item]),
    );
  } catch {
    return new Map<string, StoredEncounterState>();
  }
}

function writeEncounterStateMap(stateMap: Map<string, StoredEncounterState>) {
  try {
    localStorage.setItem(
      ENCOUNTER_STATE_STORAGE_KEY,
      JSON.stringify(Array.from(stateMap.values())),
    );
  } catch {
    // noop
  }
}

function resolveEncounterState(baseEncounter: AgentEncounter, stateMap: Map<string, StoredEncounterState>) {
  const stored = stateMap.get(baseEncounter.id);
  if (!stored) return baseEncounter;

  const fallbackState = {
    ...toStoredState(baseEncounter),
    history:
      baseEncounter.history.length > 0
        ? baseEncounter.history
        : [
            buildRunSnapshot(
              `${baseEncounter.id}-fallback`,
              baseEncounter.title,
              readAgentPersona(),
              [],
              baseEncounter.chemistryScore,
              Math.max(1, baseEncounter.runCount - 1),
              baseEncounter.updatedAt,
            ),
          ],
  };
  const sanitized = sanitizeStoredEncounterState(stored, fallbackState);
  const history = sanitized.history.filter((run) => run.runCount < sanitized.runCount);

  return encounterFromSnapshot(
    {
      id: baseEncounter.id,
      profileId: baseEncounter.profileId,
      title: baseEncounter.title,
      counterpartLabel: baseEncounter.counterpartLabel,
      avatar: baseEncounter.avatar,
      chatId: baseEncounter.chatId,
    },
    {
      id: `${baseEncounter.id}-run-${sanitized.runCount}`,
      updatedAt: sanitized.updatedAt,
      runCount: sanitized.runCount,
      status: sanitized.status,
      relationshipStage: sanitized.relationshipStage,
      vibe: sanitized.vibe,
      chemistryScore: sanitized.chemistryScore,
      summary: sanitized.summary,
      sharedTopics: sanitized.sharedTopics,
      frictionPoints: sanitized.frictionPoints,
      suggestedOpener: sanitized.suggestedOpener,
      openerOptions: sanitized.openerOptions,
      selectedOpenerStyle: sanitized.selectedOpenerStyle,
      transcript: sanitized.transcript,
    },
    {
      transcriptHidden: sanitized.transcriptHidden,
      archived: sanitized.archived,
      selectedOpenerStyle: sanitized.selectedOpenerStyle,
    },
    history,
  );
}

function getSourceProfiles() {
  const matchedProfiles = getMatchPreviews()
    .map((match) => mockFeedProfiles.find((profile) => profile.id === match.id.replace("match-", "")))
    .filter((profile): profile is (typeof mockFeedProfiles)[number] => Boolean(profile));

  return matchedProfiles.length > 0 ? matchedProfiles : mockFeedProfiles.slice(0, 3);
}

function getEncounterProfile(profileId: string) {
  return mockFeedProfiles.find((profile) => profile.id === profileId);
}

function getBaseEncounters() {
  const persona = readAgentPersona();
  return getSourceProfiles().map((profile, index) => buildBaseEncounter(profile, index, persona));
}

function updateEncounterState(
  encounterId: string,
  updater: (encounter: AgentEncounter) => AgentEncounter | undefined,
) {
  const encounters = getAgentEncounters();
  const currentEncounter = encounters.find((encounter) => encounter.id === encounterId);
  if (!currentEncounter) return undefined;

  const nextEncounter = updater(currentEncounter);
  const stateMap = readEncounterStateMap();

  if (!nextEncounter) {
    stateMap.set(encounterId, {
      ...toStoredState(currentEncounter),
      deleted: true,
    });
    writeEncounterStateMap(stateMap);
    return undefined;
  }

  stateMap.set(encounterId, toStoredState(nextEncounter));
  writeEncounterStateMap(stateMap);
  return nextEncounter;
}

function nextRunScore(encounter: AgentEncounter, persona: AgentPersona) {
  const seed =
    profileSeed(encounter.profileId) +
    encounter.runCount * 7 +
    persona.voiceStyle.length * 3 +
    persona.humorStyle.length;
  const deltas = [-6, -2, 4, 7, 3];
  return clamp(encounter.chemistryScore + deltas[seed % deltas.length], 56, 96);
}

export function readAgentPersona(): AgentPersona {
  try {
    const raw = localStorage.getItem(PERSONA_STORAGE_KEY);
    if (!raw) return DEFAULT_AGENT_PERSONA;
    return sanitizePersona(JSON.parse(raw));
  } catch {
    return DEFAULT_AGENT_PERSONA;
  }
}

export function writeAgentPersona(persona: AgentPersona): void {
  try {
    localStorage.setItem(PERSONA_STORAGE_KEY, JSON.stringify(persona));
  } catch {
    // noop
  }
}

export function getAgentEncounters(): AgentEncounter[] {
  const baseEncounters = getBaseEncounters();
  const stateMap = readEncounterStateMap();

  return baseEncounters
    .map((encounter) => resolveEncounterState(encounter, stateMap))
    .filter((encounter) => !stateMap.get(encounter.id)?.deleted);
}

export function getAgentEncounterById(encounterId: string): AgentEncounter | undefined {
  return getAgentEncounters().find((encounter) => encounter.id === encounterId);
}

export function rerunAgentEncounter(encounterId: string): AgentEncounter | undefined {
  return updateEncounterState(encounterId, (encounter) => {
    const profile = getEncounterProfile(encounter.profileId);
    if (!profile) return encounter;

    const persona = readAgentPersona();
    const nextRunCount = encounter.runCount + 1;
    const updatedAt = new Date().toISOString();
    const nextRun = buildRunSnapshot(
      encounter.id,
      encounter.title,
      persona,
      profile.interests ?? [],
      nextRunScore(encounter, persona),
      nextRunCount,
      updatedAt,
    );

    return encounterFromSnapshot(
      {
        id: encounter.id,
        profileId: encounter.profileId,
        title: encounter.title,
        counterpartLabel: encounter.counterpartLabel,
        avatar: encounter.avatar,
        chatId: encounter.chatId,
      },
      nextRun,
      {
        transcriptHidden: false,
        archived: false,
        selectedOpenerStyle: nextRun.selectedOpenerStyle,
      },
      [
        {
          id: `${encounter.id}-run-${encounter.runCount}`,
          updatedAt: encounter.updatedAt,
          runCount: encounter.runCount,
          status: encounter.status,
          relationshipStage: encounter.relationshipStage,
          vibe: encounter.vibe,
          chemistryScore: encounter.chemistryScore,
          summary: encounter.summary,
          sharedTopics: encounter.sharedTopics,
          frictionPoints: encounter.frictionPoints,
          suggestedOpener: encounter.suggestedOpener,
          openerOptions: encounter.openerOptions,
          selectedOpenerStyle: encounter.selectedOpenerStyle,
          transcript: encounter.transcript,
        },
        ...encounter.history,
      ],
    );
  });
}

export function toggleAgentEncounterTranscript(encounterId: string): AgentEncounter | undefined {
  return updateEncounterState(encounterId, (encounter) => ({
    ...encounter,
    transcriptHidden: !encounter.transcriptHidden,
  }));
}

export function toggleArchiveAgentEncounter(encounterId: string): AgentEncounter | undefined {
  return updateEncounterState(encounterId, (encounter) => ({
    ...encounter,
    archived: !encounter.archived,
  }));
}

export function deleteAgentEncounter(encounterId: string): void {
  updateEncounterState(encounterId, () => undefined);
}

export function selectAgentEncounterOpener(
  encounterId: string,
  style: HandoffOpenerStyle,
): AgentEncounter | undefined {
  return updateEncounterState(encounterId, (encounter) => {
    const selectedOption = encounter.openerOptions.find((option) => option.style === style);
    if (!selectedOption) return encounter;

    return {
      ...encounter,
      selectedOpenerStyle: style,
      suggestedOpener: selectedOption.opener,
    };
  });
}

export function getAgentChatHandoff(chatId: string): AgentChatHandoff | undefined {
  const encounter = getAgentEncounters().find((item) => item.chatId === chatId);
  if (!encounter) return undefined;

  const selectedOption =
    encounter.openerOptions.find((option) => option.style === encounter.selectedOpenerStyle) ??
    encounter.openerOptions[0];

  return {
    encounterId: encounter.id,
    chatId: encounter.chatId,
    counterpartLabel: encounter.counterpartLabel,
    chemistryScore: encounter.chemistryScore,
    sharedTopics: encounter.sharedTopics,
    frictionPoints: encounter.frictionPoints,
    openerOptions: encounter.openerOptions,
    selectedOpenerStyle: selectedOption?.style ?? "safe",
    selectedOpener: selectedOption?.opener ?? encounter.suggestedOpener,
  };
}

export function getAgentPersonaPreview() {
  const persona = readAgentPersona();
  const { location } = readLocalProfile();

  return {
    title: persona.displayName,
    summary: persona.tagline,
    chips: [persona.voiceStyle, persona.humorStyle, persona.intent, location].filter(Boolean),
  };
}

export function getAgentPersonaPerformance(): AgentPersonaPerformanceSnapshot {
  const persona = readAgentPersona();
  const encounters = getAgentEncounters();
  const totalEncounters = encounters.length;
  const sparkCount = encounters.filter((encounter) => encounter.vibe === "spark").length;
  const sparkRate =
    totalEncounters > 0 ? Math.round((sparkCount / totalEncounters) * 100) : 0;
  const strongestEncounter =
    [...encounters].sort((a, b) => b.chemistryScore - a.chemistryScore)[0] ?? null;

  const topicFrequency = new Map<string, number>();
  const openerFrequency = new Map<HandoffOpenerStyle, number>();

  encounters.forEach((encounter) => {
    encounter.sharedTopics.forEach((topic) => {
      topicFrequency.set(topic, (topicFrequency.get(topic) ?? 0) + 1);
    });
    openerFrequency.set(
      encounter.selectedOpenerStyle,
      (openerFrequency.get(encounter.selectedOpenerStyle) ?? 0) + 1,
    );
  });

  const strongestTopic =
    [...topicFrequency.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Music";
  const bestOpenerStyle =
    [...openerFrequency.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "safe";
  const awkwardCount = encounters.filter((encounter) => encounter.vibe === "awkward").length;
  const momentumLabel =
    sparkCount >= 2
      ? "Strong momentum"
      : awkwardCount >= 2
        ? "Needs tuning"
        : "Finding rhythm";

  const strongestCounterpart =
    strongestEncounter?.counterpartLabel ?? "No encounters yet";

  const insights = [
    {
      title: "Strongest topic",
      detail: `${strongestTopic} is the most reliable way this persona opens chemistry right now.`,
    },
    {
      title: "Tone read",
      detail:
        sparkCount >= awkwardCount
          ? `${persona.voiceStyle} voice with ${persona.flirtingLevel} flirting is landing better than expected.`
          : `${persona.voiceStyle} voice may be reading a little too careful. A sharper opener could help.`,
    },
    {
      title: "Best handoff",
      detail: `${bestOpenerStyle} opener style is the cleanest bridge from agent chemistry into human chat.`,
    },
  ];

  return {
    totalEncounters,
    sparkRateLabel: `${sparkRate}% spark rate`,
    strongestTopic,
    strongestCounterpart,
    bestOpenerStyle,
    momentumLabel,
    insights,
  };
}
