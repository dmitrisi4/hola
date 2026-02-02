import { AppShell } from '@/app/layout/AppShell'
import { MessageBubble } from '@/widgets/chat/MessageBubble'
import styles from './ChatPage.module.css'

export function ChatPage() {
  return (
    <AppShell title="Chat">
      <div className={styles.wrap}>
        <div className={styles.messages}>
          <MessageBubble side="left" text="Hey! 👋" timestampMs={Date.now() - 120000} />
          <MessageBubble
            side="right"
            text="Hi! This is a preview chat screen."
            timestampMs={Date.now() - 60000}
          />
          <MessageBubble side="left" text="Wanna grab coffee?" timestampMs={Date.now()} />
        </div>
      </div>
    </AppShell>
  )
}
