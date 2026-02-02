import { Link } from '@tanstack/react-router'

import styles from './TopBar.module.css'

export function TopBar({ title }: { title?: string }) {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.title}>
          {title ?? 'Hola'}
        </Link>
        <div className={styles.right}>Preview</div>
      </div>
    </header>
  )
}
