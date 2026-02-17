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
  ],

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

  // Konfiguration für die Schriften
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
    }
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "de",
    customRoutes: "config",

    locales: [
      { code: "de", name: "Deutsch", iso: "de-DE", file: "de.json" },
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
    ],

    pages: {
      membership: {
        de: '/mitglied-werden',
        en: '/membership'
      },
      jubilee: {
        de: '/50-jahre-tc-hardt',
        en: '/50-years-tc-hardt'
      },
      facility: {
        de: '/anlage',
        en: '/facility'
      },
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
