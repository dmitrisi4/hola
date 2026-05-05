import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { startTransition, useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  deleteAgentEncounter,
  getAgentEncounterById,
  rerunAgentEncounter,
  selectAgentEncounterOpener,
  toggleAgentEncounterTranscript,
  toggleArchiveAgentEncounter,
} from "@/entities/agent/model/localAgentPersona";
import { Button, Chip, EmptyState, Panel, SectionBlock, SegmentedControl } from "@/modules/ui-kit";

import styles from "./AgentEncounterDetailPage.module.css";

function formatFreshness(updatedAt: string) {
  const diffMs = Date.now() - new Date(updatedAt).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / (1000 * 60)));

  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;

  return `${Math.round(diffHours / 24)} days ago`;
}

function statusTone(status: string) {
  if (status === "active") return "emotion" as const;
  if (status === "stalled") return "accent" as const;
  return "default" as const;
}

export function AgentEncounterDetailPage() {
  const navigate = useNavigate();
  const { encounterId } = useParams({ from: "/(app)/agents/$encounterId" });
  const [, setVersion] = useState(0);
  const encounter = getAgentEncounterById(encounterId);

  const refresh = () => {
    startTransition(() => {
      setVersion((current) => current + 1);
    });
  };

  if (!encounter) {
    return (
      <AppShell title="Agent Encounter" onBack={() => navigate({ to: "/agents" })}>
        <EmptyState
          title="Encounter not found"
          description="The requested agent chemistry thread is unavailable."
        />
      </AppShell>
    );
  }

  return (
    <AppShell title={encounter.title} scrollable onBack={() => navigate({ to: "/agents" })}>
      <div className={styles.page}>
        <Panel>
          <div className={styles.hero}>
            <img className={styles.avatar} src={encounter.avatar} alt="" />
            <div className={styles.heroBody}>
              <div className={styles.heroEyebrow}>Chemistry detail</div>
              <h1 className={styles.heroTitle}>{encounter.counterpartLabel}</h1>
              <p className={styles.heroText}>{encounter.summary}</p>
              <div className={styles.heroMeta}>
                <Chip tone="emotion">{encounter.chemistryScore} chemistry</Chip>
                <Chip tone={statusTone(encounter.status)}>{encounter.status}</Chip>
                <Chip tone={encounter.vibe === "spark" ? "emotion" : "accent"}>
                  {encounter.vibe}
                </Chip>
                {encounter.sharedTopics.map((topic) => (
                  <Chip key={topic}>{topic}</Chip>
                ))}
              </div>
              <div className={styles.heroActions}>
                <Button
                  variant="emotion"
                  onClick={() => {
                    rerunAgentEncounter(encounter.id);
                    refresh();
                  }}
                >
                  Rerun encounter
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    toggleArchiveAgentEncounter(encounter.id);
                    refresh();
                  }}
                >
                  {encounter.archived ? "Unarchive" : "Archive"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    deleteAgentEncounter(encounter.id);
                    navigate({ to: "/agents" });
                  }}
                >
                  Delete result
                </Button>
              </div>
            </div>
          </div>
        </Panel>

        <SectionBlock
          title="Encounter lifecycle"
          description="State metadata for this chemistry thread before orchestration becomes backend-driven."
        >
          <div className={styles.lifecycleGrid}>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Relationship stage</div>
              <div className={styles.metaValue}>{encounter.relationshipStage}</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Run count</div>
              <div className={styles.metaValue}>{encounter.runCount}</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Last updated</div>
              <div className={styles.metaValue}>{formatFreshness(encounter.updatedAt)}</div>
            </div>
          </div>
          <div className={styles.lifecycleNotes}>
            <Chip tone={encounter.archived ? "accent" : "default"}>
              {encounter.archived ? "archived" : "live"}
            </Chip>
            {encounter.history.length > 0 ? (
              <span>Previous run available for compare.</span>
            ) : (
              <span>No previous runs yet. Rerun this encounter to compare outcomes.</span>
            )}
          </div>
        </SectionBlock>

        <SectionBlock title="Shared signal" description="The strongest topics and the points where the exchange either opened up or stalled.">
          <div className={styles.grid}>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Shared topics</div>
              <div className={styles.chips}>
                {encounter.sharedTopics.map((topic) => (
                  <Chip key={topic} tone="emotion">
                    {topic}
                  </Chip>
                ))}
              </div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Friction points</div>
              <div className={styles.chips}>
                {encounter.frictionPoints.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Agent transcript"
          description="MVP version: short, visible transcript so the feature feels legible instead of magical."
        >
          <div className={styles.transcriptHeader}>
            <div className={styles.transcriptHint}>
              {encounter.transcriptHidden
                ? "Transcript hidden. The encounter still keeps its score and summary."
                : "Current run transcript is visible."}
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                toggleAgentEncounterTranscript(encounter.id);
                refresh();
              }}
            >
              {encounter.transcriptHidden ? "Show transcript" : "Hide transcript"}
            </Button>
          </div>

          {encounter.transcriptHidden ? (
            <div className={styles.transcriptHiddenCard}>
              <div className={styles.metaLabel}>Transcript hidden</div>
              <div className={styles.metaValue}>You kept the chemistry legible without exposing the full run.</div>
            </div>
          ) : (
            <div className={styles.transcript}>
              {encounter.transcript.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    message.speaker === "mine" ? styles.messageRowMine : ""
                  } ${message.speaker === "system" ? styles.messageRowSystem : ""}`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      message.speaker === "mine"
                        ? styles.messageBubbleMine
                        : message.speaker === "system"
                          ? styles.messageBubbleSystem
                          : ""
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionBlock>

        {encounter.history[0] ? (
          <SectionBlock
            title="Previous run compare"
            description="Local replay view so persona tuning changes stay legible before backend history exists."
          >
            <div className={styles.compareGrid}>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Current run</div>
                <div className={styles.compareRow}>
                  <span>Score</span>
                  <strong>{encounter.chemistryScore}</strong>
                </div>
                <div className={styles.compareRow}>
                  <span>Status</span>
                  <strong>{encounter.status}</strong>
                </div>
                <div className={styles.compareRow}>
                  <span>Top topics</span>
                  <strong>{encounter.sharedTopics.join(", ")}</strong>
                </div>
              </div>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Previous run</div>
                <div className={styles.compareRow}>
                  <span>Score</span>
                  <strong>{encounter.history[0].chemistryScore}</strong>
                </div>
                <div className={styles.compareRow}>
                  <span>Status</span>
                  <strong>{encounter.history[0].status}</strong>
                </div>
                <div className={styles.compareRow}>
                  <span>Top topics</span>
                  <strong>{encounter.history[0].sharedTopics.join(", ")}</strong>
                </div>
              </div>
            </div>
          </SectionBlock>
        ) : null}

        <SectionBlock
          title="Control notes"
          description="This frontend-only phase is about user agency before real orchestration exists."
        >
          <div className={styles.notes}>
            <p className={styles.note}>
              Rerun refreshes chemistry, summary, transcript, and handoff copy using the current persona.
            </p>
            <p className={styles.note}>
              Archive keeps the encounter in the system but marks it as less active. Delete removes it from the local list.
            </p>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Suggested human handoff"
          description="The feature should end by helping the real people talk, not by keeping agents talking forever."
          tone="emotion"
        >
          <div className={styles.handoff}>
            <div className={styles.openerPicker}>
              <div className={styles.metaLabel}>Opener style</div>
              <SegmentedControl
                value={encounter.selectedOpenerStyle}
                onChange={(value) => {
                  selectAgentEncounterOpener(encounter.id, value);
                  refresh();
                }}
                options={encounter.openerOptions.map((option) => ({
                  value: option.style,
                  label: option.label,
                }))}
              />
            </div>
            <p className={styles.opener}>{encounter.suggestedOpener}</p>
            <div className={styles.handoffNotes}>
              <span>What clicked: {encounter.sharedTopics.join(", ")}</span>
              <span>What to avoid: {encounter.frictionPoints[0] ?? "Overexplaining the chemistry"}</span>
            </div>
            <div className={styles.actions}>
              <Link
                className={styles.primaryLink}
                to="/chat/$chatId"
                params={{ chatId: encounter.chatId }}
                onClick={() => {
                  selectAgentEncounterOpener(encounter.id, encounter.selectedOpenerStyle);
                }}
              >
                Open human chat
              </Link>
              <Button variant="ghost" onClick={() => navigate({ to: "/agent-persona" })}>
                Refine my persona
              </Button>
            </div>
          </div>
        </SectionBlock>
      </div>
    </AppShell>
  );
}
