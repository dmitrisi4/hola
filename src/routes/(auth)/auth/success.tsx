import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { AuthSuccessPage } from "@/pages/auth/AuthSuccessPage";
import { getAccessToken } from "@/shared/api/http";

const authSuccessSearchSchema = z.object({
  token: z.string().optional().catch(undefined),
  exp: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/(auth)/auth/success")({
  validateSearch: authSuccessSearchSchema,
  beforeLoad: ({ search }) => {
    if (getAccessToken() && !search.token) {
      throw redirect({ to: "/feed", replace: true });
    }
  },
  component: AuthSuccessRoute,
});

function AuthSuccessRoute() {
  const search = Route.useSearch();

  return <AuthSuccessPage token={search.token} exp={search.exp} />;
}
