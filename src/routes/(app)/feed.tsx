import { createFileRoute } from '@tanstack/react-router'

import { FeedPage } from '@/pages/feed/FeedPage'

export const Route = createFileRoute('/(app)/feed')({
  component: FeedPage,
})
