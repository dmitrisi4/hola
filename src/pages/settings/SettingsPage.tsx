import { AppShell } from "@/app/layout/AppShell";
import { useAuth } from "@/app/providers/AuthProvider";
import { LogoutButton } from "@/features/auth/logout";

import styles from "./SettingsPage.module.css";

export function SettingsPage() {
  const { userId } = useAuth();

  return (
    <AppShell title="Settings">
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.title}>App settings</div>
          {userId ? (
            <div className={styles.muted}>Signed in as user: {userId.slice(0, 8)}…</div>
          ) : null}
          <div className={styles.muted}>More settings coming soon.</div>
          <div className={styles.logout}>
            <LogoutButton variant="primary" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
