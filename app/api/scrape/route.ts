import { NextRequest } from "next/server";
import { scraper } from "./scraper";
import invokeOpenAI from "./openai";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { URL, selector, format } = body;

  let response, html;

  try {
    html = await scraper(URL, selector);
  } catch (error) {
    return Response.json(
      { error: "Error while fetching webpage" },
      { status: 400 }
    );
  }

  try {
    response = await invokeOpenAI({ ...body });
    console.log(response);
  } catch (error) {
    console.error(error);
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
