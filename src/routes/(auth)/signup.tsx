import { createFileRoute, redirect } from "@tanstack/react-router";

import { getAccessToken } from "@/shared/api/http";
import { SignupPage } from "@/pages/auth/SignupPage";

export const Route = createFileRoute("/(auth)/signup")({
  beforeLoad: () => {
    if (getAccessToken()) {
      throw redirect({ to: "/feed", replace: true });
    }
  },
  component: SignupPage,
});
