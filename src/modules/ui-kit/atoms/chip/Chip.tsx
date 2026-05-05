import { cn } from "@/shared/lib/cn";

import styles from "./Chip.module.css";

type ChipTone = "default" | "accent" | "emotion";

export function Chip({
  tone = "default",
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: ChipTone;
}) {
  return (
    <span
      className={cn(
        styles.chip,
        tone === "accent" && styles.accent,
        tone === "emotion" && styles.emotion,
        className,
      )}
    >
      {children}
    </span>
  );
}
