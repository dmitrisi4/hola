import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Button } from '@/shared/ui/atoms/button/Button'
import { Input } from '@/shared/ui/atoms/input/Input'

import styles from './SignupForm.module.css'
import { useSignup } from '../model/useSignup'

export function SignupForm() {
  const router = useRouter()
  const signup = useSignup()

  const [email, setEmail] = useState('demo+new@hola.app')
  const [password, setPassword] = useState('password')
  const [confirmPassword, setConfirmPassword] = useState('password')
  const [validationError, setValidationError] = useState<string | null>(null)

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault()
        setValidationError(null)

        if (password !== confirmPassword) {
          setValidationError('Passwords do not match')
          return
        }

        await signup.mutateAsync({ email, password })
        router.navigate({ to: '/login' })
      }}
    >
      <label className={styles.label}>
        Email
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
        />
      </label>

      <label className={styles.label}>
        Password
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>

      <label className={styles.label}>
        Confirm password
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>

      {validationError ? <div className={styles.error}>{validationError}</div> : null}

      {signup.isError ? (
        <div className={styles.error}>
          {signup.error instanceof Error ? signup.error.message : 'Signup failed'}
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={signup.isPending}
        >
          {signup.isPending ? 'Creating account…' : 'Create account'}
        </Button>
      </div>
    </form>
  )
}
