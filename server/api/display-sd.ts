import { request } from "https";
import { getPrediction } from "replicate-api";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const token = config.REPLICATE_API;
  const id = getQuery(event).id as string;

  event.node.res.setHeader("Content-Type", "image/png");

  return new Promise((resolve, reject) => {
    getPrediction({ id, token }).then((prediction) => {
      const url = prediction.output.shift() as string;
      const req = request(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (res) => {
          console.log("Got response from GPT-3");
          resolve(res);
        }
      );

      req.on("error", (err) => {
        reject(err);
      });

      req.end();
    });
  });
});
