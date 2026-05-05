import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  DEFAULT_AGENT_PERSONA,
  FLIRTING_LEVEL_OPTIONS,
  getAgentPersonaPerformance,
  HUMOR_STYLE_OPTIONS,
  INTENT_OPTIONS,
  VOICE_STYLE_OPTIONS,
  readAgentPersona,
  writeAgentPersona,
} from "@/entities/agent/model/localAgentPersona";
import {
  Button,
  Chip,
  ChoicePills,
  Input,
  IntroHero,
  PreferenceRow,
  SectionBlock,
  ToggleSwitch,
} from "@/modules/ui-kit";

import styles from "./AgentPersonaPage.module.css";

import type { AgentPersona } from "@/entities/agent/model/types";

function splitTopics(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AgentPersonaPage() {
  const navigate = useNavigate();
  const initialPersona = useMemo(() => readAgentPersona(), []);
  const performance = useMemo(() => getAgentPersonaPerformance(), []);
  const [persona, setPersona] = useState<AgentPersona>(initialPersona);
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");

  const handleSave = () => {
    writeAgentPersona(persona);
    setSaveState("saved");
  };

  const handleReset = () => {
    setPersona(DEFAULT_AGENT_PERSONA);
    setSaveState("idle");
  };

  return (
    <AppShell title="Agent Persona" scrollable onBack={() => navigate({ to: "/profile" })}>
      <div className={styles.page}>
        <SectionBlock>
          <IntroHero
            eyebrow="AI Social Twin"
            title="Shape the version of you that breaks the ice first."
            description="This agent should feel like a socially useful extension of you, not a fake identity. Give it tone, boundaries, and enough personality to test chemistry responsibly."
            meta={
              <>
                <Chip tone="emotion">{persona.flirtingLevel} flirting</Chip>
                <Chip tone="accent">{persona.voiceStyle} voice</Chip>
              </>
            }
          />
        </SectionBlock>

        <SectionBlock title="Core identity" description="The broad tone your agent should carry into early conversations.">
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label} htmlFor="agent-display-name">
                Agent display name
              </label>
              <Input
                id="agent-display-name"
                value={persona.displayName}
                onChange={(event) =>
                  setPersona((current) => ({ ...current, displayName: event.target.value }))
                }
                placeholder="Alex After Hours"
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="agent-tagline">
                Tagline
              </label>
              <textarea
                id="agent-tagline"
                className={styles.textarea}
                rows={3}
                value={persona.tagline}
                onChange={(event) =>
                  setPersona((current) => ({ ...current, tagline: event.target.value }))
                }
                placeholder="Warm, curious, playful, and good at first-contact chemistry."
              />
            </div>
          </div>

          <PreferenceRow label="Voice style">
            <ChoicePills
              value={persona.voiceStyle}
              onChange={(value) =>
                setPersona((current) => ({ ...current, voiceStyle: value }))
              }
              options={VOICE_STYLE_OPTIONS}
            />
          </PreferenceRow>

          <PreferenceRow label="Humor style">
            <ChoicePills
              value={persona.humorStyle}
              onChange={(value) =>
                setPersona((current) => ({ ...current, humorStyle: value }))
              }
              options={HUMOR_STYLE_OPTIONS}
            />
          </PreferenceRow>

          <PreferenceRow label="Relationship intent">
            <ChoicePills
              value={persona.intent}
              onChange={(value) => setPersona((current) => ({ ...current, intent: value }))}
              options={INTENT_OPTIONS}
            />
          </PreferenceRow>

          <PreferenceRow label="Flirting intensity">
            <ChoicePills
              value={persona.flirtingLevel}
              onChange={(value) =>
                setPersona((current) => ({ ...current, flirtingLevel: value }))
              }
              options={FLIRTING_LEVEL_OPTIONS}
              size="sm"
            />
          </PreferenceRow>
        </SectionBlock>

        <SectionBlock title="Topics and boundaries" description="What your agent should move toward, and where it should stay careful.">
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label} htmlFor="favorite-topics">
                Favorite topics
              </label>
              <textarea
                id="favorite-topics"
                className={styles.textarea}
                rows={3}
                value={persona.favoriteTopics.join(", ")}
                onChange={(event) =>
                  setPersona((current) => ({
                    ...current,
                    favoriteTopics: splitTopics(event.target.value),
                  }))
                }
                placeholder="Coffee spots, playlists, travel, live music"
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="avoid-topics">
                Avoid topics
              </label>
              <textarea
                id="avoid-topics"
                className={styles.textarea}
                rows={3}
                value={persona.avoidTopics.join(", ")}
                onChange={(event) =>
                  setPersona((current) => ({
                    ...current,
                    avoidTopics: splitTopics(event.target.value),
                  }))
                }
                placeholder="Work stress, politics, ex drama"
              />
            </div>
          </div>

          <div>
            <label className={styles.label} htmlFor="boundaries">
              Boundaries
            </label>
            <textarea
              id="boundaries"
              className={styles.textarea}
              rows={4}
              value={persona.boundaries}
              onChange={(event) =>
                setPersona((current) => ({ ...current, boundaries: event.target.value }))
              }
              placeholder="Stay playful, avoid manipulation, do not invent facts."
            />
          </div>

          <PreferenceRow
            label="Auto-run after match"
            hint="If enabled, your agent starts a short chemistry check as soon as a match happens."
          >
            <ToggleSwitch
              checked={persona.autoRunAfterMatch}
              onChange={(value) =>
                setPersona((current) => ({ ...current, autoRunAfterMatch: value }))
              }
            />
          </PreferenceRow>
        </SectionBlock>

        <SectionBlock title="Preview" description="This is the flavor your agent currently projects into the product.">
          <div className={styles.preview}>
            <div className={styles.previewTitle}>{persona.displayName}</div>
            <p className={styles.previewText}>{persona.tagline}</p>
            <div className={styles.previewMeta}>
              <Chip tone="accent">{persona.voiceStyle}</Chip>
              <Chip>{persona.humorStyle}</Chip>
              <Chip tone="emotion">{persona.flirtingLevel} flirting</Chip>
              <Chip>{persona.intent}</Chip>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Performance read"
          description="Frontend-only coaching layer based on your recent encounter patterns."
        >
          <div className={styles.performanceGrid}>
            <div className={styles.performanceCard}>
              <div className={styles.performanceLabel}>Momentum</div>
              <div className={styles.performanceValue}>{performance.momentumLabel}</div>
              <p className={styles.performanceText}>{performance.sparkRateLabel}</p>
            </div>
            <div className={styles.performanceCard}>
              <div className={styles.performanceLabel}>Strongest counterpart</div>
              <div className={styles.performanceValue}>{performance.strongestCounterpart}</div>
              <p className={styles.performanceText}>Best topic: {performance.strongestTopic}</p>
            </div>
          </div>

          <div className={styles.insightList}>
            {performance.insights.map((insight) => (
              <div key={insight.title} className={styles.insightCard}>
                <div className={styles.insightTitle}>{insight.title}</div>
                <p className={styles.insightText}>{insight.detail}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <div className={styles.actions}>
          <Button variant="primary" onClick={handleSave}>
            Save persona
          </Button>
          <Button onClick={handleReset}>Reset draft</Button>
          <Button variant="ghost" onClick={() => navigate({ to: "/agents" })}>
            View agent encounters
          </Button>
        </div>

        <p className={styles.statusMessage}>
          {saveState === "saved"
            ? "Agent persona saved locally. This is ready for a frontend-only MVP flow."
            : "Use this builder to define tone, intent, and boundaries before agent encounters run."}
        </p>
      </div>
    </AppShell>
  );
}
