import styles from './AppShell.module.css'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

export function AppShell({
  title,
  children,
  showBottomNav = true,
  scrollable = false,
  onBack,
}: {
  title?: string
  children: React.ReactNode
  showBottomNav?: boolean
  scrollable?: boolean
  onBack?: () => void
}) {
  const hasBottomNav = showBottomNav

  return (
    <div className={`${styles.shell} ${hasBottomNav ? styles.shellWithBottomNav : ''}`}>
      <TopBar title={title} onBack={onBack} />
      <main
        className={`${styles.main} ${scrollable ? styles.mainScrollable : ''} ${
          hasBottomNav ? styles.mainWithBottomNav : ''
        }`}
      >
        {children}
      </main>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  )
}
