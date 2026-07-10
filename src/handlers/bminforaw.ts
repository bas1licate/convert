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
    const nasty = ((mean) => [mean&65535,mean>>16&65535])
    const toui8 = ((base) => new Uint8Array(base.buffer))
    const outputFiles: FileData[] = [];
    for (const File of inputFiles) {
      let bytes = new Uint8Array(file.bytes);
      let isize = bytes.reverse().byteLength; let bd;
      if (isize%4==0) {bd = 4}
      else {switch (0) {
        case isize%3: bd=3;break
        case isize%2: bd=2;break
        default: bd = 1; var c = new Uint8Array(1024); for (let i = 0; i < 256; i++) {c.set([i,i,i,0],4*i)}}
            const k=(bd==3?12:4); var bpr = k*Math.ceil(isize/k)-isize}
      const p = new Uint8Array(bpr ?? 0); const pp = p.byteLength; const cc = c.?byteLength ?? 0
      function getdivs(k) {const res = []; for (let i = 2; i <= sqrt(k); i++) {if (k%i==0){res.push(k)}}; return res}
      const ks = isize/bd; const hd = getdivs(ks).map((x) => isize/x)[-1]; const dim = [...nasty(hd),...nasty(ks/hd)]
      isize += pp; const o = 54+cc; const fs = isize+o;
      const Header1 = new Uint16Array([28002,...nasty(fs),0,0,54+o,0]);
      const Header2 = new Uint16Array([40,0,...dim,1,bd*8,0,0,...nasty(isize),2835,0,2835,0,0,0,0])
      // should mention dimensions are/were defined semi-arbitrarily due to operating from raw rgb
      const full = new Uint8Array(fs)
      full.set(toui8(Header1),0); full.set(toui8(Header2),10);
      full.set(tou18(c??new Int8Array(0)),54)
      full.set(p,o); full.set(bytes,pp+o)
      outputFiles.push(name: file.name.split(".").slice(0, -1).join(".") + ".bmp", bytes: full)
    }
    // i'm so tired of trying so hard and not getting it right
    return outputFiles;
  }

}

export default bminforawHandler;
