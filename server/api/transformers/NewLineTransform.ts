import { GPTTransform } from "./GPTTransform";

export class NewLineTransform extends GPTTransform {
  splitRegexp: RegExp = /(.*\n)/g;

  _processDataBuffer() {
    const lines = this.dataBuffer.matchAll(this.splitRegexp);
    for (const line of lines) {
      const outChunk = line.shift();
      this.dataBuffer = this.dataBuffer.slice(outChunk?.length);
      this._pushResponse(outChunk as string);
    }
  }
}
