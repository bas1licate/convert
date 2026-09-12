// file: wavebreaker.ts

import type { FileData, FileFormat, FormatHandler } from "../FormatHandler.ts";
import CommonFormats, { Category } from "src/CommonFormats.ts";

class wavebreakHandler implements FormatHandler {
  public name: string = "WAVEBREAK";
  public supportedFormats: FileFormat[] = [
    CommonFormats.WAV.builder("wav").allowTo().markLossless(),
    {
      name: "PCM signed 16-bit little-endian", // from ffmpeg
      format: "s16le",
      extension: "s16le",
      mime: "audio/s16le", // interpreted as 44.1 kHz mono
      from: true,
      to: false,
      internal: "s16le",
      category: Category.AUDIO,
      lossless: true,
    },
  ];
  public ready: boolean = false;

  async init() {
    this.ready = true;
  }

  async doConvert(
    inputFiles: FileData[],
    inputFormat: FileFormat,
    outputFormat: FileFormat,
  ): Promise<FileData[]> {
    const outputFiles: FileData[] = [];
    // oxlint-disable-next-line unicorn/consistent-function-scoping
    const n32 = (t: number) => new Uint8Array(new Uint32Array([t]).buffer);
    for (const file of inputFiles) {
      if (file.bytes.byteLength > 0xffffff00) {
        console.error("data too large. maximum size 4,294,967,040 bytes.");
        continue;
      }
      if (file.bytes.byteLength > 0x7fffff00) {
        console.warn("data very large. successful conversion cannot be guaranteed.");
      }
      const sz = 2 * Math.ceil(file.bytes.byteLength / 2);
      const head1 = new Uint8Array([82, 73, 70, 70, ...n32(sz + 36), 87, 65, 86, 69]);
      const head2 = new Uint8Array([
        102, 109, 116, 32, 16, 0, 0, 0, 1, 0, 1, 0, 68, 172, 0, 0, 136, 88, 1, 0, 2, 0, 16, 0,
      ]);
      const head3 = new Uint8Array([100, 97, 116, 97, ...n32(sz)]);
      const r = new Uint8Array(sz + 44);
      r.set(head1, 0);
      r.set(head2, 12);
      r.set(head3, 36);
      r.set(file.bytes, 44);
      outputFiles.push({ name: file.name.split(".").slice(0, -1).join(".") + ".wav", bytes: r });
    }
    return outputFiles;
  }
}

export default wavebreakHandler;
