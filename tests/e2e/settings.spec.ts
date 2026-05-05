import { expect, test } from "@playwright/test";

import { bootstrapAppState } from "./support/bootstrap";

test.beforeEach(async ({ page }) => {
  await bootstrapAppState(page);
});

test("settings reset restores discovery defaults", async ({ page }) => {
  await page.goto("/settings");

  await expect(
    page.getByRole("heading", { name: /shape who you meet and how your profile appears/i }),
  ).toBeVisible();

  await page.getByRole("switch").click();
  await expect(page.getByText(/hidden from discovery/i)).toBeVisible();

  await page.getByRole("button", { name: /reset discovery filters/i }).click();

  await expect(page.getByText(/50 km radius/i)).toBeVisible();
  await expect(page.getByText(/visible in discovery/i)).toBeVisible();

  const discoverySettings = await page.evaluate(() =>
    window.localStorage.getItem("hola_discovery_settings"),
  );

  expect(JSON.parse(discoverySettings ?? "{}")).toMatchObject({
    showMe: "women",
    ageMin: 22,
    ageMax: 32,
    maxDistance: 50,
    showInDiscovery: true,
  });
});
