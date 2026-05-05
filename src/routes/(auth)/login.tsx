import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { LoginPage } from "@/pages/auth/LoginPage";
import { getAccessToken } from "@/shared/api/http";

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
