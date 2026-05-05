import { expect, test } from "@playwright/test";

import { bootstrapAppState } from "./support/bootstrap";

test.beforeEach(async ({ page }) => {
  await bootstrapAppState(page);
});

test("bottom navigation keeps core protected routes connected", async ({ page }) => {
  await page.goto("/feed");

  await expect(page.getByText(/discovery/i).first()).toBeVisible();

  await page.getByRole("link", { name: "Matches" }).click();
  await page.waitForURL("**/matches");
  await expect(
    page.getByRole("heading", { name: /new chemistry starts here/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Profile" }).click();
  await page.waitForURL("**/profile");
  await expect(
    page.getByRole("heading", { name: /profile snapshot/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Settings" }).click();
  await page.waitForURL("**/settings");
  await expect(
    page.getByRole("heading", { name: /shape who you meet and how your profile appears/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Chats" }).click();
  await page.waitForURL("**/chats");
  await expect(page.getByText(/select a chat and keep the spark moving/i)).toBeVisible();
});
