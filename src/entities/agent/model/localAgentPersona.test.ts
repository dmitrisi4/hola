import { beforeEach, describe, expect, it } from "vitest";

import {
  deleteAgentEncounter,
  getAgentChatHandoff,
  getAgentEncounterById,
  getAgentEncounters,
  getAgentPersonaPerformance,
  rerunAgentEncounter,
  selectAgentEncounterOpener,
  toggleAgentEncounterTranscript,
  toggleArchiveAgentEncounter,
  writeAgentPersona,
} from "./localAgentPersona";

describe("localAgentPersona encounter controls", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reruns an encounter and preserves the previous run for compare", () => {
    const encounter = getAgentEncounters()[0];
    const rerun = rerunAgentEncounter(encounter.id);

    expect(rerun).toBeDefined();
    expect(rerun?.runCount).toBe(encounter.runCount + 1);
    expect(rerun?.history[0]).toMatchObject({
      runCount: encounter.runCount,
      chemistryScore: encounter.chemistryScore,
      status: encounter.status,
    });
  });

  it("persists transcript visibility and archive toggles", () => {
    const encounter = getAgentEncounters()[0];

    toggleAgentEncounterTranscript(encounter.id);
    toggleArchiveAgentEncounter(encounter.id);

    const updated = getAgentEncounterById(encounter.id);
    expect(updated).toMatchObject({
      transcriptHidden: true,
      archived: true,
    });
  });

  it("removes deleted encounters from the local list", () => {
    const encounter = getAgentEncounters()[0];

    deleteAgentEncounter(encounter.id);

    expect(getAgentEncounterById(encounter.id)).toBeUndefined();
    expect(getAgentEncounters().map((item) => item.id)).not.toContain(encounter.id);
  });

  it("uses the saved persona when a rerun generates the next transcript", () => {
    const encounter = getAgentEncounters()[0];

    writeAgentPersona({
      displayName: "Night Shift Nora",
      tagline: "Sharper on the second pass.",
      voiceStyle: "direct",
      humorStyle: "dry",
      flirtingLevel: "high",
      intent: "relationship",
      favoriteTopics: ["Design", "Food"],
      avoidTopics: ["Work stress"],
      boundaries: "Keep it honest.",
      autoRunAfterMatch: true,
    });

    const rerun = rerunAgentEncounter(encounter.id);

    expect(rerun?.transcript[0]?.content).toContain("Night Shift Nora");
  });

  it("persists the selected handoff opener into the human chat handoff payload", () => {
    const encounter = getAgentEncounters()[0];

    selectAgentEncounterOpener(encounter.id, "direct");

    const handoff = getAgentChatHandoff(encounter.chatId);
    expect(handoff).toMatchObject({
      encounterId: encounter.id,
      selectedOpenerStyle: "direct",
    });
    expect(handoff?.selectedOpener).toBe(
      handoff?.openerOptions.find((option) => option.style === "direct")?.opener,
    );
  });

  it("derives a persona performance snapshot from current encounters", () => {
    const snapshot = getAgentPersonaPerformance();

    expect(snapshot.totalEncounters).toBeGreaterThan(0);
    expect(snapshot.strongestTopic.length).toBeGreaterThan(0);
    expect(snapshot.strongestCounterpart.length).toBeGreaterThan(0);
    expect(snapshot.insights).toHaveLength(3);
  });
});
