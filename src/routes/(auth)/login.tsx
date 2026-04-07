import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { getAccessToken } from "@/shared/api/http";
import { LoginPage } from "@/pages/auth/LoginPage";

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/(auth)/login")({
  validateSearch: loginSearchSchema,
  beforeLoad: () => {
    if (getAccessToken()) {
      throw redirect({ to: "/feed", replace: true });
    }
  },
  component: LoginPage,
});
