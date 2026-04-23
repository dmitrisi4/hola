import styles from './TopBar.module.css'

export function TopBar({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        {onBack ? (
          <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : (
          <div className={styles.backPlaceholder} />
        )}
        <span className={styles.title}>{title ?? 'Hola'}</span>
        <div className={styles.right} />
      </div>
    </header>
  )
}
