import { cn } from "@/shared/lib/cn";

import styles from "./SegmentedControl.module.css";

type Option<T extends string> = {
  value: T;
  label: string;
};

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  className?: string;
}) {
  return (
    <div className={cn(styles.segmented, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(styles.button, value === option.value && styles.active)}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
