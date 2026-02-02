import { AppShell } from '@/app/layout/AppShell'

import styles from './MatchesPage.module.css'

import { ChatList } from '@/widgets/chat/ChatList'

export function MatchesPage() {
  return (
    <AppShell title="Matches">
      <div className={styles.wrap}>
        <ChatList />
      </div>
    </AppShell>
  )
}
