export default defineNuxtConfig({
  compatibilityDate: '2024-12-21',
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],

  i18n: {
    // Strategie: URL-Prefix (außer Default)
    strategy: 'prefix_except_default',
    defaultLocale: 'de',

    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  }
})
