import { cn } from '@/shared/lib/cn'
import styles from './Input.module.css'

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(styles.input, className)} />
}
