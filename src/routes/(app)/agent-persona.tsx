import { createFileRoute, redirect } from "@tanstack/react-router";

import { AgentPersonaPage } from "@/pages/agents/AgentPersonaPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/agent-persona")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/agent-persona" },
        replace: true,
      });
    }
  },
  component: AgentPersonaPage,
});
