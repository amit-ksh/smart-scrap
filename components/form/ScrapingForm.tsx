import { Loader } from "@/components/icons";
import { DataFormat, ScrapingFormInput } from "@/types";

import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { FormEvent, useState } from "react";

interface ScrapingFormProps {
  formId: string;
  onFormSubmit: (data: ScrapingFormInput) => void;
}

function ScrapingForm(props: ScrapingFormProps) {
  const [url, setUrl] = useState<string>("https://subslikescript.com/movies");
  const [attributes, setAttributes] = useState<string>("");
  const [format, setFormat] = useState<DataFormat>("json");
  const [apiKey, setApiKey] = useState<string>("");
  const [selector, setSelector] = useState<string>("");

  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    props.onFormSubmit({ url, attributes, format, apiKey, selector });

    setLoading(false);
  }

  function clear() {
    setUrl("");
    setAttributes("");
    setApiKey("");
    setSelector("");
  }
  return (
    <>
      <form id={props.formId} onSubmit={submit} className="order-1">
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

      <div className="order-3 flex flex-col md:flex-row gap-4">
        <Button
          onClick={clear}
          className="w-full bg-[#f4f4f5] dark:bg-zinc-900 font-semibold tracking-wide text-lg"
          isDisabled={loading}
        >
          Clear
        </Button>
        <Button
          formTarget="form"
          form={props.formId}
          type="submit"
          className="w-full bg-[#f4f4f5] dark:bg-zinc-900 font-semibold tracking-wide text-lg"
          isDisabled={loading}
        >
          {loading ? <Loader size={24} className="animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </>
  );
}

export default ScrapingForm;
