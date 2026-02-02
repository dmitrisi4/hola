import { ProfilePreview } from "@/entities/profile/ui/ProfilePreview";
import styles from "./SwipeDeck.module.css";

export function SwipeDeck() {
  return (
    <section className={styles.deck}>
      <div className={styles.photo} />
      <ProfilePreview
        profile={{
          id: "p1",
          displayName: "Ava",
          age: 24,
          bio: "Coffee, hikes, and good playlists.",
        }}
      />
    </section>
  );
}
