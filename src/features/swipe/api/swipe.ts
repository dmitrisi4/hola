export type SwipeRequest = {
  targetProfileId: string
  action: 'like' | 'nope' | 'super'
}

export async function swipe(_req: SwipeRequest) {
  return { ok: true }
}
