// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@pinia/nuxt", "nuxt-icon", "nuxt-socket-io", ,],
  ssr: true,
  image: {
    format: ["webp"],
    quality: 90,
  },
  io: {
    sockets: [{ name: "main", url: process.env.DATABASE_URL }],
  },
  css: ["@/assets/scss/utils/global.scss"],
  runtimeConfig: {
    public: {
      base_url: process.env.DATABASE_URL,
    },
  },
});
