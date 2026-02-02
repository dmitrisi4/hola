import { ProfilePreview } from '@/entities/profile/ui/ProfilePreview'

import styles from './ProfileCard.module.css'

import type { Profile } from '@/entities/profile/model/types'

const demoProfile: Profile = {
  id: 'me',
  displayName: 'Alex, 27',
  age: 27,
  bio: 'Frontend dev, love coffee and longboarding. Looking for people to explore new cities with.',
  photos: [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop',
  ],
}

export function ProfileCard({ profile = demoProfile }: { profile?: Profile }) {
  return (
    <div className={styles.card}>
      <ProfilePreview profile={profile} />
      {profile.photos?.length ? (
        <div className={styles.photos}>
          {profile.photos.map((src, i) => (
            <img key={src + i} className={styles.photo} src={src} alt={profile.displayName} />
          ))}
        </div>
      ) : null}
      {profile.bio ? <div className={styles.bio}>{profile.bio}</div> : null}
    </div>
  )
}
