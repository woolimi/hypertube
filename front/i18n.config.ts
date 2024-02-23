import en from "./langs/en.json";
import fr from "./langs/fr.json";

export default defineI18nConfig(() => ({
  strategy: "prefix_and_default",
  warnHtmlMessage: false,
  locales: [
    { code: "en", iso: "en-US" },
    { code: "fr", iso: "fr-FR" },
  ],
  messages: {
    en,
    fr,
  },
}));
