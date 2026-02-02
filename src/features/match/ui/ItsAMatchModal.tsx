import styles from './ItsAMatchModal.module.css'

export function ItsAMatchModal({ name }: { name: string }) {
  return (
    <div className={styles.wrap} role="dialog" aria-label="It's a match">
      <div className={styles.title}>It&apos;s a match</div>
      <div className={styles.muted}>You and {name} liked each other.</div>
    </div>
  )
}
