import https from "https";
import { LengthTransform } from "./transformers/LengthTransform";
import promptTemplate from "./lib/prompt";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const transform = new LengthTransform(15);

  let prompt = `${promptTemplate}\n\n`;

  let messages = [
    {
      actor: "Human",
      message: "Hello, how are you?",
    },
    {
      actor: "AI",
      message: "I am an AI created by HML. How can I help you today?",
    },
  ];

  return new Promise((resolve, reject) => {
    readBody(event).then((prevMessages) => {
      messages = messages.concat(prevMessages);

      // append message to prompt, taking message.actor as "actor:" followed by message.message
      prompt +=
        messages
          .map((message) => {
            if (message.actor === "Human" || message.actor === "AI") {
              return `${message.actor}: ${message.message}`;
            } else if (message.actor === "Picture") {
              return `!drawImage("${message.message}")`;
            }
          })
          .join("\n") + `\nAI:`;

      console.log({ prompt, prevMessages });

      const req = https.request(
        {
          hostname: "api.openai.com",
          port: 443,
          path: "/v1/completions",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.OPENAI_API_KEY}`,
          },
        },
        (res) => {
          console.log("Got response from GPT-3");
          event.node.res.setHeader("Content-Type", "text/event-stream");
          resolve(res.pipe(transform));
        }
      );

      const body = JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 512,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
        stream: true,
      });

      req.on("error", (e) => {
        console.error(e);
        reject("problem with request:" + e.message);
      });

      req.write(body);

      req.end();
    });
  });
});
