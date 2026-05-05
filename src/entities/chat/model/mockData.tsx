import { getDynamicMatchChats } from "@/entities/social/model/demoSocial";

import type { ReactNode } from "react";

export type ChatMessageItem = {
  id: string;
  author: string;
  text?: string;
  image?: string;
  timestamp: string;
  isMine?: boolean;
};

export type ChatThread = {
  id: string;
  title: string;
  avatar: string;
  status: string;
  previewAuthor: string;
  preview: string;
  lastTime: string;
  unread?: number;
  messages: ChatMessageItem[];
};

export type ChatContact = {
  id: string;
  name: string;
  status: string;
  avatar: string;
};

export const mockChats: ChatThread[] = [
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

export const mockChatContacts: ChatContact[] = [
  {
    id: "c1",
    name: "Андрик Life^_^",
    status: "last seen 5 minutes ago",
    avatar: "https://i.pravatar.cc/160?img=24",
  },
  {
    id: "c2",
    name: "Вон Pol",
    status: "online",
    avatar: "https://i.pravatar.cc/160?img=35",
  },
  {
    id: "c3",
    name: "Мама",
    status: "last seen recently",
    avatar: "https://i.pravatar.cc/160?img=48",
  },
  {
    id: "c4",
    name: "Бодя",
    status: "last seen recently",
    avatar: "https://i.pravatar.cc/160?img=52",
  },
];

export function getAllChats(): ChatThread[] {
  return [...getDynamicMatchChats(), ...mockChats];
}

export function getMockChatById(chatId: string): ChatThread | undefined {
  return getAllChats().find((chat) => chat.id === chatId);
}

export function formatChatTimestamp(label: string, dotClassName: string, dateClassName: string): ReactNode {
  const [date, time] = label.split("•").map((part) => part.trim());
  return (
    <>
      <span>{time ?? label}</span>
      <span className={dotClassName}>•</span>
      <span className={dateClassName}>{date}</span>
    </>
  );
}
