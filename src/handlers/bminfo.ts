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
    const outputFiles: FileData[] = [];
    const Header1: new Uint16Array([28002,-1,0,0,54,0]);
    // total file size (calculated last): Header1[1]
    const Header2: new Uint16Array([40,0,-1,-2,-1,-2,1,32,0,0,0,0,2835,0,2835,0,2835,0,0,0,0,0])
    // dimensions: Header2[2:4]*Header[4:6] = Header[8:9]
    
    return outputFiles;
  }

}

export default dummyHandler;
