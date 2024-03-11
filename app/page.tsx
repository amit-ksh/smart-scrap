"use client";

import { title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [URL, setURL] = useState("");
  const [part, setPart] = useState("");
  const [format, setFormat] = useState("json");
  const [apiKey, setApiKey] = useState("");
  const [selector, setSelector] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    console.log(URL, part, format, apiKey, selector);
  }

  function clear() {
    setURL("");
    setPart("");
    setFormat("");
    setApiKey("");
    setSelector("");
  }

  return (
    <>
      <header className="flex items-center justify-between gap-4 py-4 px-6 border-b-2 border-zinc-400">
        <h1 className={title({ size: "sm" })}>Smart Scrap</h1>
        <ThemeSwitch />
      </header>

      <main className="m-6 space-y-6">
        <form id="form" onSubmit={submit}>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 md:col-span-3">
              <Input
                type="text"
                label="Enter a webpage URL to scrape"
                placeholder="e.g. https://google.com/"
                isRequired
                size="lg"
                onChange={(e) => setURL(e.target.value)}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <Input
                type="text"
                label="Which part of the web page would you like to scrape?"
                placeholder="movie title"
                isRequired
                size="lg"
                onChange={(e) => setPart(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                type="text"
                label="Enter a CSS selector to scrape (optional)"
                placeholder="movie title"
                size="lg"
                onChange={(e) => setSelector(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <RadioGroup
                label="What format would you like the data in?"
                defaultValue="json"
                isRequired
                className="bg-[#27272a] rounded-xl p-2"
                onChange={(e) => setFormat(e.target.value)}
              >
                <Radio value="json" size="sm">
                  JSON
                </Radio>
              </RadioGroup>
            </div>
            <div className="col-span-6 lg:col-span-2 row-span-1">
              <Input
                type="password"
                label="Enter your OpenAI API key"
                placeholder="Your OpenAI API key"
                size="lg"
                isRequired
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="">
          <div className="bg-zinc-900 p-3 rounded-xl">
            <h2 className="text-lg">Output</h2>
            <div className="relative h-[50vh] mt-2 border-1 border-zinc-400 rounded-lg">
              <div className="">JSON</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={clear}
            className="w-full bg-zinc-900 font-semibold tracking-wide text-lg"
          >
            Clear
          </Button>
          <Button
            formTarget="form"
            form="form"
            type="submit"
            className="w-full bg-zinc-900 font-semibold tracking-wide text-lg"
          >
            Submit
          </Button>
        </div>
      </main>
    </>
  );
}
