/**
 * Multi-device smoke check for the presentation deck.
 * Verifies the page loads and footer nav buttons stay visible.
 *
 * Usage: node scripts/device-check.mjs [url]
 */
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = process.argv[2] || "https://linksports.vercel.app";
const OUT_DIR = join(process.cwd(), "tmp/device-check");

const VIEWPORTS = [
  { name: "iPhone SE", ...devices["iPhone SE"] },
  { name: "iPhone 14", ...devices["iPhone 14"] },
  { name: "iPad Mini", ...devices["iPad Mini"] },
  {
    name: "Laptop 15in 1366x768",
    viewport: { width: 1366, height: 768 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
  {
    name: "Laptop 15in 1440x900",
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false,
  },
  {
    name: "Desktop 1920x1080",
    viewport: { width: 1920, height: 1080 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
];

function isVisibleInViewport(box, viewport, slack = 4) {
  if (!box) return { fullyVisible: false, mostlyVisible: false };
  const fullyVisible =
    box.y >= -slack &&
    box.x >= -slack &&
    box.y + box.height <= viewport.height + slack &&
    box.x + box.width <= viewport.width + slack;
  const mostlyVisible =
    box.y + box.height > 8 &&
    box.y < viewport.height - 8 &&
    box.x + box.width > 8 &&
    box.x < viewport.width - 8;
  return { fullyVisible, mostlyVisible };
}

async function checkDevice(browser, device) {
  const context = await browser.newContext({
    ...device,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const result = {
    name: device.name,
    viewport: device.viewport,
    ok: false,
    errors: [],
    notes: [],
  };

  try {
    const res = await page.goto(BASE_URL, {
      waitUntil: "networkidle",
      timeout: 45000,
    });
    if (!res || !res.ok()) {
      result.errors.push(`HTTP ${res?.status() ?? "no response"}`);
    }

    await page.waitForSelector("footer", { timeout: 15000 });
    const back = page.getByRole("button", { name: "← Back" });
    const next = page.getByRole("button", { name: "Next →" });
    await back.waitFor({ state: "visible", timeout: 10000 });
    await next.waitFor({ state: "visible", timeout: 10000 });

    const vp = page.viewportSize();
    const backBox = await back.boundingBox();
    const nextBox = await next.boundingBox();
    const footerBox = await page.locator("footer").boundingBox();

    const backVis = isVisibleInViewport(backBox, vp);
    const nextVis = isVisibleInViewport(nextBox, vp);
    const footerVis = isVisibleInViewport(footerBox, vp);

    // Prefer DOM visibility + mostly in-frame (pinned footer can sit on safe-area edge)
    const backVisible = await back.isVisible();
    const nextVisible = await next.isVisible();
    if (!backVisible || !nextVisible) {
      result.errors.push("Footer buttons not visible in DOM");
    } else if (!backVis.mostlyVisible || !nextVis.mostlyVisible) {
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      const backBox2 = await back.boundingBox();
      const nextBox2 = await next.boundingBox();
      const backVis2 = isVisibleInViewport(backBox2, vp);
      const nextVis2 = isVisibleInViewport(nextBox2, vp);
      if (!backVis2.mostlyVisible || !nextVis2.mostlyVisible) {
        result.errors.push(
          `Footer buttons not in viewport (back y=${backBox2?.y?.toFixed(0)}, next y=${nextBox2?.y?.toFixed(0)}, vh=${vp.height})`,
        );
      } else {
        result.notes.push("Footer visible after scroll into view");
      }
    } else if (backVis.fullyVisible && nextVis.fullyVisible) {
      result.notes.push("Footer buttons fully visible without scroll");
    } else {
      result.notes.push("Footer buttons visible in viewport (edge-safe)");
    }

    // Navigate a couple slides
    await next.click();
    await page.waitForTimeout(400);
    await next.click();
    await page.waitForTimeout(400);
    const counter = await page.locator("header p.tabular-nums").textContent();
    result.notes.push(`Counter after 2 next: ${counter?.trim()}`);

    // Screenshot
    const safeName = device.name.replace(/\s+/g, "-").toLowerCase();
    await page.screenshot({
      path: join(OUT_DIR, `${safeName}.png`),
      fullPage: false,
    });

    result.ok = result.errors.length === 0;
    result.footer = {
      back: backBox,
      next: nextBox,
      footer: footerBox,
      viewport: vp,
      footerVisible: footerVis.fullyVisible,
    };
  } catch (err) {
    result.errors.push(err instanceof Error ? err.message : String(err));
    result.ok = false;
  } finally {
    await context.close();
  }

  return result;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Checking ${BASE_URL}`);
  console.log(`Screenshots → ${OUT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const device of VIEWPORTS) {
    process.stdout.write(`• ${device.name} … `);
    const r = await checkDevice(browser, device);
    results.push(r);
    console.log(r.ok ? "OK" : "FAIL");
    for (const n of r.notes) console.log(`    note: ${n}`);
    for (const e of r.errors) console.log(`    error: ${e}`);
  }
  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log("\n──────── summary ────────");
  console.log(`Passed: ${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log("Failed devices:");
    for (const f of failed) {
      console.log(`  - ${f.name}: ${f.errors.join("; ")}`);
    }
    process.exitCode = 1;
  } else {
    console.log("All device checks passed.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
