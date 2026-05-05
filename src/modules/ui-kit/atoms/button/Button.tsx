import { cn } from "@/shared/lib/cn";

import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "emotion" | "ghost";

export function Button({
  variant = "default",
  fullWidth,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}) {
  return (
    <button
      {...props}
      className={cn(
        styles.button,
        variant === "primary" && styles.primary,
        variant === "emotion" && styles.emotion,
        variant === "ghost" && styles.ghost,
        fullWidth && styles.fullWidth,
        className,
      )}
    />
  );
}
