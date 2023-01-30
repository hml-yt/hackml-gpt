// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Hacking Modern Life's CloneGPT",
      viewport:
        "width=device-width, initial-scale=1, interactive-widget=resizes-content",
      meta: [
        {
          name: "description",
          content:
            "ChatGPT clone made with Nuxt3, GPT3 and Stable Diffusion by Hacking Modern Life",
        },
        { name: "og:title", content: "Hacking Modern Life's CloneGPT" },
        {
          name: "og:description",
          content:
            "ChatGPT clone made with Nuxt3, GPT3 and Stable Diffusion by Hacking Modern Life",
        },
        { name: "og:image", content: "https://chat.hackml.cloud/icon.png" },
      ],
    },
  },
  supabase: {},
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    REPLICATE_API: process.env.REPLICATE_API,
    public: {
      APP_HOST: process.env.APP_HOST || "https://chat.hackml.cloud",
    },
  },
  imports: { dirs: ["stores"] },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@formkit/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
});
