import { NextRequest } from "next/server";
import { scraper } from "./scraper";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { URL, part, format, apiKey, selector } = body;

  let response;

  try {
    const scrapedData = await scraper(URL, selector);
    response = scrapedData;
  } catch (error) {
    return Response.json(
      { error: "Error while fetching webpage" },
      { status: 400 }
    );
  }

  return Response.json({
    data: response,
  });
};
