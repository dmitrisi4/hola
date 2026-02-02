import { Link } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import styles from './LoginPage.module.css';

export function LoginPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Architecture preview screen</p>
        <LoginForm />
        <div className={styles.row}>
          <Link to="/" style={{ color: 'var(--muted)', fontSize: 12 }}>
            Back to landing
          </Link>
          <Link to="/feed" style={{ color: 'var(--accent)', fontSize: 12 }}>
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}
