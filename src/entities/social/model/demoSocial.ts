import { mockFeedProfiles } from '@/entities/profile/model/mockProfiles'

import type { Profile } from '@/entities/profile/model/types'

type MatchPreview = {
  id: string
  title: string
  subtitle: string
  avatar: string
  chatId: string
}

type DynamicMatchChat = {
  id: string
  title: string
  avatar: string
  status: string
  previewAuthor: string
  preview: string
  lastTime: string
  unread?: number
  messages: Array<{
    id: string
    author: string
    text?: string
    image?: string
    timestamp: string
    isMine?: boolean
  }>
}

type DemoSocialState = {
  likedProfileIds: string[]
  passedProfileIds: string[]
}

const STORAGE_KEY = 'hola_demo_social'

const DEFAULT_STATE: DemoSocialState = {
  likedProfileIds: [],
  passedProfileIds: [],
}

function readState(): DemoSocialState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const value = JSON.parse(raw) as Partial<DemoSocialState>

    return {
      likedProfileIds: Array.isArray(value.likedProfileIds) ? value.likedProfileIds.filter(Boolean) : [],
      passedProfileIds: Array.isArray(value.passedProfileIds) ? value.passedProfileIds.filter(Boolean) : [],
    }
  } catch {
    return DEFAULT_STATE
  }
}

function writeState(state: DemoSocialState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // noop
  }
}

function findProfile(profileId: string): Profile | undefined {
  return mockFeedProfiles.find((profile) => profile.id === profileId)
}

export function getFeedStats() {
  const state = readState()
  return {
    likedCount: state.likedProfileIds.length,
    passedCount: state.passedProfileIds.length,
  }
}

export function getAvailableFeedProfiles() {
  const state = readState()
  const consumed = new Set([...state.likedProfileIds, ...state.passedProfileIds])
  return mockFeedProfiles.filter((profile) => !consumed.has(profile.id))
}

export function registerFeedDecision(profileId: string, decision: 'like' | 'pass') {
  const state = readState()
  const likedProfileIds = state.likedProfileIds.filter((id) => id !== profileId)
  const passedProfileIds = state.passedProfileIds.filter((id) => id !== profileId)

  if (decision === 'like') likedProfileIds.push(profileId)
  if (decision === 'pass') passedProfileIds.push(profileId)

  writeState({ likedProfileIds, passedProfileIds })
}

export function getMatchPreviews(): MatchPreview[] {
  return readState()
    .likedProfileIds
    .map(findProfile)
    .filter((profile): profile is Profile => Boolean(profile))
    .map((profile) => ({
      id: `match-${profile.id}`,
      title: profile.displayName,
      subtitle: profile.bio ?? 'You matched. Start the conversation.',
      avatar: profile.photos?.[0] ?? '',
      chatId: `match-${profile.id}`,
    }))
}

export function getDynamicMatchChats(): DynamicMatchChat[] {
  return readState()
    .likedProfileIds
    .map(findProfile)
    .filter((profile): profile is Profile => Boolean(profile))
    .map((profile) => ({
      id: `match-${profile.id}`,
      title: profile.displayName,
      avatar: profile.photos?.[0] ?? '',
      status: 'New match',
      previewAuthor: 'Hola',
      preview: 'You matched. Start the conversation.',
      lastTime: 'Now',
      unread: 1,
      messages: [
        {
          id: `intro-${profile.id}`,
          author: 'Hola',
          text: `You and ${profile.displayName} liked each other. Send the first message.`,
          timestamp: 'Now',
        },
      ],
    }))
}
