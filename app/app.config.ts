export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand-dark', // Verweist auf 'brand-dark' in der tailwind.config
      neutral: 'slate'   // Kühles Grau passt gut zu Blau
    },
    container: {
      // Wir überschreiben die Basis-Klasse komplett mit deinen Header-Breiten
      // mx-auto zentriert den Container
      // px-... sorgt für den nötigen Innenabstand auf Mobile
      base: 'mx-auto px-4 sm:px-6 lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl'
    }
  }
})
