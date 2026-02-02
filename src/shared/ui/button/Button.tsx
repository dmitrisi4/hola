import { cn } from '@/shared/lib/cn'
import styles from './Button.module.css'

export function Button({
  variant = 'default',
  fullWidth,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'primary'
  fullWidth?: boolean
}) {
  return (
    <button
      {...props}
      className={cn(
        styles.button,
        variant === 'primary' && styles.primary,
        fullWidth && styles.fullWidth,
        className,
      )}
    />
  )
}
