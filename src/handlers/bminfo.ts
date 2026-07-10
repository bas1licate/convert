// file: bminfo.ts

import type { FileData, FileFormat, FormatHandler } from "../FormatHandler.ts";
import CommonFormats, { Category } from "src/CommonFormats.ts";

class bminfoHandler implements FormatHandler {

  public name: string = "BMINFO";
  public supportedFormats: FileFormat[] = [
    CommonFormats.PNG.builder("png")
      .markLossless()
      .allowFrom(true)
      .allowTo(false),
    CommonFormats.JPEG.builder("jpeg")
      .markLossless()
      .allowFrom(true)
      .allowTo(false),
    CommonFormats.WEBP.builder("webp")
      .markLossless()
      .allowFrom(true)
      .allowTo(false),
    CommonFormats.TIFF.builder("tiff")
      .markLossless()
      .allowFrom(true)
      .allowTo(false),
    CommonFormats.BMP.builder("bmp")
      .markLossless()
      .allowFrom(true)
      .allowTo(true),
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
    // i'll add the code once i figure out how to read the images
    const outputFiles: FileData[] = [];
    return outputFiles;
  }

}

export default dummyHandler;
