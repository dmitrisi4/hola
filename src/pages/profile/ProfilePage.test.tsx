import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProfilePage } from "./ProfilePage";

const navigateMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@/app/layout/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("ProfilePage", () => {
  it("renders the profile snapshot and lifestyle sections", () => {
    render(<ProfilePage />);

    expect(screen.getByText("Profile snapshot")).toBeInTheDocument();
    expect(screen.getAllByText("Long-term relationship")).toHaveLength(2);
    expect(screen.getAllByText("Strongest topic").length).toBeGreaterThan(0);
    expect(screen.getByText("Best handoff")).toBeInTheDocument();
    expect(screen.getByText("Lifestyle")).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();
  });

  it("navigates to edit profile when the CTA is clicked", () => {
    render(<ProfilePage />);

    fireEvent.click(screen.getByRole("button", { name: /edit profile & settings/i }));

    expect(navigateMock).toHaveBeenCalledWith({ to: "/profile/edit" });
  });
});
