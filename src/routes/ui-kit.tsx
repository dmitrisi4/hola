import { createFileRoute } from "@tanstack/react-router";

import { UIKitPage } from "@/pages/ui-kit/UIKitPage";

export const Route = createFileRoute("/ui-kit")({
  component: UIKitPage,
});
