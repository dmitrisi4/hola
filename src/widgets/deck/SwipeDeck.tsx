import { useMemo } from "react";

import type { Profile } from "@/entities/profile/model/types";
import { SwipeCard } from "@/shared/ui/organisms/swipe-card/SwipeCard";

import styles from "./SwipeDeck.module.css";

type PropsType = {
  profiles: Profile[];
};

export function SwipeDeck({ profiles }: PropsType) {
  const handleSwipe = (id: string, direction: "left" | "right" | "up" | "down") => {
    // eslint-disable-next-line no-console
    console.warn("swipe", { id, direction });
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
