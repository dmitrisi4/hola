import { useNavigate, useParams } from "@tanstack/react-router";
import { startTransition, useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  getAgentChatHandoff,
  selectAgentEncounterOpener,
} from "@/entities/agent/model/localAgentPersona";
import {
  formatChatTimestamp,
  getMockChatById,
} from "@/entities/chat/model/mockData";
import { Button, Chip, EmptyState, SegmentedControl } from "@/modules/ui-kit";

import styles from "./ChatPage.module.css";

export function ChatPage() {
  const navigate = useNavigate();
  const { chatId } = useParams({ from: "/(app)/chat/$chatId" });
  const [, setVersion] = useState(0);
  const chat = getMockChatById(chatId);
  const handoff = getAgentChatHandoff(chatId);
  const [draftState, setDraftState] = useState(() => ({
    chatId,
    value: handoff?.selectedOpener ?? "",
  }));
  const draft = draftState.chatId === chatId ? draftState.value : (handoff?.selectedOpener ?? "");

  const refresh = (nextDraft?: string) => {
    startTransition(() => {
      setVersion((current) => current + 1);
      if (typeof nextDraft === "string") {
        setDraftState({ chatId, value: nextDraft });
      }
    });
  };

  if (!chat) {
    return (
      <AppShell title="Chat" onBack={() => navigate({ to: "/chats" })}>
        <EmptyState
          className={styles.empty}
          title="Chat not found"
          description="The requested conversation is unavailable."
        />
      </AppShell>
    );
  }

  return (
    <AppShell title={chat.title} onBack={() => navigate({ to: "/chats" })}>
      <section className={styles.thread}>
        <header className={styles.threadHeader}>
          <div className={styles.threadInfo}>
            <img className={styles.threadAvatar} src={chat.avatar} alt="" />
            <div>
              <div className={styles.threadTitle}>{chat.title}</div>
              <div className={styles.threadStatus}>{chat.status}</div>
            </div>
          </div>
          <div className={styles.threadActions}>
            <button className={styles.iconButton} type="button" aria-label="More actions">
              ⋯
            </button>
          </div>
        </header>

        {handoff ? (
          <section className={styles.handoffCard}>
            <div className={styles.handoffTop}>
              <div className={styles.handoffTitle}>Agent handoff ready</div>
              <div className={styles.handoffMeta}>
                <Chip tone="emotion">{handoff.chemistryScore} chemistry</Chip>
                <Chip>{handoff.counterpartLabel}</Chip>
              </div>
            </div>
            <p className={styles.handoffText}>
              Your agent already tested the vibe. Pick the opener style you want to carry into the real chat.
            </p>

            <div className={styles.openerChooser}>
              <div className={styles.label}>Opener style</div>
              <SegmentedControl
                value={handoff.selectedOpenerStyle}
                onChange={(value) => {
                  selectAgentEncounterOpener(handoff.encounterId, value);
                  const nextOption = handoff.openerOptions.find((option) => option.style === value);
                  refresh(nextOption?.opener ?? handoff.selectedOpener);
                }}
                options={handoff.openerOptions.map((option) => ({
                  value: option.style,
                  label: option.label,
                }))}
              />
            </div>

            <p className={styles.openerPreview}>{handoff.selectedOpener}</p>

            <div className={styles.hintGrid}>
              <div className={styles.hintCard}>
                <div className={styles.label}>What clicked</div>
                <div className={styles.hintValue}>{handoff.sharedTopics.join(", ")}</div>
              </div>
              <div className={styles.hintCard}>
                <div className={styles.label}>What to avoid</div>
                <div className={styles.hintValue}>
                  {handoff.frictionPoints[0] ?? "Turning the handoff into a long AI recap"}
                </div>
              </div>
            </div>

            <div className={styles.composerActions}>
              <Button
                variant="emotion"
                onClick={() => {
                  setDraftState({ chatId, value: handoff.selectedOpener });
                }}
              >
                Use opener in composer
              </Button>
            </div>
          </section>
        ) : null}

        <div className={styles.messages}>
          {chat.messages.map((message) => (
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
                <div className={styles.messageMeta}>
                  {formatChatTimestamp(message.timestamp, styles.dot, styles.date)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.composer}>
          <input
            className={styles.composerInput}
            type="text"
            aria-label="Write a message"
            placeholder="Write a message..."
            value={draft}
            onChange={(event) => setDraftState({ chatId, value: event.target.value })}
          />
          <div className={styles.composerActions}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setDraftState({ chatId, value: handoff?.selectedOpener ?? "" })}
            >
              Reset
            </Button>
            <Button type="button" variant="emotion" aria-label="Send message">
              Send
            </Button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
