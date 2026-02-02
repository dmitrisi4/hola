import { AppShell } from "@/app/layout/AppShell";

import styles from "./ChatPage.module.css";

// import { MessageBubble } from '@/widgets/widgets/chat/MessageBubble'

export function ChatPage() {
  return (
    <AppShell title="Chat">
      <div className={styles.wrap}>
        <div className={styles.messages}>
          {/* <MessageBubble side="left" text="Hey! 👋" timestampMs={Date.now() - 120000} />
          <MessageBubble
            side="right"
            text="Hi! This is a preview chat screen."
            timestampMs={Date.now() - 60000}
          />
          <MessageBubble side="left" text="Wanna grab coffee?" timestampMs={Date.now()} /> */}
        </div>
      </div>
    </AppShell>
  );
}
