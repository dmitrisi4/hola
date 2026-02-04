import { Link, useRouterState } from '@tanstack/react-router'

import styles from './BottomNav.module.css'

function isActive(pathname: string, to: string) {
  if (to === '/feed') return pathname === '/feed'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link
          to="/feed"
          className={`${styles.item} ${isActive(pathname, '/feed') ? styles.itemActive : ''}`}
        >
          Feed
        </Link>
        <Link
          to="/matches"
          className={`${styles.item} ${
            isActive(pathname, '/matches') ? styles.itemActive : ''
          }`}
        >
          Matches
        </Link>
        <Link
          to="/chats"
          className={`${styles.item} ${
            isActive(pathname, '/chats') ? styles.itemActive : ''
          }`}
        >
          Chats
        </Link>
        <Link
          to="/profile"
          className={`${styles.item} ${
            isActive(pathname, '/profile') ? styles.itemActive : ''
          }`}
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className={`${styles.item} ${
            isActive(pathname, '/settings') ? styles.itemActive : ''
          }`}
        >
          Settings
        </Link>
      </div>
    </nav>
  )
}
