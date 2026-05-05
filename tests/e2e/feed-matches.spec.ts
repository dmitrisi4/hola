import { expect, test } from "@playwright/test";

import { bootstrapAppState } from "./support/bootstrap";

test.beforeEach(async ({ page }) => {
  await bootstrapAppState(page, {
    demoSocial: {
      likedProfileIds: [],
      passedProfileIds: [],
    },
  });
});

test("feed like flows into matches and opens chat", async ({ page }) => {
  await page.goto("/feed");

  await expect(
    page.getByRole("heading", { name: /keep the momentum while the chemistry is fresh/i }),
  ).toBeVisible();

  await expect(page.getByText(/profile 1 of 4/i)).toBeVisible();
  await page.getByRole("button", { name: /like ava/i }).click();

  await expect(page.getByText(/profile 2 of 4/i)).toBeVisible();

  await page.getByRole("link", { name: "Matches" }).click();
  await page.waitForURL("**/matches");

  await expect(
    page.getByRole("heading", { name: /new chemistry starts here/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /ava/i }).first()).toBeVisible();

  await page.locator('a[href="/chat/match-p1"]').first().click();
  await page.waitForURL("**/chat/match-p1");

  await expect(page.getByRole("button", { name: /more actions/i })).toBeVisible();
  await expect(page.getByPlaceholder("Write a message...")).toBeVisible();
});
