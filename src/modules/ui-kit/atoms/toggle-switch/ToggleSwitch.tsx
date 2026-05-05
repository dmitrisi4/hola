import { cn } from "@/shared/lib/cn";

import styles from "./ToggleSwitch.module.css";

export function ToggleSwitch({
  checked,
  onChange,
  className,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(styles.toggle, checked && styles.on, className)}
    >
      <span className={styles.thumb} />
    </button>
  );
}
