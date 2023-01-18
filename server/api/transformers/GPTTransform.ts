import { Transform } from "stream";

export abstract class GPTTransform extends Transform {
  dataBuffer: string = "";

  _pushResponse(text: string, finish_reason: string | null = null) {
    const responseObj = JSON.stringify({
      text,
      finish_reason,
    });

    this.push(`data: ${responseObj}\n`);
  }

  _processDataBuffer() {
    throw new Error("Method not implemented.");
  }

  _transform(chunk: Buffer, encoding: any, callback: () => void) {
    const slices = chunk.toString().matchAll(/^data: (.*)$/gm);
    for (const slice of slices) {
      const dataSlice = slice[1];
      if (dataSlice === "[DONE]") {
        this.push(null);
        return callback();
      }

      let has_finish_reason = "";
      try {
        const { choices } = JSON.parse(dataSlice);
        const { text, finish_reason } = choices.shift();
        if (finish_reason != "") has_finish_reason = finish_reason;
        this.dataBuffer = this.dataBuffer.concat(text);
      } catch (e) {
        console.error("Failed parsing JSON", e, "Slice:", slice, "done");
      } finally {
        this._processDataBuffer();

        if (has_finish_reason) {
          this._pushResponse(this.dataBuffer, has_finish_reason);
          this.dataBuffer = "";
        }
      }
    }

    return callback();
  }
}
