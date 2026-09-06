// file: wavebreaker.ts

import type { FileData, FileFormat, FormatHandler } from "../FormatHandler.ts";
import CommonFormats, { Category } from "src/CommonFormats.ts";

class wavebreakHandler implements FormatHandler {
  public supportAnyInput = false; // only supports 16-bit linear PCM at the moment for technical reasons
  public name: string = "WAVEBREAK";
  public supportedFormats: FileFormat[] = [
    CommonFormats.WAV.builder("wav").allowTo().markLossless(),
    {name: "L16 Pulse-code Modulation (PCM)",
     format: "pcm", extension: "pcm",
     mime: "audio/L16",
     from: true, to: false,
     internal: "L16",
     category: Category.AUDIO,
     lossless: true}
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
    const split32 = (t : number) => [t%65536,t>>16]
    const to8 = (t : Uint16Array /*only because it's the only used one*/) => new Uint8Array(t.buffer)
    for (const file of inputFiles) {
    if (file.bytes.byteLength > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); continue}
    if (file.bytes.byteLength > 0x7FFFFF00) {console.warn("data very large. successful conversion cannot be guaranteed.")}
    const sz = 2*Math.ceil(file.bytes.byteLength/2)
    const head1 = new Uint16Array([18770,17990,...split32(sz+36),16727,17750])
    const head2 = new Uint16Array([28006,8308,16,0,1,1,44100,0,22664,1,2,16])
    const head3 = new Uint16Array([24932,24948,...split32(sz)])
    const r = new Uint8Array(sz+44);
    r.set(to8(head1),0);r.set(to8(head2),12);r.set(to8(head3),36)
    r.set(file.bytes,44)
    outputFiles.push({name: file.name.split(".").slice(0, -1).join(".") + ".wav", bytes: r})
    }
    return outputFiles;
  }

}

export default wavebreakHandler;
