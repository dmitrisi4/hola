import { createContext, useContext } from "react";

type AuthState = {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type AuthContextValue = AuthState & {
  login: (accessToken: string, userId: string) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
