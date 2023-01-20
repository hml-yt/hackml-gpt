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
    model: "stability-ai/stable-diffusion", // The model name
    input: {
      prompt: prompt,
      width: 512,
      height: 512,
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
