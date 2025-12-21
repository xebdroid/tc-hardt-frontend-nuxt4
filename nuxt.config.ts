export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-12-21",
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "de",
    // langDir: 'i18n/locales',
    // lazy: true,

    // WICHTIG: Das hier hat gefehlt!
    // Sagt dem Modul: "Schau in diese Config hier, nicht in die Komponenten"
    customRoutes: "config",

    locales: [
      { code: "de", name: "Deutsch", iso: "de-DE", file: "de.json" },
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
    ],

    // Jetzt wird dieser Block auch endlich gelesen:
    pages: {
      about: {
        de: "/ueber-uns",
        en: "/about-us",
      },
      board: {
        de: "/vorstand",
        en: "/board",
      },
      teams: {
        de: "/mannschaften",
        en: "/teams",
      },
      contact: {
        de: "/kontakt",
        en: "/contact",
      },
      imprint: {
        de: "/impressum",
        en: "/imprint",
      },
      privacy: {
        de: "/datenschutz",
        en: "/privacy-policy",
      },
    },

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
