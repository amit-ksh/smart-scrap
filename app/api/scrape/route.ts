import { NextRequest } from "next/server";
import { scraper } from "./scraper";
import invokeOpenAI from "./openai";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { url, selector, format } = body;

  let response, html;

  try {
    html = await scraper(url, selector);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error while fetching webpage" },
      { status: 400 }
    );
  }

  if (!html)
    return Response.json({ error: "No content found." }, { status: 400 });

  try {
    response = await invokeOpenAI({ ...body, html });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Server Error! Try agian later." },
      { status: 400 }
    );
  }

  return Response.json({
    format,
    data: response.choices[0].message.content,
  });
};
