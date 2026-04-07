import { createFileRoute, redirect } from "@tanstack/react-router";

import { ProfilePage } from "@/pages/profile/ProfilePage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/profile")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/profile" },
        replace: true,
      });
    }
  },
  component: ProfilePage,
});
