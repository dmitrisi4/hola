import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  getAllChats,
  mockChatContacts,
} from "@/entities/chat/model/mockData";
import { Button, Chip, EmptyState, Input } from "@/modules/ui-kit";
import { Modal } from "@/shared/ui/organisms/modal/Modal";

import styles from "./ChatsPage.module.css";

export function ChatsPage() {
  const chats = getAllChats();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [country, setCountry] = useState("Spain");
  const [city, setCity] = useState("Barcelona");

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <AppShell title="Chats">
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div>
              <div className={styles.sidebarTitle}>Chats</div>
              <div className={styles.sidebarMeta}>
                <Chip tone="accent">{chats.length} active threads</Chip>
              </div>
            </div>
            <Button
              className={styles.iconButton}
              type="button"
              variant="primary"
              aria-label="New chat"
              onClick={() => setIsCreateOpen(true)}
            >
              +
            </Button>
          </div>
          <div className={styles.search}>
            <Input type="search" aria-label="Search chats" placeholder="Search conversations" />
          </div>
          <div className={styles.list}>
            {chats.map((chat) => (
              <Link
                key={chat.id}
                to="/chat/$chatId"
                params={{ chatId: chat.id }}
                className={styles.chatItem}
                activeProps={{ className: `${styles.chatItem} ${styles.chatItemActive}` }}
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
              </Link>
            ))}
          </div>
        </aside>

        <section className={styles.thread}>
          <div className={styles.threadContent}>
            <div className={styles.threadMeta}>
              <Chip tone="emotion">Conversation ready</Chip>
              <Chip tone="accent">{chats.length} active threads</Chip>
            </div>
            <EmptyState
              className={styles.empty}
              title="Select a chat and keep the spark moving"
              description="Open any thread from the left column to continue the conversation or start a new group."
            />
          </div>
        </section>
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create group">
        <div className={styles.modalForm}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Group name</span>
            <Input className={styles.input} type="text" placeholder="Enter name" />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Description</span>
            <textarea className={styles.textarea} rows={3} placeholder="What is this group about?" />
          </label>

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Country</span>
              <select
                className={styles.select}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Spain</option>
                <option>USA</option>
                <option>Ukraine</option>
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>City</span>
              <select className={styles.select} value={city} onChange={(e) => setCity(e.target.value)}>
                <option>Barcelona</option>
                <option>Kyiv</option>
                <option>New York</option>
              </select>
            </label>
          </div>

          <div className={styles.contactsBlock}>
            <Input
              className={styles.contactSearch}
              placeholder="Who would you like to add?"
              type="search"
              aria-label="Search contacts"
            />
            <div className={styles.contactsHeader}>Frequent contacts</div>
            <div className={styles.contactsList}>
              {mockChatContacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  className={`${styles.contactItem} ${
                    selectedContacts.includes(contact.id) ? styles.contactItemActive : ""
                  }`}
                  onClick={() => toggleContact(contact.id)}
                >
                  <img className={styles.contactAvatar} src={contact.avatar} alt="" />
                  <div className={styles.contactInfo}>
                    <div className={styles.contactName}>{contact.name}</div>
                    <div className={styles.contactStatus}>{contact.status}</div>
                  </div>
                  <span className={styles.contactCheck}>
                    {selectedContacts.includes(contact.id) ? "●" : "○"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
