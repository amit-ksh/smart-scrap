"use client";

import { ClipboardIcon, DownloadIcon, Loader } from "@/components/icons";
import { title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";
import mimeTypes from "@/constants/mimeTypes";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { FormEvent, useState } from "react";

type DataFormat = keyof typeof mimeTypes;

type APIResponse = {
  data: any;
  format: DataFormat;
};

export default function Home() {
  const [url, setUrl] = useState<string>("https://subslikescript.com/movies");
  const [attributes, setAttributes] = useState<string>("");
  const [format, setFormat] = useState<DataFormat>("json");
  const [apiKey, setApiKey] = useState<string>("");
  const [selector, setSelector] = useState<string>("");

  const [result, setResult] = useState<APIResponse>();

  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    const resp = await fetch("/api/scrape/", {
      method: "POST",
      body: JSON.stringify({
        URL: url,
        attributes,
        format,
        apiKey,
        selector,
      }),
    });
    const data = await resp.json();

    setResult(data);
    setLoading(false);
  }

  function clear() {
    setUrl("");
    setAttributes("");
    setApiKey("");
    setSelector("");
  }

  function downloadFile() {
    if (!result) return;

    console.log(`download.${format}`);

    const file = new File(
      [JSON.stringify(result!?.data)],
      `download.${result.format}`,
      {
        type: mimeTypes[format],
      }
    );
    const url = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.download = "smart-scrap-file";
    link.target = "_blank";
    link.style.display = "none";
    document.body.appendChild(link);
    link.setAttribute("href", url);
    link.click();

    URL.revokeObjectURL(url);
    link.remove();
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
                type="url"
                label="Enter a webpage URL to scrape"
                placeholder="e.g. https://google.com/"
                isRequired
                size="lg"
                defaultValue={url}
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <Input
                type="text"
                label="Which part of the web page would you like to scrape?"
                placeholder="movie title"
                isRequired
                size="lg"
                onChange={(e) => setAttributes(e.target.value)}
                value={attributes}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                type="text"
                label="Enter a CSS selector to scrape (optional)"
                placeholder="movie title"
                size="lg"
                onChange={(e) => setSelector(e.target.value)}
                value={selector}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <RadioGroup
                label="What format would you like the data in?"
                defaultValue="json"
                isRequired
                orientation="horizontal"
                className="bg-[#f4f4f5] dark:bg-[#27272a] rounded-xl p-2"
                onChange={(e) => setFormat(e.target.value as DataFormat)}
                value={format}
              >
                <Radio value="json" size="sm">
                  JSON
                </Radio>
                <Radio value="csv" size="sm">
                  CSV
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
                value={apiKey}
              />
            </div>
          </div>
        </form>

        <div className="">
          <div className="bg-[#f4f4f5] dark:bg-zinc-900 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Output</h2>
              <div className="space-x-3">
                <Button
                  className="p-2 min-w-[50px]"
                  isDisabled={!result}
                  aria-label={`copy ${format} content`}
                  onClick={() => navigator.clipboard.writeText(result!?.data)}
                >
                  <ClipboardIcon size={16} />
                </Button>
                <Button
                  className="p-2 min-w-[50px]"
                  isDisabled={!result}
                  aria-label={`download ${format} content`}
                  onClick={downloadFile}
                >
                  <DownloadIcon size={16} />
                </Button>
              </div>
            </div>

            <div className="relative h-[50vh] mt-2 border-1 border-zinc-400 rounded-lg">
              <div className="overflow-y-auto h-full rounded-lg p-1">
                {JSON.stringify(result!?.data)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={clear}
            className="w-full bg-[#f4f4f5] dark:bg-zinc-900 font-semibold tracking-wide text-lg"
            isDisabled={loading}
          >
            Clear
          </Button>
          <Button
            formTarget="form"
            form="form"
            type="submit"
            className="w-full bg-[#f4f4f5] dark:bg-zinc-900 font-semibold tracking-wide text-lg"
            isDisabled={loading}
          >
            {loading ? <Loader size={24} className="animate-spin" /> : null}
            Submit
          </Button>
        </div>
      </main>
    </>
  );
}
