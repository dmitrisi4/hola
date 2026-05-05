import { createFileRoute, redirect } from "@tanstack/react-router";

import { AgentEncounterDetailPage } from "@/pages/agents/AgentEncounterDetailPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/agents/$encounterId")({
  beforeLoad: ({ params }) => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: `/agents/${params.encounterId}` },
        replace: true,
      });
    }
  },
  component: AgentEncounterDetailPage,
});
