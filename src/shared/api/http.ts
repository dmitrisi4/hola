export type HttpError = {
  status: number
  message: string
}

async function parseJsonSafe(res: Response) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

export async function http<T>(
  input: string,
  init?: RequestInit,
): Promise<{ data: T; status: number }> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  const payload = await parseJsonSafe(res)

  if (!res.ok) {
    throw {
      status: res.status,
      message:
        (typeof payload === 'object' &&
          payload &&
          'message' in payload &&
          typeof (payload as any).message === 'string' &&
          (payload as any).message) ||
        res.statusText ||
        'Request failed',
    } satisfies HttpError
  }

  return { data: payload as T, status: res.status }
}
