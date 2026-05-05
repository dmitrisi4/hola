import { expect, test } from "@playwright/test";

import { bootstrapAppState } from "./support/bootstrap";

test.beforeEach(async ({ page }) => {
  await bootstrapAppState(page);
});

test("agent encounter controls drive replay, archive, transcript visibility, and chat handoff", async ({
  page,
}) => {
  await page.goto("/agents");

  await expect(
    page.getByRole("heading", { name: /let your agents test the chemistry before humans do/i }),
  ).toBeVisible();

  await page.locator('a[href="/agents/agent-p1"]').first().click();
  await page.waitForURL("**/agents/agent-p1");

  await expect(page.getByText(/run count/i)).toBeVisible();
  await expect(page.getByText(/last updated/i)).toBeVisible();

  await page.getByRole("button", { name: /rerun encounter/i }).click();
  await expect(page.getByText(/previous run compare/i)).toBeVisible();
  await expect(page.getByText("Current run", { exact: true })).toBeVisible();
  await expect(page.getByText("Previous run", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: /hide transcript/i }).click();
  await expect(page.getByText("Transcript hidden", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /show transcript/i }).click();
  await expect(page.getByText(/current run transcript is visible/i)).toBeVisible();

  await page.getByRole("button", { name: /archive/i }).click();
  await expect(page.getByText(/^archived$/i)).toBeVisible();

  await page.getByRole("button", { name: /direct/i }).click();
  await expect(page.getByText(/the chemistry looked strongest around/i)).toBeVisible();

  await page.getByRole("link", { name: /open human chat/i }).click();
  await page.waitForURL("**/chat/match-p1");

  await expect(page.getByText(/agent handoff ready/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /use opener in composer/i })).toBeVisible();
  await expect(page.getByLabel("Write a message")).toHaveValue(/the chemistry looked strongest around/i);
});
