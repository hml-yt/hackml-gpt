import { TransformOptions } from "node:stream";
import { GPTTransform } from "./GPTTransform";

export class LengthTransform extends GPTTransform {
  maxLength: number;
  matcher: RegExp;

  constructor(maxLength: number = 30, opts?: TransformOptions) {
    super(opts);
    this.maxLength = maxLength;
    const regexp = `.{0,${this.maxLength}}\\w?\\W`;
    this.matcher = new RegExp(regexp, "gm");
  }

  _processDataBuffer() {
    if (this.dataBuffer.length > this.maxLength) {
      const matches = this.dataBuffer.matchAll(this.matcher);
      for (const match of matches) {
        const chunk = match[0];
        this.dataBuffer = this.dataBuffer.slice(chunk.length);
        this._pushResponse(chunk);
      }
    }
  }
}
