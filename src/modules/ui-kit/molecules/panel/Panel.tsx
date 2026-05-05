import { cn } from "@/shared/lib/cn";

import styles from "./Panel.module.css";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(styles.panel, className)}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
