import { OpenAI } from "openai";

interface Input {
  URL: string;
  html: string;
  attributes: string;
  format: string;
  apiKey: string;
}

export default async function invokeOpenAI({
  URL,
  html,
  attributes,
  format,
  apiKey,
}: Input) {
  const openai = new OpenAI({ apiKey });

  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: createPrompt({ URL, html, attributes, format }),
      },
    ],
  });

  return resp;
}

export const createPrompt = ({
  URL,
  html,
  attributes,
  format,
}: Omit<Input, "apiKey">) =>
  `
      Extract the below-given attributes present inside the HTML scraped from a webpage and create a valid ${format.toUpperCase()} object from that.
  
      ATTRIBUTES TO EXTRACT: 
      ${attributes}
      
      WEB PAGE URL: ${URL}
  
      HTML: ${html}
      
      ${format.toUpperCase()}:`;
