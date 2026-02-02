export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export async function login(_req: LoginRequest): Promise<LoginResponse> {
  return { token: 'demo-token' }
}
