import { useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import { AppShell } from '@/app/layout/AppShell'
import { useAuth } from '@/app/providers/useAuth'
import { readLocalProfile } from '@/entities/profile/model/localProfile'
import { LogoutButton } from '@/features/auth/logout'
import {
  Chip,
  IntroHero,
  PreferenceRow,
  SectionBlock,
  SegmentedControl,
  SettingsActionRow,
  ToggleSwitch,
} from '@/modules/ui-kit'

import {
  DEFAULT_DISCOVERY_SETTINGS,
  type DiscoverySettings,
  type ShowMe,
  readDiscoverySettings,
  writeDiscoverySettings,
} from './localDiscoverySettings'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  const navigate = useNavigate()
  const { userId } = useAuth()
  const profile = useMemo(() => readLocalProfile(), [])
  const [discovery, setDiscovery] = useState<DiscoverySettings>(() => readDiscoverySettings())

  useEffect(() => {
    writeDiscoverySettings(discovery)
  }, [discovery])

  return (
    <AppShell title="Settings" scrollable>
      <div className={styles.page}>
        <SectionBlock>
          <IntroHero
            eyebrow="Preferences"
            title="Shape who you meet and how your profile appears."
            description="Tune discovery, visibility, and account details without leaving the product flow."
            meta={
              <>
                <Chip tone="accent">{discovery.maxDistance} km radius</Chip>
                <Chip tone={discovery.showInDiscovery ? 'emotion' : 'accent'}>
                  {discovery.showInDiscovery ? 'Visible in discovery' : 'Hidden from discovery'}
                </Chip>
              </>
            }
          />
        </SectionBlock>

        <SectionBlock
          title="Discovery"
          description="Control match preferences and how far the app should search."
        >
          <div className={styles.sectionBody}>
          <PreferenceRow label="Show me">
            <SegmentedControl
              value={discovery.showMe}
              onChange={(value) => setDiscovery((prev) => ({ ...prev, showMe: value as ShowMe }))}
              options={[
                { value: 'men', label: 'Men' },
                { value: 'women', label: 'Women' },
                { value: 'everyone', label: 'Everyone' },
              ]}
            />
          </PreferenceRow>

          <PreferenceRow label="Age range" value={`${discovery.ageMin}-${discovery.ageMax}`} stacked>
            <div className={styles.fieldRow}>
              <span className={styles.rangeLabel}>Min</span>
              <input
                type="range"
                min={18}
                max={discovery.ageMax - 1}
                value={discovery.ageMin}
                className={styles.range}
                onChange={(event) => setDiscovery((prev) => ({ ...prev, ageMin: Number(event.target.value) }))}
              />
              <span className={styles.rangeValue}>{discovery.ageMin}</span>
            </div>
            <div className={styles.rangeRow}>
              <span className={styles.rangeLabel}>Max</span>
              <input
                type="range"
                min={discovery.ageMin + 1}
                max={99}
                value={discovery.ageMax}
                className={styles.range}
                onChange={(event) => setDiscovery((prev) => ({ ...prev, ageMax: Number(event.target.value) }))}
              />
              <span className={styles.rangeValue}>{discovery.ageMax}</span>
            </div>
          </PreferenceRow>

          <PreferenceRow label="Maximum distance" value={`${discovery.maxDistance} km`} stacked>
            <div className={styles.rangeRow}>
              <input
                type="range"
                min={1}
                max={160}
                value={discovery.maxDistance}
                className={styles.range}
                onChange={(event) =>
                  setDiscovery((prev) => ({ ...prev, maxDistance: Number(event.target.value) }))
                }
              />
              <span className={styles.rangeValue}>{discovery.maxDistance} km</span>
            </div>
          </PreferenceRow>

          <PreferenceRow
            label="Show me in Discovery"
            hint="Disable to stop appearing in other people's stack"
          >
            <ToggleSwitch
              checked={discovery.showInDiscovery}
              onChange={(value) => setDiscovery((prev) => ({ ...prev, showInDiscovery: value }))}
            />
          </PreferenceRow>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Account"
          description="Core profile details and quick account-level actions."
        >
          <div className={styles.settingsList}>
            <SettingsActionRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>}
              label="Edit profile"
              value={profile.displayName}
              onClick={() => navigate({ to: '/profile/edit' })}
            />
            <SettingsActionRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
              label="Email"
              value={profile.email}
            />
            <SettingsActionRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.94 19.79 19.79 0 0 1 1.61 1.27 2 2 0 0 1 3.6.09h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.16 6.16l.95-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
              label="Phone number"
              value={profile.phone}
            />
            <SettingsActionRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="M2 12h20" /></svg>}
              label="Reset discovery filters"
              onClick={() => setDiscovery(DEFAULT_DISCOVERY_SETTINGS)}
            />
          </div>
        </SectionBlock>

        {userId ? (
          <SectionBlock
            title="Session"
            description="Local auth state for the current signed-in user."
          >
            <p className={styles.sessionId}>Signed in as {userId.slice(0, 8)}…</p>
          </SectionBlock>
        ) : null}

        <SectionBlock
          title="Account actions"
          description="Security and sign-out controls."
          tone="emotion"
        >
          <div className={styles.logoutBtn}>
            <LogoutButton variant="primary" />
          </div>
        </SectionBlock>

        <div className={styles.bottomPad} />
      </div>
    </AppShell>
  )
}
