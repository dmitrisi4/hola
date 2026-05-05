import styles from "./GoogleAuthButton.module.css";
import { getGoogleSignInUrl } from "../model/googleAuth";

type GoogleAuthButtonProps = {
  mode: "signin" | "signup";
};

export function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const label = mode === "signin" ? "Continue with Google" : "Sign up with Google";

  return (
    <a className={styles.button} href={getGoogleSignInUrl()}>
      <span aria-hidden="true" className={styles.mark}>
        G
      </span>
      <span className={styles.label}>{label}</span>
    </a>
  );
}
