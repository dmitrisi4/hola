import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthSuccessPage } from "./AuthSuccessPage";

const loginMock = vi.fn();
const navigateMock = vi.fn(async () => undefined);

vi.mock("@/app/providers/useAuth", () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    className,
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
  useNavigate: () => navigateMock,
}));

function createTestJwt(subject: string, expSec: number) {
  const encode = (value: unknown) =>
    Buffer.from(JSON.stringify(value))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

  return `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: subject, exp: expSec })}.signature`;
}

describe("AuthSuccessPage", () => {
  beforeEach(() => {
    loginMock.mockReset();
    navigateMock.mockReset();
    navigateMock.mockResolvedValue(undefined);
  });

  it("logs the user in and navigates to feed when backend returns a valid token", async () => {
    const token = createTestJwt("google-user-42", Math.floor(Date.now() / 1000) + 900);

    render(<AuthSuccessPage token={token} exp={String(Math.floor(Date.now() / 1000) + 900)} />);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(token, "google-user-42");
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/feed", replace: true });
    });
  });

  it("shows an error when backend returns an unreadable token", async () => {
    render(<AuthSuccessPage token="broken.token" exp={String(Math.floor(Date.now() / 1000) + 900)} />);

    expect(
      screen.getByRole("heading", { name: /sign-in could not be completed/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/google sign-in returned an unreadable session token/i),
    ).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });
});
