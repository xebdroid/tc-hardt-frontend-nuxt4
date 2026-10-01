# Migration: Nuxt UI + Tailwind → eigene Vue-Komponenten + scoped SCSS

Stand: 01.10.2026 · Bestandsaufnahme + Zielarchitektur, keine Code-Änderungen.
Basis: `@nuxt/ui` 4.3.0 (installiert, package.json `^4.2.1`), Tailwind v4 (transitiv über Nuxt UI), Nuxt 4.2.

**Ziel:** Die Komponenten sollen gleich aussehen. Die Tailwind-Klassen werden aber **nicht 1:1 nachgebaut**. Jede Komponente bekommt eine semantische Root-Klasse und flaches, scoped SCSS. Werte kommen ausschließlich aus CSS-Tokens. Dark Mode läuft komplett über die Token-Ebene (Abschnitt 3).

**Entscheidungen (01.10.2026):**
- Hell bleibt Standard (`preference: 'light'`), der Umschalter wird sichtbar. Ein späterer Wechsel auf `'system'` ist nur eine Konfigurationsänderung.
- Dark Mode baut auf neutralem Grau auf (Flächen, Text, Rahmen). Markenfarben kommen nur als Akzent: Buttons, Highlights, Links, Hover, Fokus.
- Dunkelblaue Markenflächen werden im Dark Mode grau, behalten aber einen dezenten Markenbezug (Rahmen + Verlauf, siehe 3.3).
- Section-Variante `secondary` (hellblau) wird im Dark Mode neutral grau.
- Markenbezug (Variante D aus der Vorschau): 1px-Rahmen `brand-light-400` @ 25 % + Verlauf `linear-gradient(160deg, gray-950 40%, brand-dark-950 100%)`. Keine Akzentlinie.
- Graupalette: Tailwind-`gray` (oklch-Werte aus 2.2) wird Basis. Kein Wechsel auf `slate`.
- Weiß: zwei Tokens – `--ds-white` (#FFFDF7, Flächen/Text) und `--ds-white-pure` (#fff, Logo-Kacheln/Bilder).
- Fonts: Inter wird Body-Schrift (`--ds-font-sans`), Montserrat wird entfernt.
- Select: natives `<select>` mit eigenem Styling.
- Englisch kommt → `AppDropdown` für den Sprachumschalter wird gebaut.
- Positionierung von Dropdown und Nav-Flyout **ohne Lib** (CSS, `position: absolute` am Trigger).
- Neue Komponenten liegen in `components/ui/` mit Präfix `App` (siehe 3.6).
- Token-Präfix `--ds-` (neutral, projektunabhängig), damit die Basis in anderen Projekten wiederverwendbar ist (siehe 3.8).
- AppButton-Varianten neutral: `primary`, `secondary`, `highlight`, `outline`, `ghost`, `ghost-inverse`. Gold als Theme-Erweiterung `premium` aus `themes/tc-hardt/` mit zwei Farbsätzen (Modifier für die heutigen `gold1`/`gold2`).
- dev-colors.vue wird als Token-Übersicht (Hell + Dunkel) neu gebaut, BreakpointHelper mit `mq()`.

**Arbeitsregeln:**
- Claude führt **niemals** `git commit` oder `git push` aus. Claude ändert nur Dateien; Martin prüft und committet selbst.
- `git` und `npm` laufen auf Windows (Martin). Claude gibt die Befehle vor.

**Visuelle Regressionstests:** `playwright.config.ts` + `tests/visual/`. Referenz: `npm run test:visual:update`, Vergleich: `npm run test:visual` (Dev-Server muss laufen). 3 Breiten (375/768/1280) × Hell/Dunkel, ganze Seiten, feste Uhrzeit, Cookie-Banner übersprungen, Videos und laufende Karussells ausgeblendet.

Legende: **[AUFWENDIG]** = hoher Aufwand (A11y, Fokus-/Tastatur-Handling, Positionierung, State-Logik oder viele Stellen).

---

## 0. Wichtige Befunde vorab

1. **Tailwind ist keine direkte Abhängigkeit.** `tailwindcss` kommt nur transitiv über `@nuxt/ui`, ebenso `@nuxt/icon`, `@nuxtjs/color-mode`, `@nuxt/fonts`, `reka-ui` und `embla-carousel-*`. Wer `@nuxt/ui` entfernt, verliert sofort Tailwind, das Backend von `UIcon` und Color-Mode. → Reihenfolge beachten (Abschnitt 5).
2. **`Button.vue` nutzt `ui`-Keys aus v2** (`rounded`, `font`, `padding`). In Nuxt UI v4 sind sie wirkungslos → Prop `cta` hat aktuell keinen Effekt.
3. **`CookieModal.vue`: `color="gray"`** existiert in v4 nicht mehr (`neutral`). Fällt auf Default zurück.
4. **`primary-*`-Klassen (28×)** hängen am Nuxt-UI-Alias `primary → brand-dark` aus `app.config.ts`. Verschwindet mit Nuxt UI.
5. **`neutral: 'slate'`** wirkt nur auf Nuxt-UI-Interna. Die Templates nutzen durchgehend Tailwind-`gray-*` (386×) – zwei Graupaletten parallel.
6. **Dark Mode ist angelegt, aber inkonsistent:** 266 `dark:`-Klassen, `colorMode.preference: 'light'`, Toggle ausgeblendet (`showColorModeButton = ref(false)`). Für dieselbe Rolle werden unterschiedliche Werte genutzt (Karten-Hintergrund dunkel mal `gray-800`, mal `gray-900`, mal `brand-dark-950`; Rahmen mal `gray-700`, mal `gray-800`). Viele helle Farben haben kein Dark-Pendant (z. B. `text-gray-500` 15×, `text-brand-dark-500` 10×). → Wird durch semantische Tokens gelöst (Abschnitt 3.3).
7. **Fonts:** Inter (400/500/600) und Montserrat (700/800) werden via `@nuxtjs/google-fonts` geladen (Entscheidung: Inter wird Body, Montserrat fliegt raus). `--font-sans` wird **nirgends** auf Inter gesetzt; Body nutzt `var(--font-sans)` → ob Inter tatsächlich greift, im Browser prüfen. Montserrat wird nicht verwendet (Headings = EurostileBold, Kommentar in `main.css` veraltet).
8. **`layouts/default.vue`** rendert `<NuxtPage />` statt `<slot />`, obwohl `app.vue` bereits `<NuxtLayout><NuxtPage/></NuxtLayout>` macht. Funktioniert, ist aber unüblich – bei der Umstellung von `UMain` bereinigen.
9. **Typ-/Modul-Importe aus Nuxt UI:**
   - `app.vue`: `import * as locales from '@nuxt/ui/locale'` (für `lang`/`dir`)
   - `contact.vue`, `AnniversaryForm.vue`: `FormSubmitEvent` aus `#ui/types`
   - `composables/useNavigation.ts`: `NavigationMenuItem` aus `@nuxt/ui` (Basis für `CustomNavigationMenuItem`)
   - `useToast()` in `contact.vue` und `AnniversaryForm.vue` (benötigt `UApp`)
10. `@iconify-json/lucide` installiert, aber ungenutzt. Genutzt: heroicons (Hauptteil), simple-icons, circle-flags – 65 unterschiedliche Icons.
11. Kleinkram: `CtaButton.vue` enthält `dark:hover:bg-highlight-400` doppelt.
12. **`@nuxtjs/color-mode`:** Installiert ist jetzt v4.0.1 direkt. Dort ist `classSuffix: ""` bereits Default (geprüft in `dist/module.mjs`), html bekommt also `.dark`. Nuxt UI nutzt intern weiter seine eigene v3. Nach dem Ausbau trotzdem `classSuffix: ''` explizit setzen, damit es nicht von Defaults abhängt.

---

## 1. Verwendete Nuxt-UI-Komponenten

21 Komponenten, 118 Verwendungen in Templates. Gezählt per Skript über alle `.vue` in `app/`.

| Komponente | Anz. | Aufwand |
|---|---:|---|
| UIcon | 62 | gering (aber viele Stellen) |
| USeparator | 13 | gering |
| UFormField | 8 | mittel |
| UButton | 7 | mittel |
| UContainer | 4 | gering |
| USwitch | 3 | mittel |
| UInput | 3 | mittel |
| UTextarea | 2 | gering |
| UForm | 2 | **[AUFWENDIG]** |
| UColorModeButton | 2 | gering |
| UBadge | 2 | gering |
| USelect | 1 | gering (nativ) |
| URadioGroup | 1 | mittel |
| UNavigationMenu | 1 | **[AUFWENDIG]** |
| UModal | 1 | **[AUFWENDIG]** |
| UMain | 1 | gering |
| UInputNumber | 1 | mittel |
| UDropdownMenu | 1 | **[AUFWENDIG]** |
| UCollapsible | 1 | mittel |
| UCarousel | 1 | **[AUFWENDIG]** |
| UApp | 1 | mittel (Toast/Provider) |
| `useToast()` | 2 | mittel (eigene Toast-Lösung) |

### UIcon (62)
- **Dateien (27):** sponsoring.vue (10), about.vue (8), EventItem.vue (4), MobileMenu.vue (4), contact.vue (4), CookieModal.vue (3), index.vue (3), Hero.vue (2), LanguageSwitcher.vue (2), Header.vue (2), FeaturedNewsCard.vue (2), board.vue (2), dev-colors.vue (2), je 1×: ArticleInfoBox, CardTeaser, FeatureCard, FeatureSection, MobileStickyCTA, PricingCard, PrivacyGate, ScrollToTop, AnniversaryForm, Footer, MemorialPlaque, imprint, membership, teams
- **Props:** `name` (62, teils dynamisch), `class` (Größe/Farbe via `w-* h-* text-*`), `v-if`
- **Slots/Events:** keine
- Icons zusätzlich als String-Props: `UButton icon`, `UInput icon`, Navigation-Items (`useNavigation.ts`), LanguageSwitcher-Items.

### USeparator (13)
- **Dateien:** privacy.vue (9), imprint.vue (4)
- **Props/Slots/Events:** keine

### UFormField (8)
- **Dateien:** AnniversaryForm.vue (5), contact.vue (3)
- **Props:** `label` (8), `name` (8), `required` (7)
- **Slots:** default (Input-Control)
- Implizit: Fehleranzeige aus UForm-Validierung, Label↔Input-Verknüpfung (`id`/`for`), `aria-describedby`.

### UButton (7)
- **Dateien:** Button.vue (Wrapper `AppButton`), CookieModal.vue, LanguageSwitcher.vue, PrivacyGate.vue, Header.vue, header/CtaButton.vue, header/MobileMenu.vue
- **Props:** `variant` (7: solid/outline/ghost), `class` (7), `size` (5: xs, md, lg, xl), `icon` (4), `target` (4), `to` (3), `label` (3), `block` (2), `color` (2: neutral, gray*), `loading`, `disabled`, `href`, `tabindex`, `aria-label`, `ui`, `v-bind="$attrs"`
- **Slots:** default (2)
- **Events:** `@click` (3)
- Hinweis: `AppButton` (Button.vue) ist bereits eine eigene Abstraktion mit 8 Varianten (`primary`, `brand-dark`, `highlight`, `outline`, `ghost`, `gold1`, `gold2`, `ghost-white`) – nur das Innenleben muss getauscht werden. Muss polymorph sein: `<button>` vs. `NuxtLink` vs. `<a>`.

### UContainer (4)
- **Dateien:** Footer.vue, contact.vue, imprint.vue, privacy.vue
- **Props:** `class` (3), `v-if` (1) · **Slots:** default
- Verhalten aus `app.config.ts` (siehe 2.1). Identisch mit Utility `.u-container` in `main.css`.

### USwitch (3)
- **Dateien:** CookieModal.vue (3)
- **Props:** `v-model` (2), `size="lg"` (3), `default-value` (1), `disabled` (1)

### UInput (3)
- **Dateien:** contact.vue (2), AnniversaryForm.vue (1)
- **Props:** `v-model`, `placeholder`, `icon` (leading), `size="lg"`, `class`, `type` (1)

### UForm (2) [AUFWENDIG]
- **Dateien:** contact.vue, AnniversaryForm.vue
- **Props:** `schema` (zod), `state`, `class`
- **Events:** `@submit` (typisiert `FormSubmitEvent<Schema>`)
- **Slots:** default
- Aufwand: Validierung (zod), Fehler-Mapping auf Felder per `name`, Touched/Dirty-State, Submit-Blockade, Fokus auf erstes fehlerhaftes Feld. Empfehlung: eigenes `useForm`-Composable + `provide/inject` zu `FormField`.

### UTextarea (2)
- **Dateien:** contact.vue, AnniversaryForm.vue
- **Props:** `v-model`, `placeholder`, `rows`, `size="lg"`, `class`

### UColorModeButton (2)
- **Dateien:** Header.vue, header/MobileMenu.vue
- **Props:** `v-if`, `size` (xl/lg), `variant="ghost"` (1), `ui.leadingIcon`
- Aktuell in Header.vue per `showColorModeButton = false` ausgeblendet.

### UBadge (2)
- **Dateien:** board.vue (2)
- **Props:** `variant="subtle"`, `color="primary"`, `size="lg"`, `class` · **Slots:** default

### USelect (1)
- **Datei:** AnniversaryForm.vue
- **Props:** `v-model`, `items`, `placeholder`, `size="lg"`, `class`
- Aufwendig nur bei eigener Listbox (Tastatur, ARIA `listbox`, Positionierung). Gestyltes natives `<select>` = gering. → Offene Frage.

### URadioGroup (1)
- **Datei:** AnniversaryForm.vue
- **Props:** `v-model`, `items`
- Pfeiltasten-Navigation / `role="radiogroup"` – mit nativen Radios + Fieldset unkritisch.

### UNavigationMenu (1) [AUFWENDIG]
- **Datei:** layout/Header.vue
- **Props:** `items` (`headerMenu` aus `useNavigation.ts`), `orientation="horizontal"`, `content-orientation="vertical"`, `class`, `ui` (`content`, `link`, `childLink`)
- **Slots:** `#item="{ item }"` (eigenes Rendering: Icon, Label, Chevron mit `group-data-[state=open]:rotate-180`)
- Genutzte Item-Felder: `label`, `to`, `icon`, `children`, `description`, `class`, plus Custom `isHome`, `hidden`, `noDesktopIcon`
- Aufwand: Dropdown/Flyout mit Hover + Klick + Tastatur (Escape, Pfeiltasten, Tab-Out), `aria-expanded`, Active-Route-State, Schließen bei Navigation. In `useNavigation.ts` stecken Klassen mit `[&_[data-slot=childLinkDescription]]` – an das DOM von Nuxt UI gekoppelt, müssen neu gelöst werden.

### UModal (1) [AUFWENDIG]
- **Datei:** base/CookieModal.vue
- **Props:** `v-model:open` (Pinia `store.isModalOpen`), `dismissible` (dynamisch), `transition=false`, `ui` (`overlay`, `content` mit `!important`-Overrides)
- **Slots:** `#content`
- Aufwand: Teleport, Fokus-Trap, Scroll-Lock, Escape/Overlay-Klick abhängig von `dismissible`, `aria-modal`, Fokus-Rückgabe. Für Cookie-Consent DSGVO-relevant – sauber testen. Option: natives `<dialog>` + `showModal()`.

### UMain (1)
- **Datei:** layouts/default.vue · **Slots:** default
- Ersatz: `<main>` + min-height-Regel.

### UInputNumber (1)
- **Datei:** AnniversaryForm.vue
- **Props:** `v-model`, `min=1`, `max=10`, `size="lg"`, `class`
- +/- Buttons, Clamping, Tastatur.

### UDropdownMenu (1) [AUFWENDIG]
- **Datei:** base/LanguageSwitcher.vue
- **Props:** `items` (Array von Arrays; Felder `label`, `icon`, `to`, `type: 'link'`, `disabled`), `content={ align: 'end' }`
- **Slots:** default (Trigger = UButton)
- Aufwand: Positionierung, Click-Outside, Tastatur, Rolle `menu`. Aktuell ist nur eine Locale (`de`) konfiguriert → Komponente faktisch nicht nötig? → Offene Frage.

### UCollapsible (1)
- **Datei:** events/EventItem.vue
- **Props:** `class`, `disabled`, `open` (kontrolliert über Prop `isOpen`, Toggle via `@click` auf eigenem Header)
- **Slots:** default (Trigger), `#content`
- Styling nutzt `group-data-[state=open]:…` (Attribut von Reka UI). Für die Animation existiert in EventItem bereits ein `grid-rows-[0fr]/[1fr]`-Muster, das wiederverwendbar ist.

### UCarousel (1) [AUFWENDIG]
- **Datei:** base/Sponsors.vue
- **Props:** `loop`, `arrows`, `dots`, `autoplay={ delay: 3000 }`, `items`, `ui` (`viewport` mit Mask-Gradient, `container`, `item` mit responsive `basis-*` bis `xl:basis-1/7`, `arrows`, `dots`)
- **Slots:** default via `v-slot="{ item }"`
- Empfehlung: auf **Swiper** umstellen (bereits Dependency, in Hero.vue genutzt) → keine neue Lib, Embla fällt weg.

### UApp (1)
- **Datei:** app.vue · **Slots:** default
- Liefert: Toast-Container, Tooltip-Provider, Locale/Dir. Ersatz: eigener `<AppToaster>` + Composable `useToast`; `lang/dir` direkt aus i18n.

---

## 2. Theme-Werte (Ist-Zustand)

### 2.1 `app/app.config.ts`
```ts
ui.colors.primary = 'brand-dark'
ui.colors.neutral = 'slate'
ui.container.base = 'mx-auto px-4 sm:px-6 lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl'
```
Container übersetzt:

| Breakpoint | padding-inline | max-width |
|---|---|---|
| < 640px | 1rem | – |
| ≥ 640px (sm) | 1.5rem | – |
| ≥ 1024px (lg) | 0 | 56rem (896px) |
| ≥ 1280px (xl) | 0 | 64rem (1024px) |
| ≥ 1536px (2xl) | 0 | 72rem (1152px) |

### 2.2 Tailwind-Konfiguration
`tailwind.config.ts` ist leer (`theme.extend: {}`). Die Konfiguration läuft, wie in Tailwind v4 üblich, über `@theme` in `app/assets/css/main.css`.

**Farben (`@theme static`)**

| Token | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| brand-dark (Basis 800) | #f0f3fa | #e2e7f4 | #c9d3e9 | #a3b5db | #7691ca | #526eb6 | #3b529d | #304182 | **#1c3063** | #1a2852 | #0f1730 |
| brand-light (Basis 300) | #ebf7fc | #c3e6f6 | #9bd5ef | **#7ac7ea** | #4bb3e3 | #23a2dc | #1c85b4 | #16678c | #104a64 | #092c3c | #030f14 |
| highlight (Basis 400) | #f8fee7 | #effecb | #dffda0 | #c6fc67 | **#a3e635** | #84cc16 | #65a30d | #4d7c0f | #3f6212 | #365314 | #1a2e05 |
| accent (Basis 400) | #fdf3ea | #f9dabf | #f5c195 | #f1a96b | **#ee964b** | #e97716 | #bf6112 | #944c0e | #6a360a | #402006 | #150b02 |

- `--color-white: #FFFDF7` (überschrieben! `white` ist nicht #fff), `--color-black: #000`
- Alias `primary-*` = `brand-dark-*` (Nuxt UI)
- Tailwind-Defaultpalette **gray** (386×, alle Stufen 50–950). Werte aus `tailwindcss/theme.css` v4.1.18:

| gray | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L / C / H (oklch) | 98.5% 0.002 247.839 | 96.7% 0.003 264.542 | 92.8% 0.006 264.531 | 87.2% 0.01 258.338 | 70.7% 0.022 261.325 | 55.1% 0.027 264.364 | 44.6% 0.03 256.802 | 37.3% 0.034 259.733 | 27.8% 0.033 256.848 | 21% 0.034 264.665 | 13% 0.028 261.692 |

- Weitere Defaultpaletten mit wenig Nutzung: green (17), yellow (10), amber (8), slate (6), orange (6), blue (6) → beim Übertrag prüfen, ob sie zu bestehenden Tokens zusammengefasst werden können.
- Hardcodierte Hex-Werte in Templates: `#1C3063`/`#7AC7EA` (= Brand, durch Tokens ersetzen), Gold-Verlauf `#8D6933`, `#E3C887`, `#714C20`, Social `#25D366` (WhatsApp), `#1877F2` (Facebook), Loading-Indicator `#5aa9d4`, `bg-[#fff]` (Sponsors, umgeht das gebrochene Weiß).

Tatsächlich genutzte Stufen:
- brand-dark: 900 (74), 800 (29), 100 (15), 500 (13), 950 (12), 700 (9), Rest ≤ 3
- brand-light: 400 (14), 600 (10), 200 (7), Rest ≤ 5
- accent: 500 (19), 400 (18), 600 (13), 900 (7)
- highlight: 500 (12), 400 (7), 600 (7)

**Fonts**

| Token | Wert | Quelle |
|---|---|---|
| `--font-euro-extended` | "EurostileExtended" (400, 700) | `/public/fonts/*.woff2` |
| `--font-euro-bold` | "EurostileBold" (700) | `/public/fonts/*.woff2` |
| `--font-heading` | "EurostileBold" | h1–h6 global |
| `--font-sans` | Tailwind-Default (nicht überschrieben) | Body |
| Inter 400/500/600 | via google-fonts (download) | Zuordnung unklar, s. Befund 7 |
| Montserrat 700/800 | via google-fonts | ungenutzt |

Nutzung: `font-heading` 13×, `font-sans` 4×, `font-euro-extended` 4×, `font-euro-bold` 3×.

**Abstände** – nicht angepasst, Tailwind-v4-Default `--spacing: 0.25rem` (Skala n × 0.25rem). Häufigste: gap-3, mb-4, gap-4, gap-2, space-y-4, mt-4, p-8, mb-6, mt-8, mt-12, gap-8, p-3/4/6, mb-12, mt-16, gap-x-12.

**Radien** – nicht angepasst (Tailwind-v4-Default). Nutzung: `rounded-full` 29, `rounded-xl` (0.75rem) 20, `rounded-2xl` (1rem) 18, `rounded-lg` (0.5rem) 12, `rounded-3xl` (1.5rem) 9, `rounded-md` (0.375rem) 7, `rounded` (0.25rem), `rounded-[10px]`, `rounded-[inherit]`.

**Schatten** – Default: shadow-xl 21, shadow-sm 19, shadow-lg 13, shadow-md 9, shadow 7 + farbige (`shadow-accent…`, `shadow-brand…`) + 1 arbiträrer.

**Breakpoints** – Tailwind-Default, nicht angepasst:

| sm | md | lg | xl | 2xl |
|---|---|---|---|---|
| 40rem / 640px | 48rem / 768px | 64rem / 1024px | 80rem / 1280px | 96rem / 1536px |

Nutzung als Prefix: md 204, lg 149, sm 66, xl 5, 2xl 4 (mobile-first, min-width).

**Weitere Skalen:** Schriftgrößen text-lg 42, text-sm 39, text-base 24, text-xs 23, text-2xl/3xl je 23, text-xl 18, text-4xl 14, text-5xl 9, text-6xl 4 · z-index 10 (22), 20, 30, 40, 50, `z-[9999]` · Durations 300 (28), 700, 200, 1000, 500 · Leading relaxed (30), tight, snug, none, loose · Tracking wide/wider/tight/widest.

**Sonstiges in `main.css`:** `.u-container`, `.u-not-container`, `.break-word-hyphens`, Keyframes `gold-shine-rotate` + `.animate-gold-rotate`, `scroll-behavior: smooth`.

---

## 3. Zielarchitektur: Tokens, Dark Mode, SCSS-Konventionen

### 3.1 Prinzipien
- **Kein Nachbau von Tailwind.** Keine Utility-Klassen, kein `@apply`-Ersatz, keine Mixins à la `@include flex-center`. Eine Komponente = eine Root-Klasse + wenige benannte Elemente.
- **Komponenten kennen nur semantische Tokens** (`--ds-color-text-muted`), nie Paletten-Stufen (`brand-dark-500`) und nie Hex-Werte.
- **Dark Mode steckt nur in der Token-Datei.** In Komponenten gibt es keine `.dark &`-Regeln. Ausnahmen (z. B. Bild-Abdunklung) werden als eigenes semantisches Token gelöst.
- **Gleiches Aussehen im Light Mode** ist Abnahmekriterium. Im Dark Mode werden die bisher inkonsistenten Werte vereinheitlicht (Befund 6). Kleine Abweichungen sind dort gewollt.
- **Werte, die nur eine Komponente nutzt**, bleiben lokal in der Komponente (z. B. 26px Inverse-Corner). Ein globales Token entsteht erst ab der zweiten Verwendung.

### 3.2 Token-Ebenen

```
Ebene 1  Primitive    --ds-brand-dark-800, --ds-gray-600, --ds-space-4 …   (nur in tokens/)
Ebene 2  Semantisch   --ds-color-text, --ds-color-surface, --ds-radius-card … (in Komponenten)
Ebene 3  Komponente   --_bg, --_fg (lokal im scoped Style, optional per Prop/Variante überschrieben)
```

- **Ebene 1 – Primitive:** komplette Paletten aus 2.2 (brand-dark, brand-light, highlight, accent, gray, plus Gold, Social, Status). Werden **nicht** in Komponenten benutzt.
- **Ebene 2 – Semantisch:** beschreibt eine Rolle, nicht eine Farbe. Hat je einen Light- und einen Dark-Wert. Nur diese Ebene wird in Komponenten verwendet.
- **Ebene 3 – Komponente:** private Custom Properties (Präfix `--_`) am Root-Element. Varianten setzen nur diese Variablen um, die Regeln selbst bleiben gleich.

Präfix `--ds-` (Design-System) ist bewusst projektneutral. Er verhindert Kollisionen mit Tailwind v4 während der Parallelphase (Tailwind nutzt selbst `--color-*`, `--spacing`, `--radius-*`, `--shadow-*`), mit Swiper (`--swiper-*`) und anderen Modulen.

### 3.3 Semantische Farb-Tokens (aus dem Ist-Zustand abgeleitet)

Die Tabelle basiert auf den häufigsten Paaren `hell → dark:` in den Templates. Wo es mehrere Dark-Werte gab, ist der häufigste gewählt.

**Regel für Dark:** Alle Flächen-, Text- und Rahmen-Tokens nutzen nur `gray-*` (plus white). Einzige Ausnahme: `surface-brand-border` und `surface-brand-bg` (Verlauf ins `brand-dark-950`) als bewusster Markenbezug auf Markenflächen. Markenfarben (`highlight`, `accent`, `brand-light`) kommen im Dark Mode nur in den Akzent-Tokens vor: `action-*`, `highlight`, `link`, `emphasis`, `interactive-hover`, `focus-ring`. `brand-dark` taucht im Dark Mode nicht als Fläche auf.

| Token | Light | Dark | Ersetzt (Häufigkeit) |
|---|---|---|---|
| `--ds-color-bg` | white (#FFFDF7) | gray-900 | `bg-white dark:bg-gray-900` (Layout, Header) |
| `--ds-color-surface` | white | gray-800 | `bg-white dark:bg-gray-800` (14) |
| `--ds-color-surface-muted` | gray-50 | gray-800 | `bg-gray-50 dark:bg-gray-800(/50)` (7) |
| `--ds-color-surface-brand` | brand-dark-900 | gray-950 | `bg-brand-dark-900` (21, bisher ohne Dark-Wert) |
| `--ds-color-surface-brand-border` | transparent | brand-light-400 @ 25% | Markenbezug im Dark: 1px-Rahmen um Markenflächen |
| `--ds-surface-brand-bg` | `var(--ds-color-surface-brand)` | `linear-gradient(160deg, var(--ds-gray-950) 40%, var(--ds-brand-dark-950) 100%)` | Markenbezug im Dark: Verlauf. Wird als `background` gesetzt (kein Farbwert, daher ohne `-color-`) |
| `--ds-color-surface-secondary` | brand-light-300 | gray-800 | Section-Variante `secondary` (`bg-brand-light-300 text-white`) |
| `--ds-color-text-on-secondary` | white | white | Text auf `surface-secondary` |
| `--ds-color-surface-brand-subtle` | brand-dark-100 / brand-light-50 | gray-800 | Badges, Info-Boxen; Text darauf `--ds-color-text-accent` |
| `--ds-color-heading` | brand-dark-900 | white | `text-brand-dark-900 dark:text-white` (36) |
| `--ds-color-text` | gray-900 | white | `text-gray-900 dark:text-white` (11) |
| `--ds-color-text-muted` | gray-600 | gray-300 | `text-gray-600 dark:text-gray-300` (28) |
| `--ds-color-text-subtle` | gray-500 | gray-400 | `text-gray-500 dark:text-gray-400` (11 + 15 ohne Dark) |
| `--ds-color-text-brand` | brand-dark-800 | gray-100 | Nav-Links, Icons (11); bisher `brand-dark-100` → neutralisiert |
| `--ds-color-text-accent` | brand-dark-800 | brand-light-300 | Badge-Text, Icon-Akzente, Labels (neu, Akzent im Dark) |
| `--ds-color-text-on-brand` | white | white | Text auf `surface-brand` (33× `text-white` ohne Dark) |
| `--ds-color-border` | gray-100 | gray-700 | `border-gray-100 dark:border-gray-700` (16) |
| `--ds-color-border-strong` | gray-200 | gray-700 | `border-gray-200 dark:border-gray-700` (5) |
| `--ds-color-link` | accent-600 | accent-400 | `text-accent-600 dark:text-accent-400` (9) |
| `--ds-color-emphasis` | accent-500 | accent-400 | Kennzahlen/Preise (7) |
| `--ds-color-interactive-hover` | brand-dark-800 (primary-500?) | brand-light-400 | Nav-Hover |
| `--ds-color-action-bg` | brand-dark-800 | highlight-500 | Primary-Button / CTA |
| `--ds-color-action-bg-hover` | brand-dark-700 | highlight-400 | |
| `--ds-color-action-fg` | white | brand-dark-950 | |
| `--ds-color-highlight` | highlight-500 | highlight-400 | Highlight-Button, Badges, Hervorhebungen |
| `--ds-color-focus-ring` | brand-light-500 | brand-light-400 | neu (bisher Nuxt-UI-Default) |
| `--ds-color-overlay` | gray-950 @ 80% | gray-950 @ 80% | Modal-Hintergrund |
| `--ds-color-success` / `--ds-color-error` | green-600 / red-600 | green-400 / red-400 | Toast, Formularfehler (Werte festlegen) |

Hinweis `primary-500`: bisher Alias auf brand-dark-500 (#526eb6). Bei der Umstellung pro Stelle entscheiden, ob `--ds-color-interactive-hover` oder `--ds-color-text-brand` gemeint ist.

### 3.4 Weitere Tokens (ohne Dark-Unterschied)

| Gruppe | Tokens | Werte (aus Tailwind-Defaults übernommen) |
|---|---|---|
| Abstand | `--ds-space-1 … --ds-space-32` | n × 0.25rem, nur genutzte Stufen: 1, 2, 3, 4, 6, 8, 12, 16, 32 |
| Radius | `--ds-radius-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-3xl`, `-full` | 0.25 / 0.375 / 0.5 / 0.75 / 1 / 1.5rem / 9999px |
| Radius semantisch | `--ds-radius-card` (= 2xl), `--ds-radius-control` (= lg), `--ds-radius-pill` (= full) | |
| Schatten | `--ds-shadow-sm`, `-md`, `-lg`, `-xl` | Tailwind-Werte; im Dark Mode ggf. dunkler/stärker |
| Schrift | `--ds-font-sans`, `--ds-font-heading`, `--ds-font-display` (EurostileExtended) | s. 2.2 |
| Schriftgröße | `--ds-text-xs … --ds-text-6xl` | Tailwind-Skala inkl. Line-Height-Paaren |
| Line-Height | `--ds-leading-tight`, `-normal`, `-relaxed` | 1.25 / 1.5 / 1.625 |
| Z-Index | `--ds-z-raised` (10), `--ds-z-header` (50), `--ds-z-overlay` (100), `--ds-z-modal` (110), `--ds-z-toast` (120) | ersetzt `z-[9999]` |
| Motion | `--ds-duration-fast` (200ms), `-base` (300ms), `-slow` (700ms), `--ds-ease-out` | |
| Layout | `--ds-container-max` je Breakpoint, `--ds-container-pad` | s. 2.1 |
| Header | `--ds-header-height` (70px mobil / 120px lg) | ersetzt `pt-[70px]`, `lg:pt-[120px]`, `calc(100dvh-120px)` |

Breakpoints können nicht als Custom Property in Media Queries verwendet werden → als **SCSS-Map** + Mixin `mq($bp)` mit denselben Werten wie in 2.2.

### 3.5 Dark-Mode-Mechanik

```ts
// nuxt.config.ts (nach Ausbau von Nuxt UI)
colorMode: {
  preference: 'light',    // Entscheidung: Hell ist Standard; später ggf. 'system'
  fallback: 'light',
  classSuffix: '',        // html.dark (Default in v4, explizit für Klarheit)
}
```

```scss
// assets/scss/themes/tc-hardt/_semantic.scss  (global, nicht scoped)
:root {
  color-scheme: light;
  --ds-color-bg: var(--ds-white);
  --ds-color-heading: var(--ds-brand-dark-900);
  --ds-color-text-muted: var(--ds-gray-600);
  // …
}

.dark {
  color-scheme: dark;
  --ds-color-bg: var(--ds-gray-900);
  --ds-color-heading: var(--ds-white);
  --ds-color-text-muted: var(--ds-gray-300);
  // …
}
```

- `color-scheme` sorgt dafür, dass Scrollbars, native Inputs und `<select>` mitschalten.
- Ohne JS (SSR, erster Paint) setzt `@nuxtjs/color-mode` die Klasse per Inline-Script → kein Flackern.
- Bilder/Videos: ein Token wie `--ds-media-dim` (Light 0, Dark 0.15) statt Sonderregeln.
- Logos/SVGs mit `currentColor` statt fester Farben, wo möglich.

### 3.6 Dateistruktur

```
app/assets/scss/
  tokens/                projektneutral (wiederverwendbar)
    _scales.scss         Spacing, Radius, Schatten, Schriftgrößen, Z, Motion
    _neutral.scss        gray-Palette, white, white-pure, black
    _semantic.scss       Ebene 2 mit neutralen Default-Werten, :root + .dark
  themes/
    tc-hardt/            projektspezifisch
      _palette.scss      brand-dark, brand-light, highlight, accent, gold, social
      _semantic.scss     überschreibt die Ebene-2-Tokens mit TC-Hardt-Farben (:root + .dark)
      _fonts.scss        @font-face Eurostile, Font-Tokens (Inter, Eurostile)
  abstracts/
    _breakpoints.scss    $breakpoints-Map + @mixin mq()
    _mixins.scss         nur wenige: focus-ring, visually-hidden, container
    _index.scss          @forward der abstracts (erzeugt KEIN CSS)
  base/
    _reset.scss          schlanker Reset (box-sizing, margins, media)
    _typography.scss     body, h1–h6, a, p, Listen – über semantische Tokens
  main.scss              @use tokens → themes/tc-hardt → base (einziger globaler Einstieg)
```

Komponenten:

```
app/components/
  ui/                    neue Basis-Komponenten (AppButton, AppIcon, AppCard, AppModal …)
  base/, layout/, …      bestehende Inhalts-Komponenten (Section, Hero, Footer …)
```

Achtung Auto-Import: Nuxt setzt den Ordnernamen vor den Komponentennamen. `components/ui/AppButton.vue` hieße sonst `<UiAppButton>`. Deshalb in `nuxt.config.ts`:

```ts
components: [
  { path: '~/components/ui', pathPrefix: false },
  '~/components',
],
```

Beim Umzug von `base/Button.vue` nach `ui/AppButton.vue` die direkten Importe anpassen: `CookieModal.vue` (`import AppButton from '~/components/base/Button.vue'`) und `useNavigation.ts` (Typ `ButtonVariant`). Den Typ besser in `app/types.ts` bzw. `ui/types.ts` auslagern.

`nuxt.config.ts`: `css: ['~/assets/scss/main.scss']` und `vite.css.preprocessorOptions.scss.additionalData: '@use "~/assets/scss/abstracts" as *;'` – damit stehen `mq()` und Mixins in jedem scoped Style zur Verfügung, ohne CSS zu duplizieren.

### 3.7 SCSS-Konventionen für Komponenten

- `<style scoped lang="scss">`, Root-Klasse = Komponentenname in kebab-case (`.feature-card`).
- **Maximal eine Ebene Verschachtelung:** nur `&__element`, `&--modifier`, `&:hover/:focus-visible`, `&[data-state='open']` und `@include mq(md)`. Keine Selektorketten wie `.a .b .c`.
- Varianten über **Modifier-Klasse oder `data-variant`** und lokale Variablen, nicht über Klassen-Maps in TypeScript.
- Kein `@extend`, kein `!important`. `:deep()` nur für Fremd-DOM (Swiper).
- Layout innerhalb der Komponente mit Grid/Flex direkt in der jeweiligen Regel – keine Layout-Hilfsklassen.
- Abstände **zwischen** Komponenten regelt der Elternteil (`gap`), nicht die Komponente selbst (`margin` nach außen vermeiden).

Beispiel (heute 13× in `flex items-start gap-3` + Icon-Klassen):

```vue
<template>
  <li class="icon-item">
    <AppIcon :name="icon" class="icon-item__icon" />
    <div class="icon-item__body"><slot /></div>
  </li>
</template>

<style scoped lang="scss">
.icon-item {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-space-3);

  &__icon {
    flex-shrink: 0;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    margin-block-start: var(--ds-space-1);
    color: var(--ds-color-text-brand);
  }

  &__body {
    color: var(--ds-color-text-muted);
    line-height: var(--ds-leading-relaxed);
  }
}
</style>
```

Varianten-Beispiel (`AppButton`):

```scss
.app-button {
  --_bg: var(--ds-color-action-bg);
  --_bg-hover: var(--ds-color-action-bg-hover);
  --_fg: var(--ds-color-action-fg);

  background: var(--_bg);
  color: var(--_fg);
  border-radius: var(--ds-radius-control);
  transition: background-color var(--ds-duration-fast) var(--ds-ease-out);

  &:hover { background: var(--_bg-hover); }
  &:focus-visible { @include focus-ring; }

  &--outline {
    --_bg: transparent;
    --_bg-hover: var(--ds-color-surface-muted);
    --_fg: var(--ds-color-text-brand);
    box-shadow: inset 0 0 0 1px currentColor;
  }
}
```

### 3.8 Wiederverwendbarkeit für andere Projekte

- **Trennung Basis ↔ Theme:** `components/ui/`, `assets/scss/tokens/`, `abstracts/` und `base/` enthalten nichts TC-Hardt-Spezifisches. Markenfarben, Fonts und deren Zuordnung zu semantischen Tokens liegen ausschließlich in `themes/tc-hardt/`.
- **Komponenten nutzen nur semantische Tokens** (`--ds-color-action-bg`), nie Markenpaletten (`--ds-brand-dark-800`). Nur so funktionieren sie mit einem anderen Theme.
- **Semantische Token-Namen sind die API** der Basis. Sie werden einmal festgelegt und danach nur ergänzt, nicht umbenannt.
- **Varianten-Namen neutral (entschieden):** `AppButton` bietet `primary | secondary | highlight | outline | ghost | ghost-inverse`. Die Variante `premium` (Gold) definiert das Theme in `themes/tc-hardt/` über lokale Button-Variablen; die Basis kennt nur den Namen und einen neutralen Fallback.

  | heute | neu | Stellen |
  |---|---|---|
  | `primary` | `primary` | CookieModal, MobileStickyCTA, AnniversaryForm, PrivacyGate |
  | `brand-dark` | `secondary` | Footer, PricingCard, index.vue (4), membership.vue, news/[slug].vue (2) |
  | `highlight` | `highlight` | index.vue (2), membership.vue (2), sponsoring.vue |
  | `outline` / `ghost` | unverändert | CookieModal, EventItem, AnniversaryForm, CardTeaser |
  | `ghost-white` | `ghost-inverse` | news/[slug].vue |
  | `gold1` / `gold2` | `premium` + Modifier `premium-a` / `premium-b` | jubilee.vue / index.vue |

  Der Typ `ButtonVariant` in `useNavigation.ts` und Hero-Slide-Daten (`ctaPrimary.variant`) mit umstellen.
- **Später auslagern:** Wenn die Basis stabil ist, kann sie als **Nuxt Layer** (eigenes Repo/Paket, eingebunden per `extends` in `nuxt.config.ts`) ausgelagert werden. Die Ordnerstruktur oben ist darauf vorbereitet; jetzt noch nicht nötig.

---

## 4. Tailwind-Muster und wie sie aufgelöst werden

Umfang heute: **~4.430 Klassen-Tokens, ~1.000 unterschiedliche**. Das Ziel ist **nicht**, diese abzubilden. Sie werden in vier Kategorien aufgelöst:

| Kategorie | Was | Wohin |
|---|---|---|
| **A – Farbe/Theme** | `text-*`, `bg-*`, `border-*`, alle `dark:` (266) | semantische Tokens (3.3). Fällt aus den Komponenten weg. |
| **B – Wiederkehrende Muster** | Kombinationen, die in mehreren Dateien gleich sind | eigene Komponente (Tabelle 4.2) |
| **C – Layout in einer Komponente** | `flex`, `grid`, `gap`, `items-*`, Breakpoint-Prefixe | direkt als CSS-Regel im scoped Style der Komponente, mit `mq()` |
| **D – Einmalwerte** | arbiträre Werte, Header-Geometrie | lokale Variable in der Komponente bzw. Layout-Token (`--ds-header-height`) |

### 4.1 Verteilung (wo die Klassen stecken)
Dateien mit den meisten Tokens: Hero.vue (416), privacy.vue (241), sponsoring.vue (222), contact.vue (199), dev-colors.vue (185), MobileMenu.vue (178), imprint.vue (166), Header.vue (164), MobileStickyCTA.vue (163), MemorialPlaque.vue (140), about.vue (132), PricingCard.vue (131), EventItem.vue (127), CookieModal.vue (122), index.vue (118).

Klassen-Maps im Script (Varianten-Logik in TS → wird zu Modifiern/`data-variant`): Button.vue, FeatureCard.vue, FeatureSection.vue, Headline.vue, Hero.vue, Image.vue, Section.vue, EventItem.vue, MobileMenu.vue, InverseCorner.vue, LanguageSwitcher.vue, `useNavigation.ts`.

Häufigste Einzelklassen (Orientierung): `flex` 189 · `items-center` 93 · `font-bold` 72 · `flex-col` 72 · `justify-center` 60 · `w-full` 57 · `relative` 51 · `text-center` 49 · `grid` 45 · `dark:text-white` 44 · `mx-auto` 43 · `text-gray-600` 41 · `text-brand-dark-900` 39. → Fast alles Kategorie C oder A.

Varianten-Prefixe: `dark:` 266 (→ entfällt, Kat. A) · `md:` 204 · `lg:` 149 · `sm:` 66 (→ `mq()`) · `hover:` 64 · `group-hover:` 29 · `before:` 14.

### 4.2 Muster → neue Komponenten (Kategorie B)

| Muster heute | Anz. | Wird zu |
|---|---:|---|
| `grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6` + Spalten `md:col-span-4 lg:col-span-3` / `md:col-span-8 lg:col-span-9` | 12–17 | `AppLabeledSection` (Label-Spalte + Inhalt) – privacy, imprint, about |
| Prose-Spalte `text-gray-600 dark:text-gray-300 leading-relaxed space-y-4` | 11 | `AppProse` (Fließtext-Container, regelt Abstände zwischen p/ul/h) |
| `flex items-start gap-3` + Icon `w-6 h-6 mt-1 shrink-0 text-brand-dark-500` | 13 / 6 | `AppIconItem` (Beispiel in 3.7) |
| `text-2xl font-extrabold text-accent-500 dark:text-accent-400` | 6 | Teil von `PricingCard` bzw. `AppStat` |
| `text-lg font-bold text-brand-dark-900 dark:text-white mb-2` | 5 | vorhandene `Headline.vue` (Größe h4/h5) |
| `text-accent-600 dark:text-accent-400 hover:underline` | 5 | `AppLink` bzw. globale `a`-Typografie |
| `absolute h-12 w-12 flex items-center justify-center rounded-md bg-brand-light-500 text-white` | 4 | Teil von `FeatureSection` |
| Karten-Rahmen `bg-white dark:bg-gray-800 rounded-xl/2xl border border-gray-100 dark:border-gray-700 shadow-sm` | ~20 (geschätzt, Varianten) | `AppCard` (Slots header/default/footer, Modifier `--interactive`) |
| `w-full h-full object-cover` | 4 | vorhandene `Image.vue` |
| `transition-all/colors duration-300` | ~50 | Token `--ds-duration-base`, nur dort setzen, wo es eine Wirkung hat |

### 4.3 Sonderfälle (Kategorie D)
- **Inverse Corners:** `w-[26px] h-[26px]`, `-left-[26px]`, `top-[72px]`, `mr/ml-[48px]` → lokale Variablen in `InverseCorner.vue`/`Header.vue`; Farbe über `--ds-color-bg`, damit der Dark Mode automatisch passt.
- **Header-Offsets:** `pt-[70px]`, `lg:pt-[120px]`, `max-h-[calc(100dvh-120px)]` → `--ds-header-height`.
- **Hero mit Viewport-Einheiten:** `mb-[2vh]`, `mb-[4vh]`, `max-h-[25vh]`, `lg:max-h-[35vh]` → lokal in Hero.vue.
- **Collapse-Animation:** `transition-[grid-template-rows] grid-rows-[0fr|1fr]` → in `AppCollapsible`.
- **Attribute von Reka UI / Nuxt UI:** `group-data-[state=open]:…` (3), `[&_[data-slot=…]]` (4) → entfallen; Ersatz über eigenes `data-state`.
- **Swiper:** `[&>.swiper-pagination-bullet]…` + `:deep()` in Hero.vue → `:deep()` bleibt, Farben über Tokens.
- **Mask-Gradient** im Carousel, `before:shadow-[…]` (MemorialPlaque) → lokal.
- **`z-[9999]`, `z-[5]`, `z-[-1]`** → Z-Tokens (3.4) bzw. lokal.
- **Gold-Verläufe** → Primitive `--ds-gold-*`, Animation `gold-shine-rotate` in `AppButton` mit `prefers-reduced-motion`.

---

## 5. Reihenfolge der Umstellung

Grundsatz: **Nuxt UI und Tailwind laufen bis zum Schluss parallel.** Neue Komponenten entstehen in scoped SCSS auf Basis der Tokens. Jede Phase ist einzeln deploybar.

**Phase 0 – Fundament**
1. Referenz-Screenshots aller Routen (Playwright; 375 / 768 / 1280 px; Light **und** Dark), um Regressionen je Phase zu erkennen.
2. `tailwindcss` (+ Vite-Plugin) explizit in `package.json`, damit Tailwind das spätere Entfernen von `@nuxt/ui` übersteht.
3. `@nuxt/icon` und `@nuxtjs/color-mode` explizit installieren und eintragen; `classSuffix: ''` setzen (Befund 12).
4. Offene Fragen klären (Abschnitt 7).

**Phase 1 – Tokens + Dark Mode**
1. Struktur aus 3.6 anlegen, Primitive (Ebene 1) und semantische Tokens (Ebene 2, Light + Dark) befüllen.
2. `main.scss` **zusätzlich** zu `main.css` laden. Tailwind-Klassen bleiben vorerst unverändert.
3. Basis-Typografie (body, h1–h6, a) auf Tokens umstellen und die globale Regel in `main.css` entfernen.
4. Color-Mode-Toggle als `AppColorModeToggle` bauen und im Header + MobileMenu sichtbar schalten (`showColorModeButton = true`). Erst sichtbar schalten, wenn die umgestellten Bereiche im Dark Mode abgenommen sind – bis dahin nur in Dev aktiv.
5. Ab hier: Jede umgestellte Komponente funktioniert sofort in Light und Dark.

**Phase 2 – Primitives**
UMain → `<main>` (+ `layouts/default.vue` auf `<slot />`), UContainer → `AppContainer`, USeparator → `AppSeparator`, UBadge → `AppBadge`, UIcon → `AppIcon` (Wrapper um `<Icon>` von `@nuxt/icon`).

**Phase 3 – Button**
`Button.vue` intern auf eigenes Markup + scoped SCSS (Varianten über lokale Variablen, 3.7). Danach CtaButton, Socials in Header/MobileMenu, PrivacyGate, Close-Button in CookieModal und Trigger in LanguageSwitcher auf `AppButton`.

**Phase 4 – Basis-Komponenten mit Klassen-Maps** (vorhandene Komponenten, sie prägen das Aussehen der Seiten)
Section → Headline → Image → AppCard (neu) → FeatureCard → FeatureSection → CardTeaser → PricingCard → EventDate. Gleichzeitig die neuen Muster-Komponenten aus 4.2 (`AppIconItem`, `AppProse`, `AppLabeledSection`).

**Phase 5 – Formulare** (contact.vue + AnniversaryForm.vue gemeinsam)
`AppInput`, `AppTextarea`, `AppInputNumber`, `AppSelect`, `AppRadioGroup`, `AppSwitch` → `AppFormField` → `AppForm` + `useForm` (zod bleibt) → `useToast` + `AppToaster`. `FormSubmitEvent` ersetzen.

**Phase 6 – Interaktiv / Overlays**
1. UCollapsible → `AppCollapsible` (EventItem)
2. UCarousel → Swiper in `Sponsors.vue`
3. UModal → `AppModal` (CookieModal)
4. UDropdownMenu → `AppDropdown` (LanguageSwitcher)
5. UNavigationMenu → `AppNavMenu` (Header) + eigener Typ `NavItem` in `useNavigation.ts`

**Phase 7 – Layout + Seiten**
Header, MobileMenu, Footer, InverseCorner, MobileStickyCTA → Hero.vue (allein, größter Brocken) → Seiten. Seiten werden dabei schlank: Sie setzen fast nur noch Komponenten zusammen und haben wenig eigenes SCSS. Reihenfolge: privacy/imprint (gemeinsames Muster `AppLabeledSection`) → about → sponsoring → contact → index → restliche. dev-colors.vue zuletzt (bzw. als Token-Übersicht neu bauen).

**Phase 8 – Aufräumen**
UApp raus, Import `@nuxt/ui/locale` ersetzen, `ui`-Block in `app.config.ts` löschen, `@nuxt/ui` entfernen. Danach `main.css`, `tailwind.config.ts` und Tailwind-Dependency entfernen. Prüfen: `grep` auf Tailwind-Klassen/`dark:` in `app/` liefert 0 Treffer. Build + Screenshot-Vergleich.

---

## 6. Checklisten pro Komponente

**Definition of Done – gilt für jede Komponente:**
- [ ] `<script setup lang="ts">`, typisierte Props/Emits, `defineModel` für v-model
- [ ] `<style scoped lang="scss">`, eine Root-Klasse, max. eine Ebene Verschachtelung (3.7)
- [ ] Nur semantische Tokens (Ebene 2) bzw. lokale `--_`-Variablen – keine Paletten-Stufen, keine Hex-Werte
- [ ] Keine `.dark`-Regel in der Komponente; Light + Dark visuell geprüft
- [ ] Keine Tailwind-Klassen mehr im Template, keine Klassen-Maps im Script
- [ ] Varianten über Modifier/`data-variant`
- [ ] `:focus-visible` sichtbar (`@include focus-ring`), `prefers-reduced-motion` bei Animation
- [ ] Alle Verwendungsstellen umgestellt
- [ ] Light-Screenshot unverändert gegenüber Referenz (375 / 768 / 1280 px)

### Tokens + Dark Mode (Phase 1)
- [ ] Neutrale Primitive in `tokens/` (gray in oklch, `--ds-white` #FFFDF7, `--ds-white-pure` #fff, black, Status)
- [ ] Markenpalette nur in `themes/tc-hardt/` (brand-dark, brand-light, highlight, accent, gold, social)
- [ ] Keine Komponente in `components/ui/` referenziert Theme-Primitive
- [ ] `--ds-font-sans: Inter`, Montserrat aus `googleFonts` in `nuxt.config.ts` entfernt
- [ ] `components`-Konfiguration mit `pathPrefix: false` für `components/ui`
- [ ] Semantische Tokens aus 3.3 mit Light- und Dark-Wert
- [ ] Spacing-, Radius-, Schatten-, Font-, Z- und Motion-Tokens aus 3.4
- [ ] `$breakpoints` + `mq()` mit den Werten aus 2.2
- [ ] `color-scheme` in `:root` und `.dark`
- [ ] Kontrast-Check (WCAG AA) für alle Text/Surface-Paare in beiden Modi
- [ ] Dark-Tokens für Flächen/Text/Rahmen nutzen nur `gray-*`/white; Markenfarben nur in Akzent-Tokens (Regel in 3.3)
- [ ] Gewählter Modus bleibt nach Reload erhalten (Storage von color-mode), kein Flackern beim Laden
- [ ] dev-colors.vue als Token-Übersicht neu: alle semantischen Tokens + Primitive, Umschaltung Hell/Dunkel auf der Seite
- [ ] BreakpointHelper mit `mq()` neu, nur in Dev

### AppColorModeToggle (UColorModeButton, 2×)
- [ ] `useColorMode()` aus `@nuxtjs/color-mode`, `<ClientOnly>` mit Platzhalter gleicher Größe
- [ ] `aria-label` mit aktuellem Zustand, Icon sun/moon
- [ ] Header + MobileMenu sichtbar (Entscheidung), Flag bleibt für den Übergang erhalten

### AppIcon (UIcon, 62×)
- [ ] `@nuxt/icon` explizit installiert, Collections heroicons/simple-icons/circle-flags vorhanden
- [ ] Props `name`, `size` (`sm|md|lg|xl` → 1 / 1.25 / 1.5 / 2rem), optional `label` (sonst `aria-hidden="true"`)
- [ ] Farbe über `currentColor`; die Farbe setzt die Eltern-Komponente
- [ ] Größen-Klassen `w-* h-*` durch `size` ersetzt
- [ ] Icon-Strings in Props (Button, Input, Nav-Items) funktionieren weiter
- [ ] 27 Dateien umgestellt
- [ ] `@iconify-json/lucide` entfernen (ungenutzt)

### AppSeparator (USeparator, 13×)
- [ ] `<hr>`, Farbe `--ds-color-border`
- [ ] privacy.vue (9), imprint.vue (4)

### AppContainer (UContainer, 4×)
- [ ] Werte aus Tabelle 2.1 exakt übernommen, über `--ds-container-*`
- [ ] Mixin `container` für Komponenten, die selbst Container sind (ersetzt `.u-container`)
- [ ] Footer, contact, imprint, privacy
- [ ] Verwendungen von `.u-container` / `.u-not-container` geprüft und ersetzt

### `<main>` (UMain)
- [ ] `layouts/default.vue`: `<main>` + `<slot />` statt `<NuxtPage />`
- [ ] min-height-Verhalten verglichen

### AppBadge (UBadge, 2×)
- [ ] Variante `subtle` über `--ds-color-surface-brand-subtle` / `--ds-color-text-brand`
- [ ] Größe `lg`
- [ ] board.vue (2)

### AppButton (UButton, 7× + alle AppButton-Nutzungen)
- [ ] Polymorph: `to` → NuxtLink, `href` → `<a>`, sonst `<button type="button">`
- [ ] `target="_blank"` → `rel="noopener noreferrer"`
- [ ] Props: `label`, `icon`, `size` (xs–xl), `variant` (neutral, Mapping in 3.8), `block`, `loading` (Spinner + `aria-busy`), `disabled`, `cta`
- [ ] Varianten nur über lokale Variablen `--_bg/--_fg/--_bg-hover` (Beispiel 3.7)
- [ ] `primary` schaltet im Dark Mode auf highlight (über `--ds-color-action-*`, nicht per Sonderregel)
- [ ] `cta`-Styling wirklich umsetzen (aktuell defekt, Befund 2)
- [ ] Icon-only-Buttons: `aria-label` Pflicht
- [ ] Gold-Varianten inkl. `gold-shine-rotate`, `prefers-reduced-motion`
- [ ] Stellen geprüft: Footer, MobileStickyCTA, Hero, CookieModal, AnniversaryForm, PricingCard, EventItem, PrivacyGate
- [ ] `CtaButton.vue` auf AppButton zurückführen oder zusammenlegen; Tracking-Klick funktioniert

### Section / Headline / Image (vorhanden, Phase 4)
- [ ] Klassen-Maps (`variantClasses` usw.) → Modifier + lokale Variablen
- [ ] Section-Varianten (`default`, `secondary`, `secondary-light`, …) auf semantische Surface-Tokens
- [ ] Markenflächen (`surface-brand`): `background: var(--ds-surface-brand-bg)` + `border: 1px solid var(--ds-color-surface-brand-border)` immer im CSS gesetzt; im Light-Modus einfarbig bzw. `transparent` – keine `.dark`-Regel nötig
- [ ] Variante `secondary` über `--ds-color-surface-secondary` (Dark: grau)
- [ ] Headline: Größen h1–h6 über `--ds-text-*`, Farbe `--ds-color-heading`
- [ ] Image: `variant="event"` u. a. als Modifier, `--ds-media-dim` im Dark Mode

### AppCard (neu)
- [ ] Surface, Border, Radius, Shadow nur aus Tokens
- [ ] Slots `header`, default, `footer`; Modifier `--interactive` (Hover-Lift)
- [ ] Ersetzt die Card-Shells in FeatureCard, CardTeaser, PricingCard, FeaturedNewsCard, EventItem, CookieModal

### AppIconItem / AppProse / AppLabeledSection (neu, Muster aus 4.2)
- [ ] `AppIconItem`: Icon + Slot (Beispiel 3.7)
- [ ] `AppProse`: Abstände zwischen Kindern (`> * + *`), Listen, Links – ersetzt `space-y-4 leading-relaxed text-gray-600`
- [ ] `AppLabeledSection`: 12er-Grid ab md (4/8), ab lg (3/9), Prop `label`
- [ ] privacy, imprint, about, sponsoring, membership umgestellt

### AppInput (UInput, 3×)
- [ ] `defineModel`, `type`, `placeholder`, `icon` (leading), `size`
- [ ] Tokens: `--ds-color-surface`, `--ds-color-border-strong`, `--ds-radius-control`; Fehlerzustand mit `--ds-color-error`
- [ ] `id`/`name`/`aria-invalid`/`aria-describedby` aus dem Kontext von FormField

### AppTextarea (UTextarea, 2×)
- [ ] `defineModel`, `rows`, `placeholder`, `size`, Fehlerzustand
- [ ] Gleiche Tokens wie AppInput (gemeinsames Mixin `control` oder gemeinsame lokale Variablen)

### AppInputNumber (UInputNumber, 1×)
- [ ] `defineModel<number>`, `min`, `max`, `step`, Clamping bei Blur
- [ ] +/- Buttons mit `aria-label`, disabled an den Grenzen
- [ ] `inputmode="numeric"`, Pfeiltasten

### AppSelect (USelect, 1×) – natives `<select>`
- [ ] `items` (`{ label, value }`), `placeholder` als deaktivierte erste Option, `defineModel`
- [ ] `appearance: none` + eigenes Chevron (AppIcon); gleiche Control-Tokens wie AppInput
- [ ] Dark Mode über `color-scheme` (Optionsliste des Browsers)
- [ ] Fehlerzustand + `aria-invalid` aus FormField

### AppRadioGroup (URadioGroup, 1×)
- [ ] `<fieldset>` + `<legend>` (Label aus FormField), native Radios mit `accent-color: var(--ds-color-action-bg)` oder eigenem Styling
- [ ] `items` (`{ label, value, description? }`), `defineModel`

### AppSwitch (USwitch, 3×)
- [ ] `<button role="switch" aria-checked>` oder `<input type="checkbox" role="switch">`
- [ ] `defineModel<boolean>`, `defaultValue`, `disabled`, `size`
- [ ] Track/Thumb-Farben über Tokens (an/aus/disabled, beide Modi)
- [ ] Label-Verknüpfung (CookieModal: Text links, Switch rechts)

### AppFormField (UFormField, 8×)
- [ ] Props `label`, `name`, `required` (Sternchen + `aria-required`), optional `hint`
- [ ] `provide` von `id`, Fehlertext, `invalid` an die Kind-Controls
- [ ] Fehlermeldung mit `id` für `aria-describedby`, Live-Region

### AppForm + useForm (UForm, 2×) [AUFWENDIG]
- [ ] Props `schema` (zod v4), `state`; Emit `submit` mit typisiertem Payload (Ersatz `FormSubmitEvent`)
- [ ] Validierung beim Absenden, danach bei Blur/Eingabe
- [ ] Fehler pro `name` an FormField verteilen
- [ ] Fokus auf erstes fehlerhaftes Feld
- [ ] Honeypot-Feld (`website`) unverändert
- [ ] Loading/Disabled-State am Submit-Button
- [ ] contact.vue + AnniversaryForm.vue gegen `send-mail.php` getestet

### useToast + AppToaster (UApp-Teil, 2 Nutzungen)
- [ ] API `useToast().add({ title, description, color })` kompatibel halten
- [ ] Container in app.vue (Teleport to body), `aria-live="polite"`, `--ds-z-toast`
- [ ] Auto-Dismiss + Schließen-Button
- [ ] Farben `error`/`success` über Status-Tokens

### AppCollapsible (UCollapsible, 1×)
- [ ] Kontrolliert (`open` Prop / `v-model:open`) und `disabled`
- [ ] Trigger als `<button aria-expanded aria-controls>` (aktuell `div @click` → A11y-Lücke)
- [ ] `data-state="open|closed"` für Styling, Höhen-Animation über grid-rows
- [ ] Matomo-Tracking in `handleToggle` unverändert

### Sponsors-Carousel (UCarousel, 1×) [AUFWENDIG]
- [ ] Swiper: loop, autoplay 3000 ms, Pagination (ab sm), Pfeile (nur < md)
- [ ] `slidesPerView`-Breakpoints: 1 / sm 2 / md 3 / lg 4 bzw. 5 / xl 7 (contained vs. full)
- [ ] Mask-Gradient am Rand (md+)
- [ ] Autoplay pausiert bei Hover/Fokus, `prefers-reduced-motion`
- [ ] Logo-Kachel bleibt auch im Dark Mode hell: `--ds-color-logo-surface: var(--ds-white-pure)`
- [ ] Logo-Hover (Grayscale) in SCSS; externe Links mit `rel`

### AppModal (UModal, 1×) [AUFWENDIG]
- [ ] Teleport, Overlay (`--ds-color-overlay`), `role="dialog" aria-modal="true" aria-labelledby`
- [ ] `v-model:open`, `dismissible` (Escape/Overlay nur wenn true)
- [ ] Fokus-Trap, Initialfokus, Fokus-Rückgabe
- [ ] Body-Scroll-Lock (inkl. iOS)
- [ ] Ohne Transition (heute `transition=false`) bzw. optional
- [ ] `--ds-z-modal` statt `z-[9999]`
- [ ] Zusammenspiel mit dem `pointer-events-none`-Wrapper in app.vue prüfen
- [ ] Ausnahme für Legal-Pages (impressum/datenschutz) funktioniert weiter

### AppDropdown (UDropdownMenu, 1×) [AUFWENDIG]
- [ ] Wird gebaut (Englisch kommt); vorher Locale `en` in i18n-Konfiguration anlegen
- [ ] Trigger-Slot, Items mit `label`, `icon`, `to`, `disabled`
- [ ] Ausrichtung `end`, Click-Outside, Escape, Pfeiltasten, `role="menu"`
- [ ] Positionierung ohne Lib: Wrapper `position: relative`, Panel `position: absolute; inset-inline-end: 0; top: 100%`
- [ ] Rand-Check: Panel darf auf Mobile nicht aus dem Viewport ragen (`max-inline-size: calc(100vw - 2 * var(--ds-space-4))`)
- [ ] Panel über `--ds-color-surface`, `--ds-shadow-lg`

### AppNavMenu (UNavigationMenu, 1×) [AUFWENDIG]
- [ ] Eigener Typ `NavItem` in `useNavigation.ts` (ersetzt `NavigationMenuItem`)
- [ ] Felder: `label`, `to`, `icon`, `children`, `description`, `isHome`, `hidden`, `noDesktopIcon`; `class` (Tailwind) → `variant: 'accent'` für den Jubiläumspunkt
- [ ] Darstellung: Icon, Label, Chevron mit Rotation bei `data-state="open"`
- [ ] Flyout ohne Lib: `position: absolute` unter dem Menüpunkt; letzter Punkt rechtsbündig, damit nichts aus dem Header ragt
- [ ] Flyout vertikal: Hover-Intent + Klick + Tastatur (Enter/Space, Escape, Pfeile, Tab-Out schließt)
- [ ] `aria-expanded`, `aria-current="page"`, aktive Route inkl. Elternpunkt
- [ ] Schließen bei Routenwechsel
- [ ] Farben: `--ds-color-text-brand`, Hover `--ds-color-interactive-hover`
- [ ] MobileMenu nutzt dieselben Daten – Konsistenz prüfen

### Layout: Header / MobileMenu / Footer / InverseCorner / MobileStickyCTA
- [ ] Header-Geometrie als lokale Variablen bzw. `--ds-header-height`
- [ ] InverseCorner-Farbe = `--ds-color-bg` (Dark Mode automatisch)
- [ ] Footer-CTA-Overlap (`-mb-18 lg:-mb-36`) lokal im Footer

### Hero.vue
- [ ] Slide-Daten mit Tailwind-Klassen (`colorClass`, `overlayClassMobile`, `contentImageClassMobile` …) → semantische Props/Varianten
- [ ] Viewport-Werte lokal, Swiper-`:deep()` auf Tokens

### UApp entfernen
- [ ] Toaster ersetzt, `lang`/`dir` ohne `@nuxt/ui/locale` (z. B. aus i18n `localeProperties`)
- [ ] Tooltip-Provider nicht benötigt (keine Nutzung von UTooltip) – bestätigt

---

## 7. Offene Fragen

Keine. Alle Fragen sind geklärt (siehe Entscheidungen oben). Nächster Schritt: Phase 0.
