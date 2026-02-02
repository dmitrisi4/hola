import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Button } from '@/shared/ui/atoms/button/Button'
import { Input } from '@/shared/ui/atoms/input/Input'

import styles from './LoginForm.module.css'
import { useLogin } from '../model/useLogin'

export function LoginForm() {
  const router = useRouter()
  const login = useLogin()
  const [email, setEmail] = useState('demo@hola.app')
  const [password, setPassword] = useState('password')

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault()
        await login.mutateAsync({ email, password })
        router.navigate({ to: '/feed' })
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
          autoComplete="current-password"
        />
      </label>

      {login.isError ? (
        <div className={styles.error}>
          {login.error instanceof Error ? login.error.message : 'Login failed'}
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={login.isPending}
        >
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </div>
    </form>
  )
}
