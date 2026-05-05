import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  getAgentEncounters,
  getAgentPersonaPerformance,
  getAgentPersonaPreview,
} from "@/entities/agent/model/localAgentPersona";
import { Chip, EmptyState, IntroHero, Panel, SectionBlock, SegmentedControl } from "@/modules/ui-kit";

import styles from "./AgentEncountersPage.module.css";

import type { AgentEncounter, EncounterStatus } from "@/entities/agent/model/types";

type EncounterFilter = "all" | EncounterStatus;

const FILTER_OPTIONS: { value: EncounterFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "stalled", label: "Stalled" },
];

function formatFreshness(updatedAt: string) {
  const diffMs = Date.now() - new Date(updatedAt).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / (1000 * 60)));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return `${Math.round(diffHours / 24)}d ago`;
}

function statusTone(status: EncounterStatus) {
  if (status === "active") return "emotion";
  if (status === "stalled") return "accent";
  return undefined;
}

function sortEncounters(encounters: AgentEncounter[]) {
  return [...encounters].sort((a, b) => {
    const freshnessDiff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (freshnessDiff !== 0) return freshnessDiff;
    return b.chemistryScore - a.chemistryScore;
  });
}

function getReplayDelta(encounter: AgentEncounter) {
  const previousRun = encounter.history[0];
  if (!previousRun) return null;

  const delta = encounter.chemistryScore - previousRun.chemistryScore;
  if (delta === 0) return "No score change";
  return `${delta > 0 ? "+" : ""}${delta} vs last run`;
}

