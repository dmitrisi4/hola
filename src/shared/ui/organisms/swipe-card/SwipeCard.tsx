import { useDrag } from "@use-gesture/react";
import type React from "react";
import { useState } from "react";
import { animated, useSpring } from "react-spring";

import { clamp } from "@/shared/lib/clamp";

import styles from "./SwipeCard.module.css";

type SwipeDirection = "left" | "right" | "up" | "down";

type SwipeCardProps = {
  index: number;
  onSwipe?: (direction: SwipeDirection) => void;
  children: React.ReactNode;
  background?: string;
};

const SWIPE_THRESHOLD = 120;
const MAX_ROTATION_DEG = 10;

export function SwipeCard({ index, onSwipe, children, background }: SwipeCardProps) {
  const [intent, setIntent] = useState<SwipeDirection | null>(null);
  const [{ x, y, rot, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    config: { tension: 320, friction: 32 },
  }));

  const bind = useDrag(
    ({ active, movement: [mx, my], direction: [dx], down, last }) => {
      const trigger = Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(my) > SWIPE_THRESHOLD;

      if (active) {
        const direction: SwipeDirection | null =
          Math.abs(mx) > Math.abs(my) ? (mx > 0 ? "right" : "left") : my < 0 ? "up" : null;
        setIntent(trigger ? direction : null);
      } else {
        setIntent(null);
      }

      if (last && trigger) {
        const direction: SwipeDirection =
          Math.abs(mx) > Math.abs(my) ? (dx > 0 ? "right" : "left") : my < 0 ? "up" : "down";

        const flyAwayX = clamp(mx * 2, -800, 800);
        const flyAwayY = clamp(my * 2, -800, 800);

        api.start({
          x: flyAwayX,
          y: flyAwayY,
          rot: dx * MAX_ROTATION_DEG,
          scale: 1,
          immediate: false,
          onResolve: () => onSwipe?.(direction),
        });
        return;
      }

      api.start({
        x: active ? mx : 0,
        y: active ? my : 0,
        rot: clamp(mx / 15, -MAX_ROTATION_DEG, MAX_ROTATION_DEG),
        scale: active ? 1.02 : 1,
        immediate: down,
      });
    },
    { filterTaps: true },
  );

  return (
    <animated.article
      className={styles.card}
      style={{
        zIndex: 100 - index,
        x,
        y,
        rotateZ: rot,
        scale,
      }}
      {...bind()}
    >
      {background ? (
        <img
          className={styles.bg}
          src={background}
          alt=""
          draggable={false}
        />
      ) : null}
      <div className={styles.overlay} />
      {intent ? (
        <div
          className={`${styles.badge} ${
            intent === "right" ? styles.like : intent === "left" ? styles.nope : styles.super
          }`}
        >
          {intent === "right" && "LIKE"}
          {intent === "left" && "NOPE"}
          {intent === "up" && "SUPER"}
        </div>
      ) : null}
      {children}
    </animated.article>
  );
}
