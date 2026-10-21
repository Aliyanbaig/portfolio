import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

const routes = [
  "/",
  "/store",
  "/works/surge-station",
  "/works/amenti-hr",
  "/missing-page",
];

for (const width of [320, 390, 768, 1024, 1440, 1920, 2560]) {
  test(`all pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      // Traverse every section so lazy images and tall reveal targets are exercised.
      for (const section of await page.locator("main > section").all())
        await section.scrollIntoViewIfNeeded();
      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images
                .filter((image) => !image.complete || !image.naturalWidth)
                .map((image) => image.src),
            ),
        )
        .toEqual([]);
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll("main *, footer *")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return (
              rect.width > 0 &&
              style.position !== "absolute" &&
              (rect.left < -1 || rect.right > innerWidth + 1)
            );
          })
          .map((element) => element.className),
      );
      expect(overflow, route).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route,
      ).toBeLessThanOrEqual(width);
    }
    expect(errors).toEqual([]);
  });
}

test("mobile dialog traps focus, closes with Escape, restores focus and unlocks scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  const menu = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  for (let index = 0; index < 14; index++) {
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((dialog) => dialog.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await expect(page.locator("body")).not.toHaveClass(/menu-open/);
  await toggle.click();
  await menu.getByRole("link", { name: /ABOUT/ }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#about$/);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(menu).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveClass(/menu-open/);
});

test("career disclosure and carousel preserve content and keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  const disclosure = page.getByRole("button", { name: "View all roles" });
  await disclosure.click();
  await expect(page.locator(".career-row:visible")).toHaveCount(11);
  await page.getByRole("button", { name: "Show less" }).click();
  await expect(page.locator(".career-row:visible")).toHaveCount(4);
  const next = page.getByRole("button", { name: "Next project context" });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(next).toBeFocused();
  await expect(page.locator(".story-summary")).toContainText("faith-based");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".story-summary")).toContainText("emergency");
});

test("reduced motion leaves the reel paused and manual playback can be paused", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator("video");
  await video.scrollIntoViewIfNeeded();
  expect(await video.evaluate((element) => element.paused)).toBe(true);
  await page.getByRole("button", { name: "Play visual motion" }).click();
  await expect(
    page.getByRole("button", { name: "Pause visual motion" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause visual motion" }).click();
  expect(await video.evaluate((element) => element.paused)).toBe(true);
});

test("internal destinations exist and malformed paths recover safely", async ({
  page,
}) => {
  await page.goto("/");
  const links = await page
    .locator('a[href^="/"]')
    .evaluateAll((elements) => [
      ...new Set(elements.map((element) => element.getAttribute("href"))),
    ]);
  for (const href of links) {
    const url = new URL(href, "http://portfolio.test");
    if (url.pathname === "/" && url.hash)
      expect(
        await page.locator(`[id="${url.hash.slice(1)}"]`).count(),
        href,
      ).toBe(1);
    else expect(routes).toContain(url.pathname);
  }
  // The server correctly rejects malformed URI bytes. Exercise recovery when a
  // client-side history entry contains one before React initializes instead.
  await page.addInitScript(() => history.replaceState(null, "", "/%E0%A4%A"));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "isn’t part",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,follow",
  );
});

for (const width of [390, 1440]) {
  test(`accessibility checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes.slice(0, 4)) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((node) => node.target),
        })),
        route,
      ).toEqual([]);
    }
    if (width === 390) {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations.map(({ id }) => id)).toEqual([]);
    }
  });
}

test("built routes have independent metadata and a real error-page artifact", async () => {
  for (const [path, title] of [
    ["store", "Design Offerings"],
    ["works/surge-station", "SURGE Station"],
    ["works/amenti-hr", "Amenti.HR"],
    ["404", "Page not found"],
  ]) {
    const html = await readFile(`dist/${path}.html`, "utf8");
    expect(html).toContain(`<title>${title} — Aliyan Baig</title>`);
    if (path === "404") expect(html).toContain('content="noindex,follow"');
    else
      expect(html).toMatch(
        new RegExp(
          `rel="canonical"\\s+href="https://portfolio-five-vert-npb4fujz7y.vercel.app/${path}"`,
        ),
      );
  }
});
