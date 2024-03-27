// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-socket-io",
    "@nuxt/ui",
  ],
  ssr: true,
  image: {
    format: ["webp"],
    quality: 90,
  },
  io: {
    sockets: [{ name: "main", url: process.env.DATABASE_URL }],
  },
  ui: { icons: "all" },
  css: ["@/assets/scss/utils/global.scss"],
  runtimeConfig: {
    public: {
      base_url: process.env.DATABASE_URL,
    },
  },
});
