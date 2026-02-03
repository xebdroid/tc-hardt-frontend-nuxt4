export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-12-21",

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@dargmuesli/nuxt-cookie-control'
  ],

  css: ["~/assets/css/main.css"],

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

  cookieControl: {
    // Farben (wie gehabt)
    colors: {
      checkboxActiveBackground: '#EAB308',
      checkboxInactiveBackground: '#E5E7EB',
      checkboxDisabledBackground: '#F3F4F6',
      checkboxActiveCircleBackground: '#fff',
      checkboxInactiveCircleBackground: '#fff',
      checkboxDisabledCircleBackground: '#fff',
      barButtonHoverBackground: '#EAB308',
      barButtonBackground: '#1e293b',
      barButtonColor: '#fff',
      barButtonHoverColor: '#1e293b',
      modalButtonBackground: '#1e293b',
      modalButtonHoverBackground: '#EAB308',
      modalButtonColor: '#fff',
      modalButtonHoverColor: '#1e293b',
    },

    // KORRIGIERTE TEXTE
    localeTexts: {
      de: {
        bannerTitle: 'Cookies & Datenschutz',
        bannerDescription: 'Wir nutzen Cookies und externe Dienste (wie Google Maps), um dir das beste Erlebnis zu bieten.',

        // Buttons im Banner
        acceptAll: 'Alle akzeptieren',
        accept: 'Alle akzeptieren', // Fallback für manche Versionen
        declineAll: 'Ablehnen',
        decline: 'Ablehnen',        // Fallback
        manageCookies: 'Einstellungen',

        // Buttons im Modal
        save: 'Speichern',
        close: 'Schließen', // <--- WICHTIG: Das behebt das fehlende X im Modal
      },
      en: {
        bannerTitle: 'Cookies & Privacy',
        bannerDescription: 'We use cookies and external services.',
        acceptAll: 'Accept all',
        accept: 'Accept all',
        declineAll: 'Decline',
        decline: 'Decline',
        manageCookies: 'Settings',
        save: 'Save',
        close: 'Close',
      }
    },

    // Cookies
    cookies: {
      necessary: [
        {
          id: 'necessary',
          name: { de: 'Notwendige Cookies', en: 'Necessary Cookies' },
          description: { de: 'Ermöglicht die grundlegende Funktionalität.', en: 'Enables basic functionality.' },
        }
      ],
      optional: [
        {
          id: 'google-maps',
          name: { de: 'Google Maps', en: 'Google Maps' },
          description: { de: 'Zeigt interaktive Karten an.', en: 'Displays interactive maps.' },
          targetCookieIds: ['NID', 'CONSENT'],
        },
      ],
    },

    isCssPonyfillEnabled: true,

    // ZUSATZ: Icons deaktivieren, falls du reinen Text willst (löst oft SVG Probleme)
    // Wenn du false setzt, nimmt er den Text aus "close" statt eines kaputten SVGs
    isDashInDescriptionEnabled: false,
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
