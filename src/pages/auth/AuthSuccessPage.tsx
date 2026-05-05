import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/app/providers/useAuth";
import { decodeJwtSubject } from "@/features/auth/google/model/googleAuth";

import styles from "./AuthSuccessPage.module.css";

type AuthSuccessPageProps = {
  token?: string;
  exp?: string;
};

export function AuthSuccessPage({ token, exp }: AuthSuccessPageProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const startedRef = useRef(false);
  const [isExpired] = useState(() => (exp ? Number(exp) * 1000 <= Date.now() : false));
  const userId = token ? decodeJwtSubject(token) : null;

  const error =
    !token
      ? "Google sign-in returned without an access token."
      : !userId
        ? "Google sign-in returned an unreadable session token."
        : null;

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (!token || !userId) {
      return;
    }

    login(token, userId);
    void navigate({ to: "/feed", replace: true });
  }, [login, navigate, token, userId]);

  if (!error) {
    return (
      <div className={styles.wrap}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Google Auth</p>
          <h1 className={styles.title}>Finishing sign-in</h1>
          <p className={styles.body}>
            We are attaching your Google session and sending you into the app.
          </p>
          <p className={styles.note}>
            {isExpired
              ? "The returned token is already expired."
              : "This should take a second."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Google Auth</p>
        <h1 className={styles.title}>Sign-in could not be completed</h1>
        <p className={styles.body}>{error}</p>
        {isExpired ? (
          <p className={styles.note}>The backend returned an expired token. Retry the Google flow.</p>
        ) : null}
        <div className={styles.actions}>
          <Link className={styles.primaryAction} to="/login">
            Back to sign in
          </Link>
          <Link className={styles.secondaryAction} to="/signup">
            Create account instead
          </Link>
        </div>
      </div>
    </div>
  );
}
