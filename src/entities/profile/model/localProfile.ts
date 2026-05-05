export type LookingFor = 'relationship' | 'something-casual' | 'new-friends' | 'not-sure'

export type LifestyleKey = 'workout' | 'smoking' | 'drinking' | 'kids'

export interface LocalProfile {
  displayName: string
  age: string
  bio: string
  location: string
  height: string
  lookingFor: LookingFor | ''
  workout: string
  smoking: string
  drinking: string
  kids: string
  photos: (string | null)[]
  email: string
  phone: string
}

const STORAGE_KEY = 'hola_local_profile'

export const DEFAULT_PROFILE: LocalProfile = {
  displayName: 'Alex',
  age: '27',
  bio: 'Frontend dev, love coffee and longboarding. Looking for people to explore new cities with.',
  location: 'New York, NY',
  height: '181 cm',
  lookingFor: 'relationship',
  workout: 'Often',
  smoking: 'Non-smoker',
  drinking: 'Socially',
  kids: 'Want someday',
  photos: [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
    null,
    null,
    null,
    null,
  ],
  email: 'alex@example.com',
  phone: '+1 (555) 000-0000',
}

function normalizePhotos(value: unknown): (string | null)[] {
  if (!Array.isArray(value)) return DEFAULT_PROFILE.photos
  const sanitized = value
    .slice(0, 6)
    .map((item) => (typeof item === 'string' || item === null ? item : null))
  while (sanitized.length < 6) sanitized.push(null)
  return sanitized
}

function sanitizeProfile(value: unknown): LocalProfile {
  if (!value || typeof value !== 'object') return DEFAULT_PROFILE

  const candidate = value as Partial<LocalProfile>

  return {
    displayName: typeof candidate.displayName === 'string' ? candidate.displayName : DEFAULT_PROFILE.displayName,
    age: typeof candidate.age === 'string' ? candidate.age : DEFAULT_PROFILE.age,
    bio: typeof candidate.bio === 'string' ? candidate.bio : DEFAULT_PROFILE.bio,
    location: typeof candidate.location === 'string' ? candidate.location : DEFAULT_PROFILE.location,
    height: typeof candidate.height === 'string' ? candidate.height : DEFAULT_PROFILE.height,
    lookingFor:
      candidate.lookingFor === 'relationship' ||
      candidate.lookingFor === 'something-casual' ||
      candidate.lookingFor === 'new-friends' ||
      candidate.lookingFor === 'not-sure' ||
      candidate.lookingFor === ''
        ? candidate.lookingFor
        : DEFAULT_PROFILE.lookingFor,
    workout: typeof candidate.workout === 'string' ? candidate.workout : DEFAULT_PROFILE.workout,
    smoking: typeof candidate.smoking === 'string' ? candidate.smoking : DEFAULT_PROFILE.smoking,
    drinking: typeof candidate.drinking === 'string' ? candidate.drinking : DEFAULT_PROFILE.drinking,
    kids: typeof candidate.kids === 'string' ? candidate.kids : DEFAULT_PROFILE.kids,
    photos: normalizePhotos(candidate.photos),
    email: typeof candidate.email === 'string' ? candidate.email : DEFAULT_PROFILE.email,
    phone: typeof candidate.phone === 'string' ? candidate.phone : DEFAULT_PROFILE.phone,
  }
}

export function readLocalProfile(): LocalProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILE
    return sanitizeProfile(JSON.parse(raw))
  } catch {
    return DEFAULT_PROFILE
  }
}

export function writeLocalProfile(profile: LocalProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // noop
  }
}

export const LOOKING_FOR_OPTIONS: { value: LookingFor; label: string }[] = [
  { value: 'relationship', label: 'Long-term relationship' },
  { value: 'something-casual', label: 'Something casual' },
  { value: 'new-friends', label: 'New friends' },
  { value: 'not-sure', label: 'Still figuring it out' },
]

export const LIFESTYLE_OPTIONS: Record<LifestyleKey, string[]> = {
  workout: ['Every day', 'Often', 'Sometimes', 'Never'],
  smoking: ['Non-smoker', 'Sometimes', 'Smoker'],
  drinking: ['Never', 'Rarely', 'Socially', 'Frequently'],
  kids: ['Want someday', "Don't want", 'Have & want more', 'Have & done', 'Not sure'],
}

export const LIFESTYLE_LABELS: Record<LifestyleKey, string> = {
  workout: 'Workout',
  smoking: 'Smoking',
  drinking: 'Drinking',
  kids: 'Kids',
}

export function getLookingForLabel(value: LocalProfile['lookingFor']) {
  return LOOKING_FOR_OPTIONS.find((option) => option.value === value)?.label ?? 'Open to new connections'
}
