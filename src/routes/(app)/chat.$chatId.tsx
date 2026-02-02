import { createFileRoute } from '@tanstack/react-router'
import { ChatPage } from '@/pages/chat/ChatPage'

export const Route = createFileRoute('/(app)/chat/$chatId')({
  component: ChatPage,
})
