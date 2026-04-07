import { Link } from "@tanstack/react-router";

import { useAuth } from "@/app/providers/AuthProvider";

import styles from "./LandingPage.module.css";

export function LandingPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Server-side safe redirect
    return (
      <div className={styles.wrap}>
        <div className={styles.card}>
          <p>Redirecting to feed…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M32 16c-4 0-8 3-8 8 0 6 8 12 8 12s8-6 8-12c0-5-4-8-8-8z"
              fill="var(--accent)"
              opacity="0.3"
            />
            <circle
              cx="32"
              cy="24"
              r="4"
              fill="var(--accent)"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Hola</h1>
        <p className={styles.subtitle}>
          Discover people, make matches, and start real conversations.
        </p>

        <div className={styles.actions}>
          <Link
            to="/signup"
            className={styles.primaryBtn}
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className={styles.secondaryBtn}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
