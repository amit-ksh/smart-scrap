import { ScrapingFormInput } from "@/types";
import { OpenAI } from "openai";

type OpenAIInput = Omit<ScrapingFormInput, "selector"> & { html: string };

export default async function invokeOpenAI({
  url,
  html,
  attributes,
  format,
  apiKey,
}: OpenAIInput) {
  const openai = new OpenAI({ apiKey });

  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: createPrompt({ url, html, attributes, format }),
      },
    ],
  });

  return resp;
}

export const createPrompt = ({
  url,
  html,
  attributes,
  format,
}: Omit<OpenAIInput, "apiKey">) =>
  `
      Extract the below-given attributes present inside the HTML scraped from a webpage and create a valid ${format.toUpperCase()} object from that.
  
      ATTRIBUTES TO EXTRACT: 
      ${attributes}
      
      WEB PAGE URL: ${url}
  
      HTML: ${html}
      
      ${format.toUpperCase()}:`;
