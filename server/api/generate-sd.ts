import { Readable } from "node:stream";
import { predict, getPrediction } from "replicate-api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stream = new Readable({
    objectMode: true,
    read: () => {},
  });

  event.node.res.setHeader("Content-Type", "text/event-stream");

  const token = config.REPLICATE_API;
  const prompt = getQuery(event).prompt;

  predict({
    model: "prompthero/openjourney", // The model name
    version: "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb", // The model version
    input: {
      prompt,
      width: 512,
      height: 512,
      scheduler: "K_EULER_ANCESTRAL",
    }, // The model specific input
    token, // You need a token from replicate.com
  }).then(async (predict) => {
    let prediction = predict;
    while (
      prediction.status === "starting" ||
      prediction.status === "processing"
    ) {
      console.log({ prediction });
      const lastLog = prediction.logs
        ?.split(/\n/)
        .slice(-1)[0]
        .match(/([0-9]{1,3})%/);
      const percent = lastLog?.at(1);
      console.log({ percent });
      stream.push(
        "data: " +
          JSON.stringify({
            status: prediction.status,
            id: prediction.id,
            percent,
          }) +
          "\n\n"
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      prediction = await getPrediction({ id: prediction.id, token });
    }

    if (prediction.status === "failed") {
      stream.push(`Failed: ${prediction.error}\n`);
    } else {
      stream.push(
        "data: " +
          JSON.stringify({
            status: prediction.status,
            id: prediction.id,
          }) +
          "\n\n"
      );
    }

    stream.push("data: [DONE]\n\n");
    stream.push(null);
  });

  return stream;
});
