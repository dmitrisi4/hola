import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { clearAccessToken, getAccessToken, setAccessToken } from "@/shared/api/http";
import { http } from "@/shared/api/http";

import type { AuthAccess } from "@backend-types/rest";

type AuthState = {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (accessToken: string, userId: string) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "hola_user_id";

function readStoredUserId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeUserId(userId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, userId);
  } catch {
    // Storage unavailable — token will be memory-only
  }
}

function clearStoredUserId(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => readStoredUserId());
  const [isLoading, setIsLoading] = useState(true);
  const initializedRef = useRef(false);

  const accessToken = getAccessToken();
  const isAuthenticated = useMemo(() => !!accessToken && !!userId, [accessToken, userId]);

  // On mount: if we have a stored userId but no token, try refresh
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    async function init() {
      const token = getAccessToken();
      const storedId = readStoredUserId();

      if (!token && storedId) {
        try {
          await refreshAccessInternal();
        } catch {
          clearAccessToken();
          clearStoredUserId();
          setUserId(null);
        }
      }

      setIsLoading(false);
    }

    void init();
  }, []);

  const login = useCallback((token: string, uid: string) => {
    setAccessToken(token);
    setUserId(uid);
    storeUserId(uid);
  }, []);

  const logout = useCallback(async () => {
    try {
      await http<void>("auth/logout", {
        method: "POST",
        context: { skipAuthRefresh: true },
      });
    } catch {
      // Best-effort: clear local state even if server call fails
    } finally {
      clearAccessToken();
      clearStoredUserId();
      setUserId(null);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    await refreshAccessInternal();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      userId,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshSession,
    }),
    [userId, isAuthenticated, isLoading, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

async function refreshAccessInternal(): Promise<string> {
  const response = await http<AuthAccess>("auth/refresh", {
    credentials: "include",
    context: { skipAuthRefresh: true },
  });
  setAccessToken(response.data.accessToken);
  if (response.data.userId) {
    storeUserId(response.data.userId);
  }
  return response.data.accessToken;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
