import { Link } from '@tanstack/react-router';

import { GoogleAuthButton } from '@/features/auth/google/ui/GoogleAuthButton';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

import styles from './LoginPage.module.css';

export function LoginPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to continue browsing matches and conversations.</p>
        <div className={styles.oauthBlock}>
          <GoogleAuthButton mode="signin" />
          <div className={styles.divider}>
            <span>or use email</span>
          </div>
        </div>
        <LoginForm />
        <div className={styles.row}>
          <Link to="/" style={{ color: 'var(--muted)', fontSize: 12 }}>
            Back to home
          </Link>
          <Link to="/signup" style={{ color: 'var(--accent)', fontSize: 12 }}>
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
