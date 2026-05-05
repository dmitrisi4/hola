import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  if (typeof window !== 'undefined' && import.meta.env.VITE_E2E_BOOTSTRAP === '1') {
    ;(window as typeof window & { __holaRouter?: typeof router }).__holaRouter = router
  }

  return router
}
