import { Button } from '@/shared/ui/atoms/button/Button'
import styles from './SwipeActions.module.css'

export function SwipeActions() {
  return (
    <div className={styles.row}>
      <Button type="button">Nope</Button>
      <Button type="button" variant="primary">
        Like
      </Button>
      <Button type="button">Super</Button>
    </div>
  )
}
