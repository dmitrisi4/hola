import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

import { AppShell } from '@/app/layout/AppShell'
import {
  getAgentPersonaPerformance,
  getAgentPersonaPreview,
} from '@/entities/agent/model/localAgentPersona'
import {
  getLookingForLabel,
  LIFESTYLE_LABELS,
  readLocalProfile,
} from '@/entities/profile/model/localProfile'
import { Button, Chip, SectionBlock } from '@/modules/ui-kit'

import styles from './ProfilePage.module.css'

export function ProfilePage() {
  const navigate = useNavigate()
  const profile = useMemo(() => readLocalProfile(), [])
  const agentPreview = useMemo(() => getAgentPersonaPreview(), [])
  const agentPerformance = useMemo(() => getAgentPersonaPerformance(), [])
  const lifestyle = [
    { label: LIFESTYLE_LABELS.workout, value: profile.workout },
    { label: LIFESTYLE_LABELS.drinking, value: profile.drinking },
    { label: LIFESTYLE_LABELS.smoking, value: profile.smoking },
    { label: LIFESTYLE_LABELS.kids, value: profile.kids },
  ]
  const extraPhotos = profile.photos.filter(Boolean).slice(1) as string[]

  return (
    <AppShell title="Profile" scrollable>
      <div className={styles.page}>
        <div className={styles.hero}>
          <img src={profile.photos[0] ?? ''} alt={profile.displayName} className={styles.heroPhoto} />
          <div className={styles.heroOverlay}>
            <div className={styles.heroName}>
              {profile.displayName}
              <span className={styles.heroAge}>, {profile.age}</span>
            </div>
            <div className={styles.heroLocation}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {profile.location}
            </div>
          </div>
        </div>

        <SectionBlock
          title="Profile snapshot"
          description="A quick read on what people see first when your card appears in discovery."
        >
          <div className={styles.heroMeta}>
            <Chip tone="emotion">{getLookingForLabel(profile.lookingFor)}</Chip>
            <Chip>{profile.location}</Chip>
            <Chip tone="accent">{profile.photos.filter(Boolean).length} photos</Chip>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Agent persona"
          description="The AI social twin that can test chemistry before the human conversation starts."
          className={styles.section}
          tone="emotion"
        >
          <div className={styles.agentCard}>
            <div>
              <div className={styles.agentTitle}>{agentPreview.title}</div>
              <p className={styles.agentText}>{agentPreview.summary}</p>
            </div>
            <div className={styles.agentMeta}>
              {agentPreview.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
              <Chip tone="emotion">{agentPerformance.sparkRateLabel}</Chip>
              <Chip>{agentPerformance.momentumLabel}</Chip>
            </div>
            <div className={styles.agentStats}>
              <div className={styles.agentStat}>
                <span className={styles.agentStatLabel}>Strongest topic</span>
                <span className={styles.agentStatValue}>{agentPerformance.strongestTopic}</span>
              </div>
              <div className={styles.agentStat}>
                <span className={styles.agentStatLabel}>Best handoff</span>
                <span className={styles.agentStatValue}>{agentPerformance.bestOpenerStyle}</span>
              </div>
            </div>
            <div className={styles.agentInsightList}>
              {agentPerformance.insights.slice(0, 2).map((insight) => (
                <div key={insight.title} className={styles.agentInsight}>
                  <div className={styles.agentInsightTitle}>{insight.title}</div>
                  <p className={styles.agentInsightText}>{insight.detail}</p>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="emotion"
              className={styles.agentBtn}
              onClick={() => navigate({ to: '/agent-persona' })}
            >
              Edit agent persona
            </Button>
          </div>
        </SectionBlock>

        {profile.bio ? (
          <SectionBlock
            title="About"
            description="Your short intro and overall vibe."
            className={styles.section}
          >
            <p className={styles.bio}>{profile.bio}</p>
          </SectionBlock>
        ) : null}

        <SectionBlock
          title="Looking for"
          description="Relationship intent shown across discovery and profile surfaces."
          className={styles.section}
          tone="emotion"
        >
          <Chip tone="emotion" className={styles.pill}>{getLookingForLabel(profile.lookingFor)}</Chip>
        </SectionBlock>

        <SectionBlock
          title="Lifestyle"
          description="The details that help people understand day-to-day compatibility."
          className={styles.section}
        >
          <div className={styles.tags}>
            {lifestyle.map((item) => (
              <div key={item.label} className={styles.tag}>
                <span className={styles.tagLabel}>{item.label}</span>
                <span className={styles.tagValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {extraPhotos.length > 0 ? (
          <SectionBlock
            title="More photos"
            description="Extra moments that add context beyond the main profile image."
            className={styles.section}
          >
            <div className={styles.photoGrid}>
              {extraPhotos.map((src, index) => (
                <div key={index} className={styles.photoSlot}>
                  <img src={src} alt="" className={styles.gridPhoto} />
                </div>
              ))}
            </div>
          </SectionBlock>
        ) : null}

        <Button type="button" variant="primary" className={styles.editBtn} onClick={() => navigate({ to: '/profile/edit' })}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit profile & settings
        </Button>

        <div className={styles.bottomPad} />
      </div>
    </AppShell>
  )
}
