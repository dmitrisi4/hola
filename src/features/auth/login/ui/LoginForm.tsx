import { useSearch, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/shared/ui/atoms/button/Button";
import { Input } from "@/shared/ui/atoms/input/Input";

import styles from "./LoginForm.module.css";
import { loginSchema, type LoginFormData } from "../model/loginValidation";
import { useLogin } from "../model/useLogin";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const search = useSearch({ from: "/(auth)/login" });

  const [email, setEmail] = useState("demo@hola.app");
  const [password, setPassword] = useState("password");
  const [fieldErrors, setFieldErrors] = useState<
    Record<keyof LoginFormData, string | undefined>
  >({ email: undefined, password: undefined });
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(): boolean {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return false;
    }
    setFieldErrors({ email: undefined, password: undefined });
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      await login.mutateAsync({ email, password });
      await router.navigate({
        to: search.redirect && search.redirect.startsWith("/") ? search.redirect : "/feed",
        replace: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Wrong email or password";
      setServerError(message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.label}>
        Email
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
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
            if (fieldErrors.password)
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          className={fieldErrors.password ? styles.inputError : ""}
        />
        {fieldErrors.password ? (
          <span className={styles.fieldError}>{fieldErrors.password}</span>
        ) : null}
      </label>

      {serverError ? <div className={styles.error}>{serverError}</div> : null}

      {login.isError && !serverError ? (
        <div className={styles.error}>
          {login.error instanceof Error ? login.error.message : "Login failed"}
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={login.isPending}
        >
          {login.isPending ? "Signing in…" : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
