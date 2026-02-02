import styles from './UserAvatar.module.css'

export function UserAvatar({
  name,
  src,
}: {
  name: string
  src?: string
}) {
  if (src) {
    return (
      <div className={styles.avatar} aria-label={name}>
        <img className={styles.img} src={src} alt={name} />
      </div>
    )
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return <div className={styles.avatar}>{initials || 'U'}</div>
}
