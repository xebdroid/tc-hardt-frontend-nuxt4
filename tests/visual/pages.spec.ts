import { test, expect, type Page } from '@playwright/test'
import { routes } from './routes'

/** Fester Zeitpunkt, damit datumsabhängige Inhalte (Termine, Countdown) stabil bleiben. */
const FIXED_NOW = new Date('2026-10-01T10:00:00+02:00')

const MODES = ['light', 'dark'] as const

/** Webfonts, die vor dem Screenshot sicher geladen sein müssen (font-display: swap). */
const FONTS = [
  '700 1em "EurostileBold"',
  '400 1em "EurostileExtended"',
  '700 1em "EurostileExtended"',
  '400 1em "Inter"',
  '500 1em "Inter"',
  '600 1em "Inter"',
]

async function prepare(page: Page, mode: (typeof MODES)[number]) {
  await page.clock.setFixedTime(FIXED_NOW)

  // Cookie-Banner überspringen, ohne Statistik/Maps zu erlauben
  const baseURL = test.info().project.use.baseURL ?? 'http://localhost:3000'
  await page.context().addCookies([
    { name: 'cookie-decided', value: 'true', url: baseURL },
    {
      name: 'cookie-consent',
      value: encodeURIComponent(JSON.stringify({ necessary: true, maps: false, analytics: false })),
      url: baseURL,
    },
  ])

  // Farbmodus über den Storage von @nuxtjs/color-mode setzen (gilt vor und nach der Migration)
  await page.addInitScript((m) => {
    try { localStorage.setItem('nuxt-color-mode', m) } catch { /* ignore */ }
  }, mode)
  await page.emulateMedia({ colorScheme: mode, reducedMotion: 'reduce' })
}

/**
 * Seite laden. Der Vite-Dev-Server lädt beim ersten Aufruf einer Seite gelegentlich neu
 * (Dependency-Optimierung) – dann wird einfach erneut gewartet.
 */
async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'load' })
  await page.waitForLoadState('networkidle')
}

async function settle(page: Page) {
  // 1. Durchscrollen: löst Scroll-Animationen aus, Lazy-Images werden zusätzlich auf eager gesetzt
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => img.setAttribute('loading', 'eager'))
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise(r => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })

  // 2. Dynamische Inhalte stilllegen, auf Bilder und Fonts warten
  await page.evaluate(async (fonts) => {
    document.querySelectorAll<HTMLElement & { swiper?: any }>('.swiper').forEach((el) => {
      el.swiper?.autoplay?.stop()
      el.swiper?.slideTo?.(0, 0)
    })

    // Videos ausblenden (Frame wechselt ständig)
    document.querySelectorAll('video').forEach(v => v.setAttribute('data-vr-hide', ''))

    // Laufende Karussells ausblenden: Der bewegte Track hat ein transform (Embla/Swiper).
    // Statische Logo-Raster (ohne transform) bleiben sichtbar.
    document.querySelectorAll('img[src*="/img/sponsors/"]').forEach((img) => {
      let el = img.parentElement
      while (el && el !== document.body) {
        if (getComputedStyle(el).transform !== 'none') {
          el.parentElement?.setAttribute('data-vr-hide', '')
          break
        }
        el = el.parentElement
      }
    })

    // Bilder: höchstens 10 s pro Bild warten (Bilder in versteckten Bereichen laden evtl. nie)
    const timeout = (ms: number) => new Promise(r => setTimeout(r, ms))
    await Promise.all(Array.from(document.images).map(img =>
      img.complete
        ? null
        : Promise.race([new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }) }), timeout(10_000)]),
    ))

    // Fonts explizit laden: document.fonts.ready allein reicht bei font-display: swap nicht
    await Promise.all(fonts.map(f => document.fonts.load(f).catch(() => null)))
    await document.fonts.ready
  }, FONTS)

  await page.waitForTimeout(500)
}

/** Bei einem Reload durch den Dev-Server einmal neu laden und erneut vorbereiten. */
async function openAndSettle(page: Page, path: string) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await open(page, path)
      await settle(page)
      return
    }
    catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (attempt === 3 || !/Execution context was destroyed|navigation/i.test(message)) throw error
      await page.waitForTimeout(1500)
    }
  }
}

for (const mode of MODES) {
  test.describe(mode, () => {
    for (const route of routes) {
      test(route.name, async ({ page }) => {
        await prepare(page, mode)
        await openAndSettle(page, route.path)

        await expect(page.locator('html')).toHaveClass(new RegExp(`\\b${mode}\\b`))
        await expect(page).toHaveScreenshot(`${route.name}-${mode}.png`, { fullPage: true, timeout: 20_000 })
      })
    }
  })
}
