// file: bminfo.ts

import type { FileData, FileFormat, FormatHandler } from "../FormatHandler.ts";
import CommonFormats, { Category } from "src/CommonFormats.ts";

class bminfoHandler implements FormatHandler {

  public name: string = "BMINFO";
  public supportedFormats: FileFormat[] = [
    CommonFormats.BMP.builder("bmp").markLossless().allowTo(),
    {
      name: "Raw red, green, and blue samples",
      format: "rgb",
      extension: "rgb",
      mime: "image/x-rgb",
      from: true,
      to: false,
      internal: "rgb",
      category: Category.IMAGE,
            },
  ];
  public ready: boolean = false;

  async init () {
    this.ready = true;
  }

  async doConvert (
    inputFiles: FileData[],
    inputFormat: FileFormat,
    outputFormat: FileFormat
  ): Promise<FileData[]> {
    // once upon a time, there was a boy
    // i'll add the code once i figure out how to read the data of the input
    const outputFiles: FileData[] = [];
    return outputFiles;
  }

}

export default dummyHandler;
