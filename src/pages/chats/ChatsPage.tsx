import {
  useMemo,
  useState,
} from "react";

import { AppShell } from "@/app/layout/AppShell";

import styles from "./ChatsPage.module.css";

type Message = {
  id: string;
  author: string;
  text?: string;
  image?: string;
  timestamp: string;
  isMine?: boolean;
};

type Chat = {
  id: string;
  title: string;
  avatar: string;
  status: string;
  previewAuthor: string;
  preview: string;
  lastTime: string;
  unread?: number;
  messages: Message[];
};

const chats: Chat[] = [
  {
    id: "downloader",
    title: "Downloader",
    avatar: "https://i.pravatar.cc/160?img=11",
    status: "1 member",
    previewAuthor: "You",
    preview: "Dropped a link",
    lastTime: "12:04",
    unread: 2,
    messages: [
      {
        id: "m1",
        author: "You",
        text: "MediaMarkt,+CC,+Calle+Nivaria+Tejera,+Av.+Tres+de+Mayo,+2,+38003+Santa+Cruz+de+Tenerife/",
        timestamp: "09 Sep 2025 • 22:01",
        isMine: true,
      },
      {
        id: "m2",
        author: "You",
        text: "Banner & Bastions",
        timestamp: "09 Sep 2025 • 22:01",
        isMine: true,
      },
      {
        id: "m3",
        author: "STRINER",
        text: "Spatiao Ops",
        timestamp: "05 Dec 2025 • 00:53",
      },
      {
        id: "m4",
        author: "STRINER",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop",
        text: "Dhdjfj",
        timestamp: "05 Dec 2025 • 00:54",
      },
    ],
  },
  {
    id: "mybook",
    title: "MyBook",
    avatar: "https://i.pravatar.cc/160?img=32",
    status: "notes • bots",
    previewAuthor: "You",
    preview: "Уникальные разговорные курсы по фильмам",
    lastTime: "13/11/25",
    messages: [
      {
        id: "m1",
        author: "Bot",
        text: "👋 Add your birthday! Let your contacts know when you’re celebrating.",
        timestamp: "13 Nov 2025 • 09:13",
      },
    ],
  },
  {
    id: "friends",
    title: "Friends chat",
    avatar: "https://i.pravatar.cc/160?img=56",
    status: "5 members",
    previewAuthor: "Alex",
    preview: "Dinner tomorrow?",
    lastTime: "Fri",
    unread: 4,
    messages: [
      {
        id: "m1",
        author: "Alex",
        text: "Dinner tomorrow?",
        timestamp: "Fri • 18:45",
      },
      {
        id: "m2",
        author: "You",
        text: "Sure, pick a place!",
        timestamp: "Fri • 18:47",
        isMine: true,
      },
    ],
  },
];

function formatTimestamp(label: string) {
  const [date, time] = label.split("•").map((part) => part.trim());
  return (
    <>
      <span>{time ?? label}</span>
      <span className={styles.dot}>•</span>
      <span className={styles.date}>{date}</span>
    </>
  );
}

export function ChatsPage() {
  const [activeChatId, setActiveChatId] = useState<string>(chats[0]?.id ?? "");
  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId),
    [activeChatId],
  );

  return (
    <AppShell title="Chats">
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarTitle}>Chats</div>
            <button className={styles.iconButton} type="button" aria-label="New chat">
              +
            </button>
          </div>
          <div className={styles.search}>
            <input placeholder="Search" />
          </div>
          <div className={styles.list}>
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  type="button"
                  className={`${styles.chatItem} ${isActive ? styles.chatItemActive : ""}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <img className={styles.avatar} src={chat.avatar} alt="" />
                  <div className={styles.chatBody}>
                    <div className={styles.chatTop}>
                      <span className={styles.chatName}>{chat.title}</span>
                      <span className={styles.chatTime}>{chat.lastTime}</span>
                    </div>
                    <div className={styles.chatBottom}>
                      <span className={styles.previewAuthor}>{chat.previewAuthor}:</span>
                      <span className={styles.previewText}>{chat.preview}</span>
                      {chat.unread ? <span className={styles.badge}>{chat.unread}</span> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className={styles.thread}>
          {activeChat ? (
            <>
              <header className={styles.threadHeader}>
                <div className={styles.threadInfo}>
                  <img className={styles.threadAvatar} src={activeChat.avatar} alt="" />
                  <div>
                    <div className={styles.threadTitle}>{activeChat.title}</div>
                    <div className={styles.threadStatus}>{activeChat.status}</div>
                  </div>
                </div>
                <div className={styles.threadActions}>
                  <button className={styles.iconButton} type="button">
                    ⋯
                  </button>
                </div>
              </header>

              <div className={styles.messages}>
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${
                      message.isMine ? styles.messageOutgoing : styles.messageIncoming
                    }`}
                  >
                    <div className={styles.messageBubble}>
                      {message.text ? <p className={styles.messageText}>{message.text}</p> : null}
                      {message.image ? (
                        <img className={styles.messageImage} src={message.image} alt="" />
                      ) : null}
                      <div className={styles.messageMeta}>{formatTimestamp(message.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.composer}>
                <input type="text" placeholder="Write a message..." />
                <button type="button">Send</button>
              </div>
            </>
          ) : (
            <div className={styles.empty}>Select a chat to start messaging</div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
