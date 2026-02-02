export type ChatMessage = {
  id: string
  chatId: string
  text: string
  createdAtMs: number
  author: 'me' | 'them'
}

export type ChatPreview = {
  id: string
  title: string
  lastMessage: string
  updatedAtMs: number
}
