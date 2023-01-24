// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Hacking Modern Life's CloneGPT",
    },
  },
  supabase: {},
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    REPLICATE_API: process.env.REPLICATE_API,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@formkit/nuxt",
  ],
});
