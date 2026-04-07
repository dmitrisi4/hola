import { createFileRoute, redirect } from "@tanstack/react-router";

import { MatchesPage } from "@/pages/matches/MatchesPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/matches")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/matches" },
        replace: true,
      });
    }
  },
  component: MatchesPage,
});
