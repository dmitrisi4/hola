import { cn } from "@/shared/lib/cn";

import styles from "./EmptyState.module.css";

export function EmptyState({
  title,
  description,
  compact = false,
  className,
}: {
  title: string;
  description?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(styles.state, compact && styles.compact, className)}>
      <div className={styles.inner}>
        <p className={styles.title}>{title}</p>
        {description ? <p className={styles.text}>{description}</p> : null}
      </div>
    </div>
  );
}
