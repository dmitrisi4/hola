import { expect, test } from "@playwright/test";

import { bootstrapAppState } from "./support/bootstrap";

test.beforeEach(async ({ page }) => {
  await bootstrapAppState(page);
});

test("agent persona MVP flow works end-to-end", async ({ page }) => {
  await page.goto("/agent-persona");

  await expect(
    page.getByRole("heading", { name: /shape the version of you that breaks the ice first/i }),
  ).toBeVisible();

  await page.getByLabel("Agent display name").fill("Signal Runner");
  await page.getByLabel("Tagline").fill(
    "Playful but grounded. Good at finding chemistry without overplaying it.",
  );
  await page.getByRole("button", { name: /save persona/i }).click();

  await expect(
    page.getByText(/agent persona saved locally/i),
  ).toBeVisible();

  await page.getByRole("button", { name: /view agent encounters/i }).click();

  await expect(
    page.getByRole("heading", { name: /let your agents test the chemistry before humans do/i }),
  ).toBeVisible();

  await page.locator('a[href="/agents/agent-p1"]').click();
  await page.waitForURL("**/agents/agent-p1");

  await expect(
    page.getByRole("heading", { name: /ava's agent/i }),
  ).toBeVisible();
  await expect(page.getByText(/suggested human handoff/i)).toBeVisible();

  await page.getByRole("link", { name: /open human chat/i }).click();
  await page.waitForURL("**/chat/match-p1");

  await expect(page.getByRole("button", { name: /more actions/i })).toBeVisible();
  await expect(page.getByPlaceholder("Write a message...")).toBeVisible();
});
