import { createFileRoute, redirect } from "@tanstack/react-router";

import { LandingPage } from "@/pages/LandingPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (getAccessToken()) {
      throw redirect({ to: "/feed", replace: true });
    }
  },
  component: LandingPage,
});
