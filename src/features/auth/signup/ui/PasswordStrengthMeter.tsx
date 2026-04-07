import { cn } from "@/shared/lib/cn";

import styles from "./PasswordStrengthMeter.module.css";
import { getPasswordStrength, type PasswordStrength } from "../../signup/model/signupValidation";

const strengthLabels: Record<PasswordStrength, string> = {
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
};

const strengthColors: Record<PasswordStrength, string> = {
  weak: "#fb7185",
  medium: "#fbbf24",
  strong: "#6ee7b7",
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const { level } = getPasswordStrength(password);
  const color = strengthColors[level];

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <div
          className={cn(styles.fill, styles[level])}
          style={{ width: level === "weak" ? "33%" : level === "medium" ? "66%" : "100%" }}
        />
      </div>
      <span
        className={styles.label}
        style={{ color }}
      >
        {strengthLabels[level]}
      </span>
    </div>
  );
}
