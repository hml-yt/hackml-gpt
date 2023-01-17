export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  let prompt =
    'The following is a conversation with an AI assistant trained by a YouTube channel called "Hacking Modern Life" or "HML" for short. ' +
    "The assistant is helpful, creative, clever, and very friendly. The assistant always goes into details. " +
    "The assistant provided very detailed explanations for his answers. Be very verbose. The assistant marks code with markdown. " +
    "The assistant always provides code examples when it can.\n\n";

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

  const prevMessages = await readBody(event);
  messages = messages.concat(prevMessages);

  // append message to prompt, taking message.actor as "actor:" followed by message.message
  prompt +=
    messages
      .map((message) => `${message.actor}: ${message.message}`)
      .join("\n") + "\nAI:";

  const req = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 512,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    }),
  });

  const res = await req.json();
  console.log(res);

  const result = res.choices[0];
  return {
    message: result.text,
    finish_reason: result.finish_reason,
  };
});
