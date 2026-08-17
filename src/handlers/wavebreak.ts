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
    for (const file of inputFiles) {
    const head1 = new Uint16Array([18770,17990,0,0,16727,17550])
    const head2 = new Uint16Array([28006,8308,16,0,1,1,44100,0,22664,1,2,16])
    const head3 = new Uint16Array([24932,24948,0,0])
    }
    return outputFiles;
  }

}

export default wavebreakHandler;
