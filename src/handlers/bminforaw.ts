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
    const nasty = ((mean) => new Uint16Array([mean,mean>>16]))
    const toui8 = ((base) => new Uint8Array(base.buffer))
    const outputFiles: FileData[] = [];
    for (const file of inputFiles) {
      if (file.bytes.byteLength > 0xFFFFFFFF) {throw new RangeError("too much data"); continue}
      if (file.bytes.byteLength > 0xFFFFFAFF) {console.warn("this file is especially large. successful conversion cannot be guaranteed, \
                                                            even on higher-end devices")}
      else if (file.bytes.byteLength > 0x7FFFFFFF) {console.warn("this file is very large. conversion may not work on lower-end devices.")}
      let bytes = new Uint8Array(file.bytes);
      let isize = bytes.reverse().byteLength; let bd;
      switch (0) {
        case isize%3: bd=3;break
        case isize%2: bd=2;break
        default: bd = 1; var c = new Uint8Array(1024); for (let i = 0; i < 256; i++) {c.set([i,i,i,0],4*i)}}
      const k=(bd==3?12:4); const bpr = k*Math.ceil(isize/k)-isize
      try {let d = [...c]}
      catch (e) {console.log("caught",e); var c = new Uint8Array(0)}
      const p = new Uint8Array(bpr); const cc = c.byteLength;
      function getdivs(k) {const res = []; for (let i = 2; i <= sqrt(k); i++) {if (k%i==0) {res.push(k)}}; return res}
      const ks = isize/bd; const hd = getdivs(ks).map((x) => isize/x); const dim = [hd[hd.length-1],ks/hd[hd.length-1]]
      isize += bpr*dim[1]; const o = 54+cc; const fs = isize+o;
      if (fs > 0xFFFFFFFF) {throw new RangeError("file would be too large"); continue}
      const Header1 = new Uint16Array([19778,...nasty(fs),0,0,...nasty(54+o),0]);
      const Header2 = new Uint16Array([40,0,...nasty(dim[0]),...nasty(dim[1]),1,bd*8,0,0,...nasty(isize),2835,0,2835,0,0,0,0])
      // should mention dimensions are/were defined semi-arbitrarily due to operating from raw rgb
      const full = new Uint8Array(fs)
      full.set(toui8(Header1),0); full.set(toui8(Header2),14);
      full.set(c,54)
      for (let i = o, j = 0, k=0,row = new Array(n),rrow,ow; k<dim[1]; i+=dim[0]+bpr,j+=dim[0],k++)
      {rrow = bytes.slice(j,j+dim[0]); for (let z = 0; z < dim[0]; z+=3) {row[z/3] = rrow.slice(z,z+3)}; ow = new Uint8Array(...row.reverse());
       full.set(ow,i); full.set(p,dim[0]+i)}
      outputFiles.push(name: file.name.split(".").slice(0, -1).join(".") + ".bmp", bytes: full)
    }
    // i'm so tired of trying so hard and not getting it right
    return outputFiles;
  }

}

export default bminforawHandler;
