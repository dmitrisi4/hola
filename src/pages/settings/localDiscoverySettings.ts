export type ShowMe = 'men' | 'women' | 'everyone'

export interface DiscoverySettings {
  showMe: ShowMe
  ageMin: number
  ageMax: number
  maxDistance: number
  showInDiscovery: boolean
}

const STORAGE_KEY = 'hola_discovery_settings'

export const DEFAULT_DISCOVERY_SETTINGS: DiscoverySettings = {
  showMe: 'women',
  ageMin: 22,
  ageMax: 32,
  maxDistance: 50,
  showInDiscovery: true,
}

function sanitizeSettings(value: unknown): DiscoverySettings {
  if (!value || typeof value !== 'object') return DEFAULT_DISCOVERY_SETTINGS

  const candidate = value as Partial<DiscoverySettings>
  const ageMin = typeof candidate.ageMin === 'number' ? candidate.ageMin : DEFAULT_DISCOVERY_SETTINGS.ageMin
  const ageMax = typeof candidate.ageMax === 'number' ? candidate.ageMax : DEFAULT_DISCOVERY_SETTINGS.ageMax

  return {
    showMe:
      candidate.showMe === 'men' || candidate.showMe === 'women' || candidate.showMe === 'everyone'
        ? candidate.showMe
        : DEFAULT_DISCOVERY_SETTINGS.showMe,
    ageMin,
    ageMax: Math.max(ageMax, ageMin + 1),
    maxDistance:
      typeof candidate.maxDistance === 'number' ? candidate.maxDistance : DEFAULT_DISCOVERY_SETTINGS.maxDistance,
    showInDiscovery:
      typeof candidate.showInDiscovery === 'boolean'
        ? candidate.showInDiscovery
        : DEFAULT_DISCOVERY_SETTINGS.showInDiscovery,
  }
}

export function readDiscoverySettings(): DiscoverySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_DISCOVERY_SETTINGS
    return sanitizeSettings(JSON.parse(raw))
  } catch {
    return DEFAULT_DISCOVERY_SETTINGS
  }
}

export function writeDiscoverySettings(settings: DiscoverySettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // noop
  }
}
