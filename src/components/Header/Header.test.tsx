import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Header from "./Header";

import type { ComponentProps } from "react";

type MockLinkProps = ComponentProps<"a"> & { to: string | URL };

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();

  return {
    ...actual,
    Link: ({ to, children, ...rest }: MockLinkProps) => (
      <a
        href={typeof to === "string" ? to : String(to)}
        {...rest}
      >
        {children}
      </a>
    ),
  };
});

describe("Header", () => {
  it("renders all navigation links", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Feed" })).toBeInTheDocument();
  });

  it("has correct links", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: "Sign Up" })).toHaveAttribute("href", "/signup");
    expect(screen.getByRole("link", { name: "Feed" })).toHaveAttribute("href", "/feed");
  });
});
