import { Button } from "@nextui-org/react";
import { ClipboardIcon, DownloadIcon } from "./icons";
import mimeTypes from "@/constants/mimeTypes";
import { APIResponse } from "@/types";

function OutputBox({ result }: { result?: APIResponse }) {
  function downloadFile() {
    if (!result) return;

    const { format, data } = result;

    const file = new File([data], `download.${format}`, {
      type: mimeTypes[format],
    });
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
    <div className="bg-[#f4f4f5] dark:bg-zinc-900 p-3 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Output</h2>
        <div className="space-x-3">
          <Button
            className="p-2 min-w-[50px]"
            isDisabled={!result}
            aria-label={`copy ${result?.format} content`}
            onClick={() => navigator.clipboard.writeText(result?.data)}
          >
            <ClipboardIcon size={16} />
          </Button>
          <Button
            className="p-2 min-w-[50px]"
            isDisabled={!result}
            aria-label={`download ${result?.format} content`}
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
  );
}

export default OutputBox;
