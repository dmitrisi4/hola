import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(app)/agents")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({
        to: "/login",
        search: { redirect: "/agents" },
        replace: true,
      });
    }
  },
  component: () => <Outlet />,
});
