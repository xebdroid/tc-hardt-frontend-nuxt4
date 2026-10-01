import { defineConfig } from '@playwright/test'

/**
 * Visuelle Regressionstests für die Migration (Nuxt UI/Tailwind → eigene Komponenten).
 *
 * Referenz erzeugen:  npm run test:visual:update
 * Vergleichen:        npm run test:visual
 * Bericht ansehen:    npx playwright show-report
 *
 * Voraussetzung: Dev-Server läuft (npm run dev). Andere URL per VR_BASE_URL setzen.
 */
export default defineConfig({
  testDir: './tests/visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  outputDir: './test-results/visual',
  timeout: 120_000,
  workers: 2,
  fullyParallel: true,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixelRatio: 0.002,
      stylePath: './tests/visual/screenshot.css',
    },
  },
  use: {
    baseURL: process.env.VR_BASE_URL ?? 'http://localhost:3000',
    browserName: 'chromium',
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    deviceScaleFactor: 1,
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
  ],
})
