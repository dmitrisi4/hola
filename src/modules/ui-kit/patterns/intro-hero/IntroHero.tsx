import { cn } from "@/shared/lib/cn";

import styles from "./IntroHero.module.css";

export function IntroHero({
  eyebrow,
  title,
  description,
  meta,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(styles.hero, className)}>
      <div className={styles.copy}>
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.text}>{description}</p> : null}
      </div>
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </div>
  );
}
