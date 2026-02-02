import type { Profile } from '../model/types'
import styles from './ProfilePreview.module.css'

export function ProfilePreview({ profile }: { profile: Profile }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.name}>
        {profile.displayName}
        {typeof profile.age === 'number' ? `, ${profile.age}` : ''}
      </div>
      <div className={styles.meta}>{profile.bio ?? 'No bio yet'}</div>
    </div>
  )
}
