import { cn } from "@/shared/lib/cn";

import styles from "./PreferenceRow.module.css";

export function PreferenceRow({
  label,
  hint,
  value,
  stacked = false,
  className,
  children,
}: {
  label: string;
  hint?: string;
  value?: React.ReactNode;
  stacked?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn(styles.row, stacked && styles.stacked, className)}>
      <div className={styles.main}>
        <div className={styles.copy}>
          <span className={styles.label}>{label}</span>
          {hint ? <p className={styles.hint}>{hint}</p> : null}
        </div>
        {value ? <span className={styles.value}>{value}</span> : null}
      </div>
      {children}
    </div>
  );
}
