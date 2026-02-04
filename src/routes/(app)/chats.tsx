import { createFileRoute } from "@tanstack/react-router";

import { ChatsPage } from "@/pages/chats/ChatsPage";

export const Route = createFileRoute("/(app)/chats")({
  component: ChatsPage,
});
