import type { Page } from "@playwright/test";

type DemoSocialSeed = {
  likedProfileIds: string[];
  passedProfileIds: string[];
};

type BootstrapOptions = {
  demoSocial?: DemoSocialSeed;
};

const DEFAULT_DEMO_SOCIAL: DemoSocialSeed = {
  likedProfileIds: ["p1"],
  passedProfileIds: [],
};

export async function bootstrapAppState(
  page: Page,
  options: BootstrapOptions = {},
) {
  const demoSocial = options.demoSocial ?? DEFAULT_DEMO_SOCIAL;

  await page.addInitScript(
    ({ demoSocialState }) => {
      window.localStorage.setItem("hola_e2e_access_token", "e2e-token");
      window.localStorage.setItem("hola_user_id", "e2e-user");
      window.localStorage.setItem("hola_demo_social", JSON.stringify(demoSocialState));
    },
    { demoSocialState: demoSocial },
  );
}
