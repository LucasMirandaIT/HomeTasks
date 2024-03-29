// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // ...
    "@pinia/nuxt",
  ],
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  runtimeConfig: {
    mongoDBUri: process.env.MONGODB_URI
  }
});
