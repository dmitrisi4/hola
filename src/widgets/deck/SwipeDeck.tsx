import { useMemo } from "react";

import type { Profile } from "@/entities/profile/model/types";
import { SwipeCard } from "@/shared/ui/organisms/swipe-card/SwipeCard";

import styles from "./SwipeDeck.module.css";

export function SwipeDeck() {
  const profiles = useMemo<Profile[]>(
    () => [
      {
        id: "p1",
        displayName: "Ava",
        age: 24,
        bio: "Coffee, hikes, and good playlists.",
        photos: [
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop",
        ],
      },
      {
        id: "p2",
        displayName: "Liam",
        age: 27,
        bio: "Product designer. Board games and late-night ramen.",
        photos: [
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&auto=format&fit=crop",
        ],
      },
      {
        id: "p3",
        displayName: "Mia",
        age: 25,
        bio: "Runner & film photography. Let’s explore new coffee spots.",
        photos: [
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop",
        ],
      },
    ],
    []
  );

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
