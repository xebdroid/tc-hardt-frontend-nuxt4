export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-12-21",

  colorMode: {
    preference: 'light'
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/seo'
  ],

  site: {
    url: 'https://tc-hardt.de',
    name: 'TC Hardt e.V.',
    description: 'Tennisclub am Birkmannsweg in Mönchengladbach-Hardt',
    defaultLocale: 'de',
  },

  seo: {
    titleTemplate: '%s | TC Hardt e.V.',
  },

  image: {
    quality: 80,
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest?v=2' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'TC Hardt' }
      ]
    }
  },

  css: ["~/assets/css/main.css"],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600],
      Montserrat: [700, 800]
    },
    display: 'swap',
    download: true,
    inject: true
  },

  nitro: {
    prerender: {
      failOnError: false,
      // Generiert die physische Datei für den Webserver
      routes: ['/404.html']
    }
  },

  routeRules: {
    // Spezifische Umleitung
    '/index.php/50-jahre-tc-hardt.html': { redirect: { to: '/50-jahre-tc-hardt', statusCode: 301 } },
    // Catch-all für alles andere, was mit /index.php anfängt
    '/index.php/**': { redirect: { to: '/', statusCode: 301 } },
    '/index.php': { redirect: { to: '/', statusCode: 301 } }
  },

  i18n: {
    strategy: "no_prefix",
    defaultLocale: "de",
    customRoutes: "config",

    locales: [
      { code: "de", name: "Deutsch", iso: "de-DE", file: "de.json" }
    ],

    pages: {
      events: { de: '/termine' },
      membership: { de: '/mitglied-werden' },
      jubilee: { de: '/50-jahre-tc-hardt' },
      facility: { de: '/anlage' },
      about: { de: "/ueber-uns" },
      board: { de: "/vorstand" },
      teams: { de: "/mannschaften" },
      contact: { de: "/kontakt" },
      imprint: { de: "/impressum" },
      privacy: { de: "/datenschutz" },
    },

    detectBrowserLanguage: false,
  },
});
