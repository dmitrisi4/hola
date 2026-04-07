import { createFileRoute, redirect } from "@tanstack/react-router";

import { ChatsPage } from "@/pages/chats/ChatsPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/chats")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/chats" },
        replace: true,
      });
    }
  },
  component: ChatsPage,
});