function EncounterCard({
  encounter,
  compact,
}: {
  encounter: AgentEncounter;
  compact?: boolean;
}) {
  return (
    <Link
      key={encounter.id}
      to="/agents/$encounterId"
      params={{ encounterId: encounter.id }}
      className={`${styles.encounterCard} ${compact ? styles.encounterCardCompact : ""}`}
    >
      <img className={styles.avatar} src={encounter.avatar} alt="" />
      <div className={styles.encounterBody}>
        <div className={styles.encounterTop}>
          <div>
            <div className={styles.encounterTitle}>{encounter.counterpartLabel}</div>
            <div className={styles.encounterSubtitle}>{encounter.summary}</div>
          </div>
          <div className={styles.scoreBlock}>
            <span className={styles.scoreValue}>{encounter.chemistryScore}</span>
            <span className={styles.scoreLabel}>score</span>
          </div>
        </div>
        <div className={styles.lifecycleMeta}>
          <span>{encounter.relationshipStage}</span>
          <span>{encounter.runCount} runs</span>
          <span>{formatFreshness(encounter.updatedAt)}</span>
          {encounter.history.length > 0 ? (
            <span className={styles.deltaText}>{getReplayDelta(encounter)}</span>
          ) : null}
        </div>
        <div className={styles.encounterMeta}>
          <Chip tone={statusTone(encounter.status)}>{encounter.status}</Chip>
          {encounter.archived ? <Chip tone="accent">archived</Chip> : null}
          {encounter.history.length > 0 ? <Chip>history</Chip> : null}
          <Chip tone={encounter.vibe === "spark" ? "emotion" : "accent"}>{encounter.vibe}</Chip>
          <Chip>{encounter.selectedOpenerStyle}</Chip>
          {encounter.sharedTopics.map((topic) => (
            <Chip key={topic}>{topic}</Chip>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function AgentEncountersPage() {
  const navigate = useNavigate();
  const encounters = getAgentEncounters();
  const personaPreview = getAgentPersonaPreview();
  const performance = getAgentPersonaPerformance();
  const [filter, setFilter] = useState<EncounterFilter>("all");
  const { liveEncounters, archivedEncounters, replayEncounters, filteredEncounters } = useMemo(() => {
    const activePool = encounters.filter((encounter) => !encounter.archived);
    const visibleEncounters =
      filter === "all"
        ? activePool
        : activePool.filter((encounter) => encounter.status === filter);

    return {
      liveEncounters: sortEncounters(activePool),
      archivedEncounters: sortEncounters(encounters.filter((encounter) => encounter.archived)),
      replayEncounters: sortEncounters(encounters.filter((encounter) => encounter.history.length > 0)),
      filteredEncounters: sortEncounters(visibleEncounters),
    };
  }, [encounters, filter]);

  return (
    <AppShell title="Agent Encounters" scrollable onBack={() => navigate({ to: "/matches" })}>
      <div className={styles.page}>
        <Panel>
          <IntroHero
            eyebrow="Agent layer"
            title="Let your agents test the chemistry before humans do."
            description="This is the AI-native discovery layer: your social twin meets other agents, checks the vibe, then hands the best openings back to you."
            meta={
              <>
                <Chip tone="emotion">{encounters.length} encounters</Chip>
                <Chip tone="accent">{personaPreview.title}</Chip>
                <Chip>{performance.momentumLabel}</Chip>
              </>
            }
          />
        </Panel>

        <SectionBlock
          title="Your persona"
          description="The current agent personality driving early chemistry checks."
        >
          <div className={styles.personaCard}>
            <div>
              <div className={styles.personaTitle}>{personaPreview.title}</div>
              <p className={styles.personaText}>{personaPreview.summary}</p>
            </div>
            <div className={styles.personaMeta}>
              {personaPreview.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>
            <Link className={styles.inlineLink} to="/agent-persona">
              Edit persona
            </Link>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Inbox overview"
          description="Quick read on what needs attention before you dive into transcripts."
        >
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <div className={styles.overviewLabel}>Live queue</div>
              <div className={styles.overviewValue}>{liveEncounters.length}</div>
              <p className={styles.overviewText}>Encounters currently in circulation, excluding archived ones.</p>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewLabel}>Replay-ready</div>
              <div className={styles.overviewValue}>{replayEncounters.length}</div>
              <p className={styles.overviewText}>Threads with history you can compare against the latest run.</p>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewLabel}>Archived</div>
              <div className={styles.overviewValue}>{archivedEncounters.length}</div>
              <p className={styles.overviewText}>Chemistry threads you kept but moved out of the main flow.</p>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewLabel}>Strongest topic</div>
              <div className={styles.overviewValue}>{performance.strongestTopic}</div>
              <p className={styles.overviewText}>Best handoff style right now: {performance.bestOpenerStyle}.</p>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Live inbox"
          description="The active queue of chemistry threads worth checking before they cool off."
          tone="emotion"
        >
          <div className={styles.controls}>
            <SegmentedControl value={filter} onChange={setFilter} options={FILTER_OPTIONS} />
            <div className={styles.controlHint}>
              {filteredEncounters.length} visible · archived threads are hidden here
            </div>
          </div>

          <div className={styles.encounterList}>
            {filteredEncounters.length > 0 ? (
              filteredEncounters.map((encounter) => <EncounterCard key={encounter.id} encounter={encounter} />)
            ) : (
              <EmptyState
                title="No encounters in this view"
                description="Try another status filter or rerun chemistry from an active match."
              />
            )}
          </div>
        </SectionBlock>

        <SectionBlock
          title="Replay queue"
          description="Encounters with previous runs, so you can see whether persona tuning improved the result."
        >
          <div className={styles.replayList}>
            {replayEncounters.length > 0 ? (
              replayEncounters.map((encounter) => (
                <div key={encounter.id} className={styles.replayRow}>
                  <EncounterCard encounter={encounter} compact />
                  <div className={styles.replaySummary}>
                    <div className={styles.replayLabel}>Replay summary</div>
                    <div className={styles.replayValue}>{getReplayDelta(encounter) ?? "First run only"}</div>
                    <p className={styles.replayText}>
                      Previous status: {encounter.history[0]?.status ?? "n/a"} · current opener:{" "}
                      {encounter.selectedOpenerStyle}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="No replay history yet"
                description="Rerun an encounter from the detail view to start comparing chemistry over time."
              />
            )}
          </div>
        </SectionBlock>

        <SectionBlock
          title="Archived encounters"
          description="Older or paused chemistry threads you kept out of the main inbox."
        >
          <div className={styles.archiveList}>
            {archivedEncounters.length > 0 ? (
              archivedEncounters.map((encounter) => <EncounterCard key={encounter.id} encounter={encounter} compact />)
            ) : (
              <EmptyState
                title="Nothing archived"
                description="Archive an encounter from the detail screen when you want to keep it without leaving it in the live queue."
              />
            )}
          </div>
        </SectionBlock>
      </div>
    </AppShell>
  );
}
