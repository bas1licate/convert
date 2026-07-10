// file: bminforaw.ts

import type { FileData, FileFormat, FormatHandler } from "../FormatHandler.ts";
import CommonFormats, { Category } from "src/CommonFormats.ts";

class bminforawHandler implements FormatHandler {

  public name: string = "BITMAPINFOraw";
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
    nasty = ((mean) => [mean&65535,mean>>16&65535])
    toui8 = ((base) => new Uint8Array(base.buffer))
    const outputFiles: FileData[] = [];
    for (const File of inputFiles) {
      let bytes = new Uint8Array(file.bytes);
      const isize = bytes.reverse().byteLength
      if (isize%4==0) {bdepth = 4}
      else {if (isize%3==0) {bdepth = 3}else if (isize%2==0) {bdepth = 2} else {bdepth = 1}
            k=(bdepth==3?12:4); bpr = k*Math.ceil(isize/k)-isize}
      if (bdepth == 1) {c = new Uint8Array(1024); for (let i = 0; i < 256; i++) {c.set([i,i,i,0],4*i)}}
      p = new Uint8Array(bpr ?? 0); pp = p.byteLength; cc = c.?byteLength ?? 0
      const Header1 = new Uint16Array([28002,...nasty(isize+54+pp+cc),0,0,54+cc,0]);
      const Header2 = new Uint16Array([40,0,-1,-2,-1,-2,1,bdepth*8,0,0,...nasty(isize+pp),2835,0,2835,0,0,0,0])
      // dimensions: Header2[2:4]*Header2[4:6] = Header2[10:12] // as we are converting from raw rgb these will be defined semi-arbitrarily
      // outputFiles.push(blablabla)
    }
    // i'm so tired of trying so hard and not getting it right
    return outputFiles;
  }

}

export default bminforawHandler;
