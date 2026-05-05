import { Link } from "@tanstack/react-router";

import { EmptyState } from "@/modules/ui-kit";

import styles from "./ChatList.module.css";

type ChatListItem = {
  id: string;
  title: string;
  subtitle: string;
  avatar: string;
  chatId: string;
};

export function ChatList({ items }: { items: ChatListItem[] }) {
  if (!items.length) {
    return (
      <div className={styles.wrap}>
        <EmptyState
          title="No matches yet"
          description="Start swiping to unlock conversations."
          compact
        />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        {items.map((item) => (
          <Link
            key={item.id}
            to="/chat/$chatId"
            params={{ chatId: item.chatId }}
            className={styles.item}
          >
            <img className={styles.avatar} src={item.avatar} alt="" />
            <div className={styles.body}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.subtitle}>{item.subtitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
