import { AppShell } from '@/app/layout/AppShell'
import { SwipeDeck } from '@/widgets/deck/SwipeDeck'
import { SwipeActions } from '@/features/swipe/ui/SwipeActions'
import { FiltersPanel } from '@/widgets/filters/FiltersPanel'
import styles from './FeedPage.module.css'

export function FeedPage() {
  return (
    <AppShell title="Feed">
      <div className={styles.grid}>
        <FiltersPanel />
        <SwipeDeck />
        <SwipeActions />
      </div>
    </AppShell>
  )
}
  