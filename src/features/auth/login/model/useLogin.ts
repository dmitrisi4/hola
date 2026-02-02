import { useMutation } from '@tanstack/react-query'

type LoginPayload = {
  email: string
  password: string
}

type LoginResult = {
  token: string
}

async function fakeLogin(payload: LoginPayload): Promise<LoginResult> {
  await new Promise((r) => setTimeout(r, 200))

  if (!payload.email || !payload.password) {
    throw new Error('Missing credentials')
  }

  return { token: 'demo-token' }
}

export function useLogin() {
  return useMutation({
    mutationFn: fakeLogin,
  })
}
