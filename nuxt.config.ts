// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Hacking Modern Life GPT",
      viewport: "initial-scale=1.0, interactive-widget=resizes-content",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    REPLICATE_API: process.env.REPLICATE_API,
  },
});
