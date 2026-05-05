import { beforeEach, describe, expect, it } from "vitest";

import { mockFeedProfiles } from "@/entities/profile/model/mockProfiles";

import {
  getAvailableFeedProfiles,
  getDynamicMatchChats,
  getFeedStats,
  getMatchPreviews,
  registerFeedDecision,
} from "./demoSocial";

describe("demoSocial", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns all feed profiles before any decisions", () => {
    expect(getAvailableFeedProfiles()).toHaveLength(mockFeedProfiles.length);
    expect(getFeedStats()).toEqual({ likedCount: 0, passedCount: 0 });
  });

  it("moves liked profiles into matches and chat previews", () => {
    registerFeedDecision("p1", "like");

    expect(getFeedStats()).toEqual({ likedCount: 1, passedCount: 0 });
    expect(getAvailableFeedProfiles().map((profile) => profile.id)).not.toContain("p1");

    const matches = getMatchPreviews();
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({
      id: "match-p1",
      title: "Ava",
      chatId: "match-p1",
    });

    const chats = getDynamicMatchChats();
    expect(chats).toHaveLength(1);
    expect(chats[0]).toMatchObject({
      id: "match-p1",
      title: "Ava",
      status: "New match",
    });
  });

  it("tracks passed profiles separately from likes", () => {
    registerFeedDecision("p2", "pass");

    expect(getFeedStats()).toEqual({ likedCount: 0, passedCount: 1 });
    expect(getAvailableFeedProfiles().map((profile) => profile.id)).not.toContain("p2");
    expect(getMatchPreviews()).toHaveLength(0);
  });
});
