import { useState } from "react";

import { AppShell } from "@/app/layout/AppShell";
import {
  getAvailableFeedProfiles,
  getFeedStats,
  registerFeedDecision,
} from "@/entities/social/model/demoSocial";
import { ProfileCard } from "@/features/feed/ui/ProfileCard";
import { Chip, EmptyState, Panel } from "@/modules/ui-kit";

import styles from "./FeedPage.module.css";

export function FeedPage() {
  const [profiles, setProfiles] = useState(() => getAvailableFeedProfiles());
  const [stats, setStats] = useState(() => getFeedStats());

  const currentProfile = profiles[0];
  const hasNextProfile = profiles.length > 1;
  const totalProfiles = profiles.length + stats.likedCount + stats.passedCount;
  const reviewedCount = stats.likedCount + stats.passedCount;
  const currentPosition = Math.min(reviewedCount + 1, totalProfiles);
  const progressValue = totalProfiles > 0 ? currentPosition / totalProfiles : 0;
  const remainingAfterCurrent = Math.max(profiles.length - 1, 0);

  const navigateNext = () => {
    setProfiles((prev) => prev.slice(1));
  };

  const handleLike = (profileId: string) => {
    registerFeedDecision(profileId, "like");
    setStats((prev) => ({ ...prev, likedCount: prev.likedCount + 1 }));
    navigateNext();
  };

  const handleDislike = (profileId: string) => {
    registerFeedDecision(profileId, "pass");
    setStats((prev) => ({ ...prev, passedCount: prev.passedCount + 1 }));
    navigateNext();
  };

  if (!currentProfile) {
    return (
      <AppShell title="Discover">
        <EmptyState
          className={styles.emptyState}
          title="You reached the end of the stack"
          description="Check back later or update your preferences to refresh discovery."
        />
      </AppShell>
    );
  }

  return (
    <AppShell title="Discover">
      <div className={styles.container}>
        <Panel className={styles.summaryPanel}>
          <div className={styles.summaryHeader}>
            <div className={styles.summaryCopy}>
              <div className={styles.summaryEyebrow}>Discovery</div>
              <h2 className={styles.summaryTitle}>Keep the momentum while the chemistry is fresh.</h2>
              <p className={styles.summaryText}>
                Review profiles, use the emotional accent only when there is real interest, and
                keep your stack moving.
              </p>
            </div>
            <div className={styles.summaryMeta}>
              <Chip tone="accent">
                Profile {currentPosition} of {totalProfiles}
              </Chip>
              <Chip>{remainingAfterCurrent} left after this</Chip>
              <Chip tone="emotion">{stats.likedCount} likes sent</Chip>
            </div>
          </div>
        </Panel>

        <div className={styles.discoveryStage}>
          <div className={styles.stageRail}>
            <div className={styles.stageCopy}>
              <div className={styles.stageEyebrow}>In the stack now</div>
              <p className={styles.stageText}>
                Read the signal, then either keep moving or lean into the spark.
              </p>
              <div className={styles.progressBlock} aria-label="Discovery progress">
                <div className={styles.progressMeta}>
                  <span className={styles.progressLabel}>Stack progress</span>
                  <span className={styles.progressValue}>
                    {currentPosition}/{totalProfiles}
                  </span>
                </div>
                <div className={styles.progressTrack}>
                  <span
                    className={styles.progressFill}
                    style={{ width: `${Math.max(progressValue * 100, 8)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.stageActions}>
              <div className={styles.counters} aria-label="Swipe counters" aria-live="polite">
                <span className={styles.counterItem}>
                  <span className={styles.counterValue}>{stats.likedCount}</span>
                  <span className={styles.counterLabel}>LIKED</span>
                </span>
                <span className={styles.counterDivider} />
                <span className={styles.counterItem}>
                  <span className={styles.counterValue}>{stats.passedCount}</span>
                  <span className={styles.counterLabel}>PASSED</span>
                </span>
              </div>

              <button
                className={styles.navButtonRight}
                type="button"
                onClick={navigateNext}
                aria-label={hasNextProfile ? "Skip to next profile" : "Finish current profile stack"}
              >
                <span className={styles.skipLabel}>{hasNextProfile ? "See next" : "Finish stack"}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.cardWrapper}>
            <ProfileCard
              key={currentProfile.id}
              profile={currentProfile}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
