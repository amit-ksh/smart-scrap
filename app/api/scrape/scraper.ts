import puppeteer from "puppeteer";

export async function scraper(URL: string, selector: string) {
  selector = selector ?? "html";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const data = await page.evaluate((selector) => {
    const results: any[] = [];

    const items = document.querySelectorAll(selector);
    items.forEach((item) => {
      results.push(item.innerHTML);
    });

    return results.join(" ").replace(/\n|\t/g, "");
  }, selector);

  await browser.close();

  return data;
}
