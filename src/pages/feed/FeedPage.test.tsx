import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";

import { FeedPage } from "./FeedPage";

vi.mock("@/app/layout/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("FeedPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("increments liked count and advances to the next profile", () => {
    render(<FeedPage />);

    expect(screen.getByText("Ava")).toBeInTheDocument();
    expect(screen.getAllByText("0")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Like Ava" }));

    expect(screen.getByText("Liam")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("shows the empty state after all profiles are consumed", () => {
    render(<FeedPage />);

    fireEvent.click(screen.getByRole("button", { name: "Like Ava" }));
    fireEvent.click(screen.getByRole("button", { name: "Like Liam" }));
    fireEvent.click(screen.getByRole("button", { name: "Like Mia" }));
    fireEvent.click(screen.getByRole("button", { name: "Like Noah" }));

    expect(screen.getByText("You reached the end of the stack")).toBeInTheDocument();
    expect(
      screen.getByText("Check back later or update your preferences to refresh discovery."),
    ).toBeInTheDocument();
  });
});
