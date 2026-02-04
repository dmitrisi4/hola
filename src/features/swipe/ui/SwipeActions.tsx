import { SwipeDirection } from "@/features/swipe/model/types";
import { Button } from "@/shared/ui/atoms/button/Button";

import styles from "./SwipeActions.module.css";

type SwipeActionsProps = {
  onAction: (direction: SwipeDirection) => void;
  disabled?: boolean;
};

export function SwipeActions({ onAction, disabled }: SwipeActionsProps) {
  return (
    <div className={styles.row}>
      <Button type="button" onClick={() => onAction("left")} disabled={disabled}>
        Nope
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={() => onAction("right")}
        disabled={disabled}
      >
        Like
      </Button>
      <Button type="button" onClick={() => onAction("up")} disabled={disabled}>
        Super
      </Button>
    </div>
  );
}
