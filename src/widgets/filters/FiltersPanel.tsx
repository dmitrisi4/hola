import styles from './FiltersPanel.module.css'

export function FiltersPanel() {
  return (
    <div className={styles.panel}>
      <div>
        <div className={styles.title}>Filters</div>
        <div className={styles.meta}>Distance · Age · Interests</div>
      </div>
      <div className={styles.meta}>Coming soon</div>
    </div>
  )
}
