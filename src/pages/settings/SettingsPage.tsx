import { AppShell } from '@/app/layout/AppShell'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  return (
    <AppShell title="Settings">
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.title}>App settings</div>
          <div className={styles.muted}>This is a placeholder settings screen.</div>
        </div>
      </div>
    </AppShell>
  )
}
