import { OpenAI } from "openai";

export default async function invokeOpenAI({
  URL,
  html,
  part,
  format,
  apiKey,
}: {
  URL: string;
  html: string;
  part: string;
  format: string;
  apiKey: string;
}) {
  const openai = new OpenAI({ apiKey });

  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: createPrompt({ URL, html, part, format }),
      },
    ],
  });

  return resp;
}

export const createPrompt = ({
  URL,
  html,
  part,
  format,
}: {
  URL: string;
  html: string;
  part: string;
  format: string;
}) =>
  `
      Extract the below-given attributes present inside the HTML scraped from a webpage and create a valid ${format.toUpperCase()} object from that.
  
      ATTRIBUTES TO EXTRACT: 
      ${part}
      
      WEB PAGE URL: ${URL}
  
      HTML: ${html}
      
      ${format.toUpperCase()}:`;
