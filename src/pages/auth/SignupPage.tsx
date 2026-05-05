import { Link } from '@tanstack/react-router'

import { GoogleAuthButton } from '@/features/auth/google/ui/GoogleAuthButton'
import { SignupForm } from '@/features/auth/signup/ui/SignupForm'

import styles from './SignupPage.module.css'

export function SignupPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Join Hola and set up your profile</p>
        <div className={styles.oauthBlock}>
          <GoogleAuthButton mode="signup" />
          <div className={styles.divider}>
            <span>or create with email</span>
          </div>
        </div>
        <SignupForm />
        <div className={styles.row}>
          <Link to="/" style={{ color: 'var(--muted)', fontSize: 12 }}>
            Back to landing
          </Link>
          <Link to="/login" style={{ color: 'var(--accent)', fontSize: 12 }}>
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  )
}
