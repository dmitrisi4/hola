import { cn } from "@/shared/lib/cn";

import styles from "./SettingsActionRow.module.css";

export function SettingsActionRow({
  icon,
  label,
  value,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      className={cn(
        styles.row,
        !onClick && styles.static,
        danger && styles.danger,
      )}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
      {value ? <span className={styles.value}>{value}</span> : null}
      {onClick ? (
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      ) : null}
    </Component>
  );
}
