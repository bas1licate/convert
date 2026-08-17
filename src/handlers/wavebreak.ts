// file: wavebreaker.ts

import type { FileData, FileFormat, FormatHandler } from "../FormatHandler.ts";
import CommonFormats, { Category } from "src/CommonFormats.ts";

class wavebreakHandler implements FormatHandler {
  public supportAnyInput = true;
  public name: string = "dummy";
  public supportedFormats: FileFormat[] = [
    CommonFormats.WAV.builder("wav").allowTo()
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
    const outputFiles: FileData[] = [];
    const split32 = (t : number[]|Uint32Array) => (x => [x%65536,x>>16])(t?.[0] ?? t)
    const faker = (t: number) => new Uint8Array([t%256,t>>8])
    for (const file of inputFiles) {
    if (file.bytes.byteLength > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); continue}
    const sz = file.bytes.byteLength
    const head1 = new Uint16Array([18770,17990,...split32([sz+36]),16727,17550])
    const head2 = new Uint16Array([28006,8308,16,0,1,1,44100,0,22664,1,2,16])
    const head3 = new Uint16Array([24932,24948,...split32([sz])])
    const r = new Uint8Array(sz+44); let o = -2;
    for (const a of [head1,head2,head3]) {for (const b of a) {r.set(faker(b),o+=2)}}
    r.set(file.bytes,44)
    outputFiles.push({name: file.name.split(".").slice(0, -1).join(".") + ".wav", bytes: r})
    }
    return outputFiles;
  }

}

export default wavebreakHandler;
