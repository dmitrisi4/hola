import styles from './TopBar.module.css'

export function TopBar({ title }: { title?: string }) {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.title}>{title ?? 'Hola'}</span>
        <div className={styles.right}>Preview</div>
      </div>
    </header>
  )
}
