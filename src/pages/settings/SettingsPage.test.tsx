import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_DISCOVERY_SETTINGS } from "./localDiscoverySettings";
import { SettingsPage } from "./SettingsPage";

const navigateMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@/app/layout/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/app/providers/useAuth", () => ({
  useAuth: () => ({
    userId: "user-12345678",
    isAuthenticated: true,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    refreshSession: vi.fn(),
  }),
}));

vi.mock("@/features/auth/logout", () => ({
  LogoutButton: ({ variant }: { variant?: string }) => <button type="button">{variant ?? "default"} logout</button>,
}));

describe("SettingsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    navigateMock.mockReset();
  });

  it("renders discovery and account sections with current settings", () => {
    render(<SettingsPage />);

    expect(screen.getByText("Shape who you meet and how your profile appears.")).toBeInTheDocument();
    expect(screen.getByText(`${DEFAULT_DISCOVERY_SETTINGS.maxDistance} km radius`)).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Alex")).toBeInTheDocument();
  });

  it("navigates to profile edit and can reset filters", () => {
    render(<SettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));
    expect(navigateMock).toHaveBeenCalledWith({ to: "/profile/edit" });

    fireEvent.click(screen.getByRole("button", { name: /reset discovery filters/i }));
    expect(screen.getByText(`${DEFAULT_DISCOVERY_SETTINGS.maxDistance} km radius`)).toBeInTheDocument();
  });
});
