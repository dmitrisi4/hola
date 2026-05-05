import { Profile } from "@/entities/profile/model/types";
import { Chip } from "@/modules/ui-kit";

import styles from "./ProfileCard.module.css";

interface ProfileCardProps {
  profile: Profile;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
}

export function ProfileCard({ profile, onLike, onDislike }: ProfileCardProps) {
  const mainPhoto = profile.photos?.find(Boolean);
  const details = [
    { label: "Lives in", value: profile.location },
    { label: "Works as", value: profile.occupation },
  ].filter((item) => item.value);
  const interests = profile.interests ?? [];
  const spotlightInterests = interests.slice(0, 3);
  const hiddenInterestsCount = Math.max(interests.length - spotlightInterests.length, 0);
  const identityLine = [profile.occupation, profile.location].filter(Boolean).join(" in ");

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.photoContainer}>
          {mainPhoto ? <img src={mainPhoto} alt={profile.displayName} className={styles.photo} /> : null}
          <div className={styles.photoOverlay}>
            <div className={styles.photoMeta}>
              <Chip tone="accent">Discover now</Chip>
              {profile.occupation ? <Chip>{profile.occupation}</Chip> : null}
            </div>
            {spotlightInterests.length ? (
              <p className={styles.photoCaption}>{spotlightInterests.join(" • ")}</p>
            ) : null}
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>Potential match</div>
            <h2 className={styles.name}>
              {profile.displayName}
              {profile.age && <span className={styles.age}>, {profile.age}</span>}
            </h2>
            {identityLine ? <p className={styles.identityLine}>{identityLine}</p> : null}
            {profile.bio && <p className={styles.bio}>{profile.bio}</p>}
          </div>

          {details.length ? (
            <div className={styles.metadata}>
              {details.map((item) => (
                <div key={item.label} className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>{item.label}</span>
                  <span className={styles.metadataValue}>{item.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          {interests.length ? (
            <div className={styles.interests}>
              <span className={styles.sectionLabel}>Good conversation starters</span>
              <div className={styles.tags}>
                {spotlightInterests.map((tag) => (
                  <Chip key={tag} tone="emotion">
                    {tag}
                  </Chip>
                ))}
                {hiddenInterestsCount > 0 ? <Chip>+{hiddenInterestsCount} more</Chip> : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.actionCopy}>
          <span className={styles.actionTitle}>Move the stack with intent</span>
          <span className={styles.actionHint}>Pass quietly or use the emotional accent only when it is real.</span>
        </div>
        <button
          className={`${styles.actionBtn} ${styles.dislikeBtn}`}
          type="button"
          onClick={() => onDislike?.(profile.id)}
          aria-label={`Pass on ${profile.displayName}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Pass
        </button>
        <button
          className={`${styles.actionBtn} ${styles.likeBtn}`}
          type="button"
          onClick={() => onLike?.(profile.id)}
          aria-label={`Like ${profile.displayName}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Like
        </button>
      </div>
    </div>
  );
}
