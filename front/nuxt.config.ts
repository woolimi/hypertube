// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@vueuse/nuxt"],
  css: ["~/assets/styles/main.scss", "primeicons/primeicons.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      ripple: true,
      inputStyle: "outlined",
    },
  },
});
