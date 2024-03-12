import { SVGProps } from "react";
import mimeTypes from "@/constants/mimeTypes";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DataFormat = keyof typeof mimeTypes;

export type APIResponse = {
  data: any;
  format: DataFormat;
};

export interface ScrapingFormInput {
  url: string;
  attributes: string;
  format: DataFormat;
  apiKey: string;
  selector: string;
}
