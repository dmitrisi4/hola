import { createFileRoute, redirect } from "@tanstack/react-router";

import { getAccessToken } from "@/shared/api/http";
import { LandingPage } from "@/pages/LandingPage";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (getAccessToken()) {
      throw redirect({ to: "/feed", replace: true });
    }
  },
  component: LandingPage,
});
