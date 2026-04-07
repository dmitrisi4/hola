import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/shared/ui/atoms/button/Button";
import { Input } from "@/shared/ui/atoms/input/Input";

import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import styles from "./SignupForm.module.css";
import { signupSchema, type SignupFormData } from "../model/signupValidation";
import { useSignup } from "../model/useSignup";

export function SignupForm() {
  const router = useRouter();
  const signup = useSignup();

  const [email, setEmail] = useState("demo+new@hola.app");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignupFormData, string | undefined>>
  >({});
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(): boolean {
    const result = signupSchema.safeParse({ email, password, confirmPassword, acceptTerms });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
        confirmPassword: errors.confirmPassword?.[0],
        acceptTerms: errors.acceptTerms?.[0],
      });
      return false;
    }
    setFieldErrors({});
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      await signup.mutateAsync({ email, password });
      setServerError(null);
      await router.navigate({ to: "/profile", replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setServerError(message);
    }
  }

  function clearFieldError(key: keyof SignupFormData) {
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.label}>
        Email
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearFieldError("email");
          }}
          placeholder="name@example.com"
          autoComplete="email"
          className={fieldErrors.email ? styles.inputError : ""}
        />
        {fieldErrors.email ? (
          <span className={styles.fieldError}>{fieldErrors.email}</span>
        ) : null}
      </label>

      <label className={styles.label}>
        Password
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError("password");
          }}
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          className={fieldErrors.password ? styles.inputError : ""}
        />
        {fieldErrors.password ? (
          <span className={styles.fieldError}>{fieldErrors.password}</span>
        ) : (
          <PasswordStrengthMeter password={password} />
        )}
      </label>

      <label className={styles.label}>
        Confirm password
        <Input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearFieldError("confirmPassword");
          }}
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          className={fieldErrors.confirmPassword ? styles.inputError : ""}
        />
        {fieldErrors.confirmPassword ? (
          <span className={styles.fieldError}>{fieldErrors.confirmPassword}</span>
        ) : null}
      </label>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => {
            setAcceptTerms(e.target.checked);
            clearFieldError("acceptTerms");
          }}
        />
        <span>
          I agree to the{" "}
          <Link to="/" className={styles.link}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/" className={styles.link}>
            Privacy Policy
          </Link>
        </span>
      </label>
      {fieldErrors.acceptTerms ? (
        <span className={styles.fieldError}>{fieldErrors.acceptTerms}</span>
      ) : null}

      {serverError ? <div className={styles.error}>{serverError}</div> : null}

      {signup.isError && !serverError ? (
        <div className={styles.error}>
          {signup.error instanceof Error ? signup.error.message : "Signup failed"}
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={signup.isPending}
        >
          {signup.isPending ? "Creating account…" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
