import { createFileRoute, redirect } from "@tanstack/react-router";

import { ProfileEditPage } from "@/pages/profile/ProfileEditPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/profile/edit")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/profile/edit" },
        replace: true,
      });
    }
  },
  component: ProfileEditPage,
});
