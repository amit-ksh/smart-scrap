import { NextRequest, NextResponse } from "next/server";
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
    return NextResponse.json(
      { error: "Error while fetching webpage" },
      { status: 400 }
    );
  }

  if (!html)
    return NextResponse.json({ error: "No content found." }, { status: 400 });

  try {
    response = await invokeOpenAI({ ...body, html });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server Error! Try agian later." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    format,
    data: response.choices[0].message.content,
  });
};
