import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ChatList } from "./ChatList";

import type { ComponentProps } from "react";

type MockLinkProps = ComponentProps<"a"> & { to: string; params?: { chatId: string } };

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();

  return {
    ...actual,
    Link: ({ to, params, children, ...rest }: MockLinkProps) => (
      <a href={params ? to.replace("$chatId", params.chatId) : to} {...rest}>
        {children}
      </a>
    ),
  };
});

describe("ChatList", () => {
  it("renders an empty state when there are no items", () => {
    render(<ChatList items={[]} />);

    expect(screen.getByText("No matches yet")).toBeInTheDocument();
    expect(screen.getByText("Start swiping to unlock conversations.")).toBeInTheDocument();
  });

  it("renders links to chat threads", () => {
    render(
      <ChatList
        items={[
          {
            id: "m1",
            title: "Ava",
            subtitle: "You matched. Say hi.",
            avatar: "https://example.com/avatar.jpg",
            chatId: "match-p1",
          },
        ]}
      />,
    );

    const link = screen.getByRole("link", { name: /ava/i });
    expect(link).toHaveAttribute("href", "/chat/match-p1");
    expect(screen.getByText("You matched. Say hi.")).toBeInTheDocument();
  });
});
