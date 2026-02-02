import styles from './AppShell.module.css'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

export function AppShell({
  title,
  children,
  showBottomNav = true,
}: {
  title?: string
  children: React.ReactNode
  showBottomNav?: boolean
}) {
  return (
    <div className={styles.shell}>
      <TopBar title={title} />
      <main className={styles.main}>{children}</main>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  )
}
