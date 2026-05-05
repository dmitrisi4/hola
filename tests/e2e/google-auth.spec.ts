import { expect, test } from "@playwright/test";

function createTestJwt(subject: string, expSec: number) {
  const encode = (value: unknown) =>
    Buffer.from(JSON.stringify(value))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

  return `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: subject, exp: expSec })}.signature`;
}

test.skip("auth success consumes backend redirect token and opens the app", async ({ page }) => {
  const exp = Math.floor(Date.now() / 1000) + 60 * 15;
  const token = createTestJwt("google-e2e-user", exp);

  await page.goto("/feed");
  await expect
    .poll(() =>
      page.evaluate(() => typeof (window as Window & { __holaRouter?: unknown }).__holaRouter),
    )
    .toBe("object");

  await page.evaluate(() => {
    window.localStorage.removeItem("hola_user_id");
  });

  await page.evaluate(
    async ({ accessToken, accessExp }) => {
      const router = (window as Window & {
        __holaRouter?: {
          navigate: (options: {
            to: string;
            search: { token: string; exp: string };
          }) => Promise<void>;
        };
      }).__holaRouter;

      if (!router) throw new Error("E2E router bridge is unavailable");

      await router.navigate({
        to: "/auth/success",
        search: { token: accessToken, exp: String(accessExp) },
      });
    },
    { accessToken: token, accessExp: exp },
  );

  await expect(page.getByText(/discovery/i).first()).toBeVisible();

  await expect
    .poll(() =>
      page.evaluate(() => ({
        userId: window.localStorage.getItem("hola_user_id"),
        pathname: window.location.pathname,
      })),
    )
    .toEqual({ userId: "google-e2e-user", pathname: "/feed" });
});
