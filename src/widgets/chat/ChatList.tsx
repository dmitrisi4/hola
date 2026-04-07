import styles from "./ChatList.module.css";

export function ChatList() {
  return (
    <div className={styles.wrap}>
      <p className={styles.empty}>No matches yet. Start swiping!</p>
    </div>
  );
}
