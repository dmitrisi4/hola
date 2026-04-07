import { createFileRoute, redirect } from "@tanstack/react-router";

import { ChatPage } from "@/pages/chat/ChatPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/chat/$chatId")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/chats" },
        replace: true,
      });
    }
  },
  component: ChatPage,
});
