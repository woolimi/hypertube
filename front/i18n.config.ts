import en from "./langs/en.json";
import fr from "./langs/fr.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  warnHtmlMessage: false,
  messages: {
    en,
    fr,
  },
}));
