import { Profile } from "@/entities/profile/model/types";

import styles from "./ProfileCard.module.css";

interface ProfileCardProps {
  profile: Profile;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
}

export function ProfileCard({ profile, onLike, onDislike }: ProfileCardProps) {
  const mainPhoto = profile.photos?.[0] || "/placeholder-profile.jpg";

  return (
    <div className={styles.card}>
      {/* Two-column body: photo left, all content right */}
      <div className={styles.body}>
        {/* Left: Photo */}
        <div className={styles.photoContainer}>
          <img src={mainPhoto} alt={profile.displayName} className={styles.photo} />
        </div>

        {/* Right: Name + all content */}
        <div className={styles.infoColumn}>
          <h2 className={styles.name}>
            {profile.displayName}
            {profile.age && <span className={styles.age}>, {profile.age}</span>}
          </h2>

          {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>LOCATION</span>
              <span className={styles.metadataValue}>New York, NY</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>OCCUPATION</span>
              <span className={styles.metadataValue}>Product Designer</span>
            </div>
          </div>

          <div className={styles.interests}>
            <span className={styles.sectionLabel}>INTERESTS</span>
            <div className={styles.tags}>
              {["Coffee", "Hiking", "Photography", "Travel"].map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action Bar */}
      <div className={styles.actionBar}>
        <button
          className={`${styles.actionBtn} ${styles.dislikeBtn}`}
          onClick={() => onDislike?.(profile.id)}
          aria-label="Nope"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          NOPE
        </button>
        <button
          className={`${styles.actionBtn} ${styles.likeBtn}`}
          onClick={() => onLike?.(profile.id)}
          aria-label="Like"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          LIKE
        </button>
      </div>
    </div>
  );
}

