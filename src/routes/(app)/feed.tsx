import { createFileRoute, redirect } from "@tanstack/react-router";

import { FeedPage } from "@/pages/feed/FeedPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/feed")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/feed" },
        replace: true,
      });
    }
  },
  component: FeedPage,
});
