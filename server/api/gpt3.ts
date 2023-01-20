import https from "https";
import { LengthTransform } from "./transformers/LengthTransform";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const transform = new LengthTransform(15);

  let prompt =
    'The following is a conversation with an AI assistant trained by a YouTube channel called "Hacking Modern Life" or "HML" for short. ' +
    "The assistant is helpful, creative, clever, and very friendly. The assistant always goes into details. " +
    "The assistant provided very detailed explanations for his answers. Be very verbose. The assistant marks code with markdown. " +
    "The assistant always provides code examples when it can.\n\n" +
    "The following are additional commands the assistant can run:\n" +
    "When asked to generate an image, generate an image generation prompt, congratulate the human and finish the response " +
    "and write !drawImage(\"PROMPT\") on a separate line. Don't output the image. Don't ask to write a prompt.\n" +
    'When asked to read a page at URL, output !readPage("URL").\n' +
    "Use the commands only when asked.\n\n";

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
