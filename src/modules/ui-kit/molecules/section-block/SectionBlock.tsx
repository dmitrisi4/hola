import { cn } from "@/shared/lib/cn";

import styles from "./SectionBlock.module.css";

export function SectionBlock({
  title,
  description,
  className,
  tone = "default",
  children,
}: {
  title?: string;
  description?: string;
  className?: string;
  tone?: "default" | "emotion";
  children: React.ReactNode;
}) {
  return (
    <section className={cn(styles.section, tone === "emotion" && styles.emotion, className)}>
      <div className={styles.content}>
        {title || description ? (
          <div className={styles.header}>
            {title ? <h3 className={styles.title}>{title}</h3> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
