import { cn } from "@/shared/lib/cn";

import styles from "./ChoicePills.module.css";

type Option<T extends string> = {
  value: T;
  label: string;
};

export function ChoicePills<T extends string>({
  value,
  onChange,
  options,
  size = "md",
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={cn(styles.grid, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(styles.pill, size === "sm" && styles.small, value === option.value && styles.active)}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
