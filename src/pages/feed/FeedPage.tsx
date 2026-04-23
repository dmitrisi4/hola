import { useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import { Profile } from "@/entities/profile/model/types";
import { ProfileCard } from "@/features/feed/ui/ProfileCard";

import styles from "./FeedPage.module.css";

const initialProfiles: Profile[] = [
  {
    id: "p1",
    displayName: "Ava",
    age: 24,
    bio: "Coffee enthusiast, weekend hiker, and always searching for the perfect playlist. Let's explore the city together.",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "p2",
    displayName: "Liam",
    age: 27,
    bio: "Product designer by day, board game champion by night. Known for making the best ramen in town.",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "p3",
    displayName: "Mia",
    age: 25,
    bio: "Marathon runner and film photography lover. Always down for a spontaneous road trip and new coffee spots.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "p4",
    displayName: "Noah",
    age: 29,
    bio: "Software engineer with a passion for rock climbing and craft beer. Looking for someone to explore breweries with.",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    ],
  },
];

export function FeedPage() {
  const [profiles] = useState<Profile[]>(initialProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [nopedCount, setNopedCount] = useState(0);

  const currentProfile = profiles[currentIndex];

  const handleLike = (id: string) => {
    console.log("Liked profile:", id);
    setLikedCount((prev) => prev + 1);
    navigateNext();
  };

  const handleDislike = (id: string) => {
    console.log("Disliked profile:", id);
    setNopedCount((prev) => prev + 1);
    navigateNext();
  };

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  // const navigatePrev = () => {
  //   setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  // };

  if (!currentProfile) {
    return (
      <AppShell title="DISCOVER">
        <div className={styles.emptyState}>
          <p>No more profiles to show</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="DISCOVER">
      <div className={styles.container}>
        {/* Navigation Arrows */}
        {/* <button className={styles.navButton} onClick={navigatePrev} aria-label="Previous profile">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button> */}
        <button className={styles.navButtonRight} onClick={navigateNext} aria-label="Next profile">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Counters - Top Right */}
        <div className={styles.counters}>
          <span className={styles.counterItem}>
            <span className={styles.counterValue}>{likedCount}</span>
            <span className={styles.counterLabel}>LIKED</span>
          </span>
          <span className={styles.counterDivider} />
          <span className={styles.counterItem}>
            <span className={styles.counterValue}>{nopedCount}</span>
            <span className={styles.counterLabel}>PASSED</span>
          </span>
        </div>

        {/* Profile Card */}
        <div className={styles.cardWrapper}>
          <ProfileCard
            key={currentProfile.id}
            profile={currentProfile}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>
      </div>
    </AppShell>
  );
}
