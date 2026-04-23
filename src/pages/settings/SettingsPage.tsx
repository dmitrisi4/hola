import { useState } from 'react'

import { AppShell } from '@/app/layout/AppShell'
import { useAuth } from '@/app/providers/AuthProvider'
import { LogoutButton } from '@/features/auth/logout'

import styles from './SettingsPage.module.css'

/* ─── Types ───────────────────────────────────────────── */
type ShowMe = 'men' | 'women' | 'everyone'

interface DiscoverySettings {
  showMe: ShowMe
  ageMin: number
  ageMax: number
  maxDistance: number
  showInDiscovery: boolean
}

/* ─── Subcomponents ───────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.sectionTitle}>{children}</h3>
}

function SettingsRow({
  icon, label, value, onClick, danger,
}: {
  icon: React.ReactNode
  label: string
  value?: string
  onClick?: () => void
  danger?: boolean
}) {
  return (
    <button className={`${styles.settingsRow} ${danger ? styles.danger : ''}`} onClick={onClick}>
      <span className={styles.settingsIcon}>{icon}</span>
      <span className={styles.settingsLabel}>{label}</span>
      {value && <span className={styles.settingsValue}>{value}</span>}
      {!danger && (
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
    >
      <span className={styles.toggleThumb} />
    </button>
  )
}

/* ─── Page ────────────────────────────────────────────── */
export function SettingsPage() {
  const { userId } = useAuth()

  const [discovery, setDiscovery] = useState<DiscoverySettings>({
    showMe: 'women',
    ageMin: 22,
    ageMax: 32,
    maxDistance: 50,
    showInDiscovery: true,
  })

  return (
    <AppShell title="SETTINGS" scrollable>
      <div className={styles.page}>

        {/* ── Discovery ── */}
        <section className={styles.section}>
          <SectionTitle>Discovery</SectionTitle>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Show me</span>
            <div className={styles.segmented}>
              {(['men', 'women', 'everyone'] as ShowMe[]).map(v => (
                <button
                  key={v}
                  className={`${styles.segmentBtn} ${discovery.showMe === v ? styles.segmentActive : ''}`}
                  onClick={() => setDiscovery(d => ({ ...d, showMe: v }))}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.field} ${styles.fieldColumn}`}>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>Age range</span>
              <span className={styles.fieldMuted}>{discovery.ageMin}–{discovery.ageMax}</span>
            </div>
            <div className={styles.rangeRow}>
              <span className={styles.rangeLabel}>Min</span>
              <input type="range" min={18} max={discovery.ageMax - 1}
                value={discovery.ageMin} className={styles.range}
                onChange={e => setDiscovery(d => ({ ...d, ageMin: +e.target.value }))} />
              <span className={styles.rangeValue}>{discovery.ageMin}</span>
            </div>
            <div className={styles.rangeRow}>
              <span className={styles.rangeLabel}>Max</span>
              <input type="range" min={discovery.ageMin + 1} max={99}
                value={discovery.ageMax} className={styles.range}
                onChange={e => setDiscovery(d => ({ ...d, ageMax: +e.target.value }))} />
              <span className={styles.rangeValue}>{discovery.ageMax}</span>
            </div>
          </div>

          <div className={`${styles.field} ${styles.fieldColumn}`}>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>Maximum distance</span>
              <span className={styles.fieldMuted}>{discovery.maxDistance} km</span>
            </div>
            <div className={styles.rangeRow}>
              <input type="range" min={1} max={160}
                value={discovery.maxDistance} className={styles.range}
                onChange={e => setDiscovery(d => ({ ...d, maxDistance: +e.target.value }))} />
              <span className={styles.rangeValue}>{discovery.maxDistance} km</span>
            </div>
          </div>

          <div className={`${styles.field} ${styles.fieldColumn}`}>
            <div className={styles.fieldRow}>
              <div>
                <span className={styles.fieldLabel}>Show me in Discovery</span>
                <p className={styles.fieldHint}>Disable to stop appearing in other people's stack</p>
              </div>
              <Toggle
                checked={discovery.showInDiscovery}
                onChange={v => setDiscovery(d => ({ ...d, showInDiscovery: v }))}
              />
            </div>
          </div>
        </section>

        {/* ── Account ── */}
        <section className={styles.section}>
          <SectionTitle>Account</SectionTitle>
          <div className={styles.settingsList}>
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
              label="Notifications"
            />
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
              label="Privacy & Safety"
            />
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              label="Email"
              value="alex@example.com"
            />
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.94 19.79 19.79 0 0 1 1.61 1.27 2 2 0 0 1 3.6.09h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.16 6.16l.95-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
              label="Phone number"
              value="+1 (555) 000-0000"
            />
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>}
              label="Share profile"
            />
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
              label="Help & Support"
            />
          </div>
        </section>

        {/* ── Session info ── */}
        {userId && (
          <section className={styles.section}>
            <SectionTitle>Session</SectionTitle>
            <p className={styles.sessionId}>Signed in as {userId.slice(0, 8)}…</p>
          </section>
        )}

        {/* ── Log out ── */}
        <section className={styles.section}>
          <div className={styles.settingsList}>
            <SettingsRow
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>}
              label="Log out"
              danger
              onClick={() => {}}
            />
          </div>
          <div className={styles.logoutBtn}>
            <LogoutButton variant="primary" />
          </div>
        </section>

        <div className={styles.bottomPad} />
      </div>
    </AppShell>
  )
}
