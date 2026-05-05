import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignupPage } from "@/pages/auth/SignupPage";
import { getAccessToken } from "@/shared/api/http";

export const Route = createFileRoute("/(auth)/signup")({
  beforeLoad: () => {
    if (getAccessToken()) {
      throw redirect({ to: "/feed", replace: true });
    }
  },
  component: SignupPage,
});
