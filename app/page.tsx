"use client";

import OutputBox from "@/components/OutputBox";
import ScrapingForm from "@/components/form/ScrapingForm";

import { APIResponse, ScrapingFormInput } from "@/types";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<APIResponse>();

  const formId = "scrapingForm";

  async function handleSubmit(formInput: ScrapingFormInput) {
    const resp = await fetch("/api/scrape/", {
      method: "POST",
      body: JSON.stringify(formInput),
    });
    const data = await resp.json();
    setResult({ data, format: formInput.format });
  }

  return (
    <div className="flex flex-col gap-6">
      <ScrapingForm formId={formId} onFormSubmit={handleSubmit} />

      <div className="order-2">
        <OutputBox result={result} />
      </div>
    </div>
  );
}
