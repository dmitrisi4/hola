import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { LoginPage } from "@/pages/auth/LoginPage";

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/(auth)/login")({
  validateSearch: loginSearchSchema,
  component: LoginPage,
});
