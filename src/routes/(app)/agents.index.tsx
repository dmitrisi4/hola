import { createFileRoute } from "@tanstack/react-router";

import { AgentEncountersPage } from "@/pages/agents/AgentEncountersPage";

export const Route = createFileRoute("/(app)/agents/")({
  component: AgentEncountersPage,
});
