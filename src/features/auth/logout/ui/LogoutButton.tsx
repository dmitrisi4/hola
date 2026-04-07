import { Button } from "@/shared/ui/atoms/button/Button";

import { useLogout } from "../model/useLogout";

export function LogoutButton({
  variant = "default",
  className,
}: {
  variant?: "default" | "primary";
  className?: string;
}) {
  const logout = useLogout();

  return (
    <Button
      variant={variant}
      className={className}
      disabled={logout.isPending}
      onClick={() => logout.mutate()}
    >
      {logout.isPending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
