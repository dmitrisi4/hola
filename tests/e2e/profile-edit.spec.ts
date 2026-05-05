import { expect, test } from "@playwright/test";

import { bootstrapAppState } from "./support/bootstrap";

test.beforeEach(async ({ page }) => {
  await bootstrapAppState(page);
});

test("profile edit saves locally and returns updated profile", async ({ page }) => {
  await page.goto("/profile/edit");

  await expect(page.getByText(/save changes/i)).toBeVisible();

  await page.locator('button:has-text("Alex")').click();
  await page.locator('input[type="text"]').first().fill("Taylor");
  await page.getByRole("button", { name: "Save", exact: true }).click();

  await page.getByRole("button", { name: /save and return/i }).click();
  await page.waitForURL("**/profile");

  await expect(page.getByText("Taylor")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /profile snapshot/i }),
  ).toBeVisible();
});
