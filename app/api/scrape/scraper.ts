import playwright from "playwright";

export async function scraper(url: string, selector: string) {
  selector = selector ?? "html";

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  const result = await page.innerHTML(selector);

  await browser.close();

  return result.replace(/\n|\t/g, "");
}
