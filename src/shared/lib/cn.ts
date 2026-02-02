export function cn(
  ...parts: Array<string | undefined | null | false | Record<string, boolean>>
) {
  const out: string[] = []

  for (const part of parts) {
    if (!part) continue
    if (typeof part === 'string') {
      out.push(part)
      continue
    }
    for (const [key, value] of Object.entries(part)) {
      if (value) out.push(key)
    }
  }

  return out.join(' ')
}
