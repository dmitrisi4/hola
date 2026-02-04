import { AppShell } from "@/app/layout/AppShell";
import { SwipeActions } from "@/features/swipe/ui/SwipeActions";
import { SwipeDeck } from "@/widgets/deck/SwipeDeck";
import { FiltersPanel } from "@/widgets/filters/FiltersPanel";

import styles from "./FeedPage.module.css";
import { Profile } from "@/entities/profile/model/types";

const profiles: Profile[] = [
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
  return (
    <AppShell title="Feed">
      <div className={styles.grid}>
        <FiltersPanel />
        <SwipeDeck profiles={profiles} />
        <SwipeActions />
      </div>
    </AppShell>
  );
}
