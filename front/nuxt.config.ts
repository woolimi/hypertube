// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "../.env" });

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/main.scss", "primeicons/primeicons.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      JWT_ACCESS_DURATION: process.env.JWT_ACCESS_DURATION,
      BACK_HOST: process.env.BACK_HOST,
      FRONT_HOST: process.env.FRONT_HOST,
    },
  },
  primevue: {
    options: {
      ripple: true,
      inputStyle: "outlined",
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, "./presets/"), as: "primevue" },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      htmlAttrs: {
        class: "dark",
      },
    },
  },
  experimental: {
    payloadExtraction: false,
  },

  // Module Settings
  modules: [
    "nuxt-primevue",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-svgo",
    "@nuxtjs/i18n",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  svgo: {
    defaultImport: "component",
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
    },
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
      },
    ],
  },
});
