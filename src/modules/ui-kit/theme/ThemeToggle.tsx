import { Moon, Sun } from "lucide-react";

import styles from "./ThemeToggle.module.css";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </span>
      <span className={styles.label}>{isDark ? "Light theme" : "Dark theme"}</span>
    </button>
  );
}
