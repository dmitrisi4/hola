import { AppShell } from '@/app/layout/AppShell'
import { ChatList } from '@/widgets/chat/ChatList'
import styles from './MatchesPage.module.css'

export function MatchesPage() {
  return (
    <AppShell title="Matches">
      <div className={styles.wrap}>
        <ChatList />
      </div>
    </AppShell>
  )
}
