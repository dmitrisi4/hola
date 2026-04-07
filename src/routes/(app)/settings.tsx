import { createFileRoute, redirect } from "@tanstack/react-router";

import { SettingsPage } from "@/pages/settings/SettingsPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/settings")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/settings" },
        replace: true,
      });
    }
  },
  component: SettingsPage,
});
