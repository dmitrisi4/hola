import { SwipeDirection } from "@/features/swipe/model/types";
import { SwipeCard } from "@/shared/ui/organisms/swipe-card/SwipeCard";

import styles from "./SwipeDeck.module.css";

import type { Profile } from "@/entities/profile/model/types";

type PropsType = {
  profiles: Profile[];
  onSwipe: (profileId: string, direction: SwipeDirection) => void;
};

export function SwipeDeck({ profiles, onSwipe }: PropsType) {
  const handleSwipe = (id: string, direction: SwipeDirection) => {
    onSwipe(id, direction);
  };

  return (
    <section className={styles.deck}>
      {profiles.map((profile, index) => (
        <SwipeCard
          key={profile.id}
          index={index}
          background={profile.photos?.[0]}
          onSwipe={(direction) => handleSwipe(profile.id, direction)}
        >
          <div className={styles.caption}>
            <div className={styles.captionText}>
              <div className={styles.name}>
                {profile.displayName}
                {profile.age ? `, ${profile.age}` : ""}
              </div>
              {profile.bio ? <div className={styles.bio}>{profile.bio}</div> : null}
            </div>
          </div>
        </SwipeCard>
      ))}
    </section>
  );
}
