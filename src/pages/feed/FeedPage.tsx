import {
  useCallback,
  useState,
} from "react";

import { AppShell } from "@/app/layout/AppShell";
import { Profile } from "@/entities/profile/model/types";
import { SwipeDirection } from "@/features/swipe/model/types";
import { SwipeActions } from "@/features/swipe/ui/SwipeActions";
import { SwipeDeck } from "@/widgets/deck/SwipeDeck";
import { FiltersPanel } from "@/widgets/filters/FiltersPanel";

import styles from "./FeedPage.module.css";

const initialProfiles: Profile[] = [
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
];

export function FeedPage() {
  const [deck, setDeck] = useState<Profile[]>(initialProfiles);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [nopedProfiles, setNopedProfiles] = useState<Profile[]>([]);
  const [superLikedProfiles, setSuperLikedProfiles] = useState<Profile[]>([]);

  const handleSwipe = useCallback((profileId: string, direction: SwipeDirection) => {
    setDeck((prevDeck) => {
      const targetProfile = prevDeck.find((profile) => profile.id === profileId);
      if (!targetProfile) {
        return prevDeck;
      }

      if (direction === "right") {
        setLikedProfiles((prev) => [...prev, targetProfile]);
      } else if (direction === "left" || direction === "down") {
        setNopedProfiles((prev) => [...prev, targetProfile]);
      } else if (direction === "up") {
        setSuperLikedProfiles((prev) => [...prev, targetProfile]);
      }

      return prevDeck.filter((profile) => profile.id !== profileId);
    });
  }, []);

  const handleActionClick = useCallback(
    (direction: SwipeDirection) => {
      const currentProfile = deck[0];
      if (!currentProfile) {
        return;
      }
      handleSwipe(currentProfile.id, direction);
    },
    [deck, handleSwipe],
  );

  return (
    <AppShell title="Feed">
      <div className={styles.grid}>
        <FiltersPanel />
        <SwipeDeck profiles={deck} onSwipe={handleSwipe} />
        <SwipeActions onAction={handleActionClick} disabled={!deck.length} />
        <div className={styles.counters}>
          <span>Liked: {likedProfiles.length}</span>
          <span>Nope: {nopedProfiles.length}</span>
          <span>Super: {superLikedProfiles.length}</span>
        </div>
      </div>
    </AppShell>
  );
}
