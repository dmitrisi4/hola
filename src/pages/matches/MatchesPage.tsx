import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  getAgentEncounters,
  getAgentPersonaPerformance,
} from "@/entities/agent/model/localAgentPersona";
import { getMatchPreviews } from "@/entities/social/model/demoSocial";
import { Chip, IntroHero, Panel, SectionBlock } from "@/modules/ui-kit";
import { ChatList } from "@/widgets/chat/ChatList";

import styles from "./MatchesPage.module.css";

export function MatchesPage() {
  const matches = useMemo(() => getMatchPreviews(), []);
  const agentEncounters = useMemo(() => getAgentEncounters().slice(0, 2), []);
  const agentPerformance = useMemo(() => getAgentPersonaPerformance(), []);

  return (
    <AppShell title="Matches">
      <div className={styles.wrap}>
        <Panel>
          <IntroHero
            eyebrow="Connections"
            title="New chemistry starts here."
            description="Your recent likes that turned into mutual interest. Open a thread and keep the energy moving."
            meta={
              <>
                <Chip tone="emotion">{matches.length} matches</Chip>
                <Chip tone="accent">Ready to chat</Chip>
              </>
            }
          />
        </Panel>

        <SectionBlock
          title="Recent matches"
          description="People who liked you back and are ready for the next message."
          tone="emotion"
        >
          <ChatList items={matches} />
        </SectionBlock>

        <SectionBlock
          title="Agent chemistry"
          description="Your AI social twin can preview the vibe before the real chat starts."
        >
          <div className={styles.agentPerformance}>
            <div className={styles.agentPerformanceCard}>
              <div className={styles.agentPerformanceLabel}>Momentum</div>
              <div className={styles.agentPerformanceValue}>{agentPerformance.momentumLabel}</div>
              <p className={styles.agentPerformanceText}>
                {agentPerformance.sparkRateLabel} across {agentPerformance.totalEncounters} recent encounters.
              </p>
            </div>
            <div className={styles.agentPerformanceCard}>
              <div className={styles.agentPerformanceLabel}>What works</div>
              <div className={styles.agentPerformanceValue}>{agentPerformance.strongestTopic}</div>
              <p className={styles.agentPerformanceText}>
                Best handoff style right now: {agentPerformance.bestOpenerStyle}.
              </p>
            </div>
          </div>
          <div className={styles.agentPreviewList}>
            {agentEncounters.map((encounter) => (
              <Link
                key={encounter.id}
                to="/agents/$encounterId"
                params={{ encounterId: encounter.id }}
                className={styles.agentPreviewCard}
              >
                <div>
                  <div className={styles.agentPreviewTitle}>{encounter.counterpartLabel}</div>
                  <div className={styles.agentPreviewText}>{encounter.summary}</div>
                </div>
                <div className={styles.agentPreviewMeta}>
                  <Chip tone={encounter.vibe === "spark" ? "emotion" : "accent"}>
                    {encounter.vibe}
                  </Chip>
                  <Chip>{encounter.selectedOpenerStyle}</Chip>
                  <Chip>{encounter.chemistryScore} score</Chip>
                </div>
              </Link>
            ))}
            <Link to="/agents" className={styles.agentPreviewLink}>
              Open full agent layer
            </Link>
          </div>
        </SectionBlock>
      </div>
    </AppShell>
  );
}
