import axios from "axios";
import * as cheerio from "cheerio";

export async function scraper(url: string, selector: string) {
  selector = selector ?? "html";

  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  const HTMLContent = $(selector).html()?.replace(/\n|\t/g, "") || "";

  return HTMLContent;
}
