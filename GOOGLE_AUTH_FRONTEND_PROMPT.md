# Prompt: Implement Google OAuth2 Frontend Integration

## Context
The backend (Metarhia/Impress) has Google OAuth2 implemented. It uses a combination of **JWT (Access Token)** and **HttpOnly Cookies (Refresh Token)**.

## Task
Implement the Google Auth flow in this frontend (Qwik).

## Technical Specs

### 1. Initiation
- **Endpoint**: `GET http://localhost:8000/api/auth/google/signin`
- **Action**: Redirect the browser directly to this URL.

### 2. Success Handling
- **Callback Route**: `/auth/success`
- **Payload**: Extract `token` and `exp` from query params.
- **Security**: `refreshToken` is handled automatically via HttpOnly cookie (use `credentials: 'include'`).

### 3. Verification
Check `../backend/docs/api-bridge/FRONTEND_ACTION_REQUIRED.md` for more details.
