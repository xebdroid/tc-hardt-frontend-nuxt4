import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

interface NewsEntry { slug: string }

const dbPath = fileURLToPath(new URL('../../app/assets/data/db.json', import.meta.url))
const db = JSON.parse(readFileSync(dbPath, 'utf-8')) as { news: NewsEntry[] }

/** Anzahl der News-Detailseiten, die mitgetestet werden (gleiches Template). */
const NEWS_DETAIL_COUNT = 2

export interface VisualRoute {
  /** Dateiname des Screenshots */
  name: string
  path: string
}

export const routes: VisualRoute[] = [
  { name: 'home', path: '/' },
  { name: 'termine', path: '/termine' },
  { name: 'mitglied-werden', path: '/mitglied-werden' },
  { name: 'ksm-2026', path: '/kreis-und-stadtmeisterschaften-2026' },
  { name: 'jubilaeum', path: '/50-jahre-tc-hardt' },
  { name: 'anlage', path: '/anlage' },
  { name: 'ueber-uns', path: '/ueber-uns' },
  { name: 'vorstand', path: '/vorstand' },
  { name: 'mannschaften', path: '/mannschaften' },
  { name: 'training', path: '/training' },
  { name: 'sponsoring', path: '/sponsoring' },
  { name: 'kontakt', path: '/kontakt' },
  { name: 'impressum', path: '/impressum' },
  { name: 'datenschutz', path: '/datenschutz' },
  { name: 'news', path: '/news' },
  ...db.news.slice(0, NEWS_DETAIL_COUNT).map(n => ({ name: `news-${n.slug}`, path: `/news/${n.slug}` })),
  { name: 'fehler-403', path: '/403' },
  { name: 'fehler-500', path: '/500' },
  { name: 'fehler-404', path: '/diese-seite-gibt-es-nicht' },
]
