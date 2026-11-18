<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import BaseIcon from '~/components/base/Icon.vue'
import Button, { type ButtonVariant, type ButtonSize } from '~/components/base/Button.vue'
import Badge from '~/components/base/Badge.vue'
import Headline from '~/components/base/Headline.vue'
import BaseGrid from '~/components/base/Grid.vue'
import BaseIconList from '~/components/base/IconList.vue'
import BaseSwitch from '~/components/base/Switch.vue'
import BaseCollapsible from '~/components/base/Collapsible.vue'
import BaseFormField from '~/components/base/FormField.vue'
import BaseInput from '~/components/base/Input.vue'
import BaseInputNumber from '~/components/base/InputNumber.vue'
import BaseSelect from '~/components/base/Select.vue'
import BaseRadioGroup from '~/components/base/RadioGroup.vue'
import BaseTextarea from '~/components/base/Textarea.vue'
import ColorModeButton from '~/components/base/ColorModeButton.vue'
import FeatureCard from '~/components/sections/FeatureCard.vue'
import PricingCard from '~/components/sections/PricingCard.vue'
import EventDate from '~/components/events/EventDate.vue'
import ContactInfoCard from '~/components/club/ContactInfoCard.vue'
import SponsorPackageCard from '~/components/club/SponsorPackageCard.vue'
import PageHero from '~/components/sections/PageHero.vue'
import CtaSection from '~/components/sections/CtaSection.vue'
import Sponsors from '~/components/sections/Sponsors.vue'
import BoardMemberRow from '~/components/club/BoardMemberRow.vue'
import ExtendedBoardCard from '~/components/club/ExtendedBoardCard.vue'
import MembershipSignupSteps from '~/components/club/MembershipSignupSteps.vue'
import LegalSection from '~/components/club/LegalSection.vue'
import BaseImage from '~/components/base/Image.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Design System & Component Showcase',
  robots: 'noindex, nofollow'
})

type TabId = 'all' | 'tokens' | 'typography' | 'buttons' | 'forms' | 'cards' | 'sections'

const activeTab = ref<TabId>('all')

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'all', label: 'Alle anzeigen', icon: 'i-heroicons-squares-2x2' },
  { id: 'tokens', label: 'Farben & Tokens', icon: 'i-heroicons-swatch' },
  { id: 'typography', label: 'Typografie', icon: 'i-heroicons-bars-3-bottom-left' },
  { id: 'buttons', label: 'Buttons & Badges', icon: 'i-heroicons-cursor-arrow-rays' },
  { id: 'forms', label: 'Formulare & Interaktion', icon: 'i-heroicons-adjustments-horizontal' },
  { id: 'cards', label: 'Cards & Daten-Blöcke', icon: 'i-heroicons-rectangle-group' },
  { id: 'sections', label: 'Sektionen & Club-Blöcke', icon: 'i-heroicons-rectangle-stack' }
]

const showSection = (id: TabId) => activeTab.value === 'all' || activeTab.value === id

// 1. Farbpaletten
const palettes = [
  { key: 'brand-dark', label: 'Brand Dark (Navy)', base: '800' },
  { key: 'brand-light', label: 'Brand Light (Sky)', base: '400' },
  { key: 'highlight', label: 'Highlight (Lime)', base: '400' },
  { key: 'accent', label: 'Accent (Orange)', base: '500' }
]

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
const resolvedColors = reactive<Record<string, string>>({})

const rgbToHex = (rgbStr: string) => {
  if (!rgbStr) return ''
  if (rgbStr.startsWith('#')) return rgbStr
  const rgb = rgbStr.match(/\d+/g)
  if (!rgb || rgb.length < 3) return rgbStr
  return '#' +
    ('0' + parseInt(rgb[0] || '0', 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[1] || '0', 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2] || '0', 10).toString(16)).slice(-2)
}

onMounted(() => {
  const styles = getComputedStyle(document.documentElement)
  palettes.forEach((palette) => {
    steps.forEach((step) => {
      const varName = `--color-${palette.key}-${step}`
      const value = styles.getPropertyValue(varName).trim()
      resolvedColors[`${palette.key}-${step}`] = rgbToHex(value) || value
    })
  })
})

function getContrastColor(hex?: string) {
  if (!hex || !hex.startsWith('#')) return 'black'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'black' : 'white'
}

// 2. Buttons & Badges Demo-Daten
const buttonVariants: ButtonVariant[] = [
  'primary',
  'brand-dark',
  'highlight',
  'outline',
  'ghost',
  'gold1',
  'gold2'
]

const buttonSizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const badgeColors = ['primary', 'highlight', 'accent', 'neutral', 'success', 'warning', 'error'] as const

// 3. Formular & Interaktions-State
const toast = useToast()
const demoInput = ref('')
const demoNumber = ref(2)
const demoSelect = ref<string | undefined>('adult')
const demoRadio = ref<string | undefined>('invoice')
const demoTextarea = ref('')
const demoSwitch = ref(true)
const demoCollapsibleOpen = ref(false)

const selectOptions = [
  { value: 'adult', label: 'Erwachsene (290 € / Jahr)' },
  { value: 'student', label: 'Student / Azubi (145 € / Jahr)' },
  { value: 'youth', label: 'Jugendliche (80 € / Jahr)' }
]

const radioOptions = [
  { value: 'invoice', label: 'Per Rechnung' },
  { value: 'sepa', label: 'SEPA-Lastschrift' }
]

function triggerDemoToast(color: 'success' | 'error' | 'warning' | 'primary') {
  const messages = {
    success: { title: 'Erfolgreich gespeichert', description: 'Deine Änderungen wurden übernommen.' },
    error: { title: 'Fehler beim Senden', description: 'Bitte überprüfe deine Eingaben.' },
    warning: { title: 'Achtung', description: 'Bitte bestätige deine Angaben.' },
    primary: { title: 'Hinweis', description: 'Die Sommersaison startet am 19. April.' }
  }
  toast.add({
    ...messages[color],
    color
  })
}

// 4. Cards Demo-Daten
const demoPricingPlan = {
  title: 'Erwachsene',
  description: 'Volle Mitgliedschaft für Einzelpersonen ab 18 Jahren.',
  price: '290 €',
  discountedPrice: '145 €',
  discountText: 'Nur im 1. Jahr',
  billingCycle: '/ Jahr',
  features: ['Volle Spielberechtigung', '50% Rabatt im 1. Jahr', 'Stimmrecht auf der MV'],
  button: {
    label: 'Antrag herunterladen',
    icon: 'i-heroicons-arrow-down-tray',
    variant: 'brand-dark' as ButtonVariant,
    block: true,
    size: 'lg' as ButtonSize
  }
}

const demoSponsorPackage = {
  name: 'Bandenwerbung',
  size: '260 x 90 cm',
  icon: 'i-heroicons-megaphone',
  description: 'Der Klassiker: Große Werbefläche direkt am Platz. Maximale Sichtbarkeit für Spieler und Zuschauer.'
}

// 5. Sektionen & Club-Blöcke Demo-Daten
const demoBoardMember = {
  name: 'Marcus Gölden',
  role: '1. Vorsitzender',
  area: 'Vorstand & Vereinsführung',
  email: 'marcus.goelden@tc-hardt.de',
  phone: '02161 / 123456',
  image: '/img/home/alexander-lunyov-wBLW_19byJY-unsplash.jpg'
}

const demoExtendedMember = {
  name: 'Stefan Kellers',
  role: 'Sportwart',
  area: 'Turniere & Spielbetrieb',
  email: 'sport@tc-hardt.de'
}
</script>

<template>
  <div class="styleguide-page">
    <!-- Sticky Header & Navigation -->
    <header class="sg-header">
      <div class="sg-header-inner">
        <div class="sg-title-group">
          <span class="sg-eyebrow">Living Styleguide</span>
          <h1 class="sg-title">TC Hardt Design System</h1>
        </div>

        <div class="sg-controls">
          <Button
            to="/"
            variant="outline"
            size="sm"
            icon="i-heroicons-arrow-left"
            label="Zur Website"
          />
          <ColorModeButton />
        </div>
      </div>

      <nav class="sg-tabs" aria-label="Styleguide Kategorien">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="sg-tab"
          :class="{ 'is-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <BaseIcon :name="tab.icon" class="tab-icon" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </header>

    <div class="sg-body">
      <!-- 1. FARBEN & TOKENS -->
      <section v-if="showSection('tokens')" class="sg-section">
        <div class="sg-section-head">
          <h2 class="sg-section-title">1. Farben & CSS Custom Properties (<code>_tokens.scss</code>)</h2>
          <p class="sg-section-desc">
            Live berechnete Hex-Werte aus <code>:root</code>. Änderungen in <code>app/assets/scss/_tokens.scss</code> sind sofort sichtbar.
          </p>
        </div>

        <div class="palettes-grid">
          <div
            v-for="palette in palettes"
            :key="palette.key"
            class="palette-col"
          >
            <div class="palette-header">
              <div
                class="palette-swatch"
                :style="{ backgroundColor: `var(--color-${palette.key}-${palette.base})` }"
              />
              <div>
                <h3 class="palette-title">{{ palette.label }}</h3>
                <p class="palette-var"><code>--color-{{ palette.key }}-*</code></p>
              </div>
            </div>

            <div class="steps-stack">
              <div
                v-for="step in steps"
                :key="step"
                class="step-row"
                :style="{
                  backgroundColor: `var(--color-${palette.key}-${step})`,
                  color: getContrastColor(resolvedColors[`${palette.key}-${step}`])
                }"
              >
                <span class="step-label">{{ step }}</span>
                <span class="step-hex">{{ resolvedColors[`${palette.key}-${step}`] || '...' }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. TYPOGRAFIE & HEADLINES -->
      <section v-if="showSection('typography')" class="sg-section">
        <div class="sg-section-head">
          <h2 class="sg-section-title">2. Typografie & <code>&lt;Headline&gt;</code></h2>
          <p class="sg-section-desc">
            Kombination aus <code>EurostileExtended</code> / <code>EurostileBold</code> für Überschriften und <code>system-ui</code> für Fließtext.
          </p>
        </div>

        <div class="sg-card">
          <div class="typo-stack">
            <Headline
              tagline="Tagline Brand"
              tagline-variant="brand"
              title="Headline Größe H1 (Eurostile)"
              description="Optionaler Beschreibungstext unter der Überschrift mit angenehmer Zeilenlänge."
              tag="h2"
              size="h1"
              margin-bottom="sm"
            />
            <hr class="u-separator">
            <Headline
              tagline="Tagline Accent"
              tagline-variant="accent"
              title="Headline Größe H2"
              tag="h2"
              size="h2"
              margin-bottom="none"
            />
            <Headline
              tagline="Tagline Highlight"
              tagline-variant="highlight"
              title="Headline Größe H3"
              tag="h3"
              size="h3"
              margin-bottom="none"
            />
            <Headline
              title="Headline Größe H4"
              tag="h4"
              size="h4"
              margin-bottom="none"
            />
            <Headline
              title="Headline Größe H5"
              tag="h5"
              size="h5"
              margin-bottom="none"
            />
          </div>
        </div>
      </section>

      <!-- 3. BUTTONS & BADGES -->
      <section v-if="showSection('buttons')" class="sg-section">
        <div class="sg-section-head">
          <h2 class="sg-section-title">3. <code>&lt;Button&gt;</code> & <code>&lt;Badge&gt;</code></h2>
          <p class="sg-section-desc">
            Alle Farbvarianten, Größen, Icon-Positionen und Ladezustände.
          </p>
        </div>

        <div class="sg-card">
          <h3 class="sg-sub-title">Button-Varianten</h3>
          <div class="flex-row">
            <Button
              v-for="variant in buttonVariants"
              :key="variant"
              :variant="variant"
              :label="variant"
            />
          </div>

          <div class="dark-preview-strip">
            <Button
              variant="ghost-white"
              label="ghost-white (auf dunklem Grund)"
              icon="i-heroicons-arrow-left"
            />
          </div>

          <h3 class="sg-sub-title with-mt">Button-Größen & Zustände</h3>
          <div class="flex-row">
            <Button
              v-for="size in buttonSizes"
              :key="size"
              :size="size"
              variant="primary"
              :label="`Size ${size.toUpperCase()}`"
            />
            <Button
              variant="primary"
              label="Mit Icon"
              icon="i-heroicons-paper-airplane"
            />
            <Button
              variant="outline"
              label="Trailing Icon"
              trailing-icon="i-heroicons-arrow-right"
            />
            <Button
              variant="primary"
              label="Lädt..."
              loading
            />
            <Button
              variant="outline"
              label="Deaktiviert"
              disabled
            />
          </div>

          <hr class="u-separator with-my">

          <h3 class="sg-sub-title">Badges (Solid, Subtle, Outline)</h3>
          <div class="badge-matrix">
            <div class="flex-row">
              <Badge
                v-for="color in badgeColors"
                :key="`solid-${color}`"
                :color="color"
                variant="solid"
                size="md"
              >
                {{ color }} (solid)
              </Badge>
            </div>
            <div class="flex-row">
              <Badge
                v-for="color in badgeColors"
                :key="`subtle-${color}`"
                :color="color"
                variant="subtle"
                size="md"
              >
                {{ color }} (subtle)
              </Badge>
            </div>
            <div class="flex-row">
              <Badge
                v-for="color in badgeColors"
                :key="`outline-${color}`"
                :color="color"
                variant="outline"
                size="md"
              >
                {{ color }} (outline)
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. FORMULARE & INTERAKTION -->
      <section v-if="showSection('forms')" class="sg-section">
        <div class="sg-section-head">
          <h2 class="sg-section-title">4. Formulare, Switches, Collapsible & Toasts</h2>
          <p class="sg-section-desc">
            Eigene leichtgewichtige Formular-Komponenten ohne externe UI-Bibliothek.
          </p>
        </div>

        <div class="sg-card">
          <BaseGrid :cols="2">
            <BaseFormField label="Text-Eingabe (Input)" name="demo-input" required>
              <BaseInput
                v-model="demoInput"
                placeholder="Max Mustermann"
                icon="i-heroicons-user"
                size="lg"
              />
            </BaseFormField>

            <BaseFormField label="Fehlerzustand (Error)" name="demo-error" error="Bitte gib eine gültige E-Mail-Adresse ein" required>
              <BaseInput
                model-value="ungueltig@"
                icon="i-heroicons-envelope"
                size="lg"
              />
            </BaseFormField>

            <BaseFormField label="Zahlenfeld (InputNumber)" name="demo-num">
              <BaseInputNumber
                v-model="demoNumber"
                :min="1"
                :max="10"
                size="lg"
              />
            </BaseFormField>

            <BaseFormField label="Auswahlfeld (Select)" name="demo-select">
              <BaseSelect
                v-model="demoSelect"
                :items="selectOptions"
                size="lg"
              />
            </BaseFormField>

            <BaseFormField label="Radio-Gruppe (RadioGroup)" name="demo-radio">
              <BaseRadioGroup
                v-model="demoRadio"
                :items="radioOptions"
              />
            </BaseFormField>

            <BaseFormField label="Mehrzeiliges Textfeld (Textarea)" name="demo-textarea">
              <BaseTextarea
                v-model="demoTextarea"
                placeholder="Deine Nachricht..."
                :rows="3"
                size="lg"
              />
            </BaseFormField>
          </BaseGrid>

          <hr class="u-separator with-my">

          <BaseGrid :cols="2">
            <div>
              <h3 class="sg-sub-title">Switch & Toast-Benachrichtigungen</h3>
              <div class="flex-row with-mb">
                <BaseSwitch v-model="demoSwitch" />
                <span>Switch Status: <strong>{{ demoSwitch ? 'Aktiv' : 'Inaktiv' }}</strong></span>
              </div>
              <div class="flex-row">
                <Button
                  size="sm"
                  variant="primary"
                  label="Success-Toast"
                  icon="i-heroicons-check-circle"
                  @click="triggerDemoToast('success')"
                />
                <Button
                  size="sm"
                  variant="brand-dark"
                  label="Error-Toast"
                  icon="i-heroicons-exclamation-triangle"
                  @click="triggerDemoToast('error')"
                />
                <Button
                  size="sm"
                  variant="outline"
                  label="Info-Toast"
                  icon="i-heroicons-information-circle"
                  @click="triggerDemoToast('primary')"
                />
              </div>
            </div>

            <div>
              <h3 class="sg-sub-title">Collapsible (Akkordeon)</h3>
              <BaseCollapsible :open="demoCollapsibleOpen">
                <Button
                  variant="outline"
                  :label="demoCollapsibleOpen ? 'Details zuklappen' : 'Details aufklappen'"
                  trailing-icon="i-heroicons-chevron-down"
                  @click="demoCollapsibleOpen = !demoCollapsibleOpen"
                />
                <template #content>
                  <div class="collapsible-demo-box">
                    Dieser Inhalt klappt per sanfter CSS-Grid-Transition (<code>grid-template-rows: 0fr → 1fr</code>) auf und zu.
                  </div>
                </template>
              </BaseCollapsible>
            </div>
          </BaseGrid>
        </div>
      </section>

      <!-- 5. CARDS & DATEN-BLÖCKE -->
      <section v-if="showSection('cards')" class="sg-section">
        <div class="sg-section-head">
          <h2 class="sg-section-title">5. Cards, Icon-Listen & Datums-Badges</h2>
          <p class="sg-section-desc">
            Wiederverwendbare Karten- und Inhaltsbausteine für Startseite, Mitgliedschaft, Termine und Sponsoring.
          </p>
        </div>

        <BaseGrid :cols="4">
          <FeatureCard
            icon="i-heroicons-trophy"
            title="FeatureCard (Orange)"
            description="Mit farbigem Icon-Badge und Highlight-Top-Border."
            icon-color="color-orange"
            icon-bg="bg-orange"
          />
          <FeatureCard
            icon="i-heroicons-user-group"
            title="FeatureCard (Blue)"
            description="Klickbare Variante mit Hover-Lift-Effekt."
            icon-color="color-blue"
            icon-bg="bg-blue"
            to="#cards"
          />
          <SponsorPackageCard :item="demoSponsorPackage" />
          <ContactInfoCard icon="i-heroicons-map-pin" title="ContactInfoCard">
            <address>
              Birkmannsweg 16<br>
              41169 Mönchengladbach
            </address>
          </ContactInfoCard>
        </BaseGrid>

        <div class="with-mt">
          <BaseGrid :cols="2">
            <PricingCard :plan="demoPricingPlan" />

            <div class="sg-card">
              <h3 class="sg-sub-title"><code>&lt;EventDate&gt;</code> & <code>&lt;BaseIconList&gt;</code></h3>
              <div class="flex-row with-mb">
                <EventDate date="2027-05-01" />
                <EventDate date="2026-08-29" date-end="2026-09-13" />
                <EventDate date="tba" />
              </div>
              <hr class="u-separator with-my">
              <BaseIconList
                :items="[
                  { label: '6 Sandplätze:', text: 'Top-gepflegte Ascheplätze am Hardter Wald.' },
                  { label: 'Clubhaus:', text: 'Sonnenterrasse mit Blick auf die Plätze.' },
                  { icon: 'i-heroicons-sparkles', label: 'Jugendförderung:', text: 'Training für alle Altersklassen.' }
                ]"
                icon-color="brand-light"
                icon-size="lg"
              />
            </div>
          </BaseGrid>
        </div>
      </section>

      <!-- 6. SEKTIONEN & CLUB-BLÖCKE -->
      <section v-if="showSection('sections')" class="sg-section">
        <div class="sg-section-head">
          <h2 class="sg-section-title">6. Sektionen, Layout & Club-Bausteine</h2>
          <p class="sg-section-desc">
            Vollständige Sektions-Templates und Domain-spezifische Bausteine für Seiten, Vorstand und Beitritt.
          </p>
        </div>

        <div class="sg-stack">
          <!-- PageHero Demo -->
          <div class="sg-card no-padding overflow-hidden">
            <div class="card-caption">
              <h3 class="card-caption-title"><code>&lt;PageHero&gt;</code></h3>
              <p class="card-caption-desc">Standardisierter Seiten-Header mit Tagline, Titel, Badge und Zurück-Link.</p>
            </div>
            <PageHero
              title="Unser Verein"
              description="Tradition, sportlicher Ehrgeiz und lebendige Gemeinschaft seit 1970."
              badge="Über uns"
              back-to="/"
              back-label="Zurück zur Startseite"
            />
          </div>

          <!-- CtaSection Demo -->
          <div class="sg-card no-padding overflow-hidden">
            <div class="card-caption">
              <h3 class="card-caption-title"><code>&lt;CtaSection&gt;</code></h3>
              <p class="card-caption-desc">Call-to-Action Banner mit Aktions-Buttons und Farbvarianten.</p>
            </div>
            <CtaSection
              title="Lust auf Tennis beim TC Hardt?"
              tagline="Jetzt einsteigen"
              description="Werde Teil unserer Tennis-Community und sichere dir 50% Rabatt im ersten Jahr."
              variant="highlight"
              :actions="[
                { label: 'Mitglied werden', to: '#', variant: 'brand-dark', icon: 'i-heroicons-user-plus' },
                { label: 'Trainingsangebot ansehen', to: '#', variant: 'outline' }
              ]"
            />
          </div>

          <!-- Vorstand Demo -->
          <div class="sg-card">
            <h3 class="sg-sub-title">Vorstandszeile & Erweiterter Vorstand</h3>
            <div class="with-mb">
              <BoardMemberRow :member="demoBoardMember" />
            </div>
            <BaseGrid :cols="3">
              <ExtendedBoardCard :member="demoExtendedMember" />
              <ExtendedBoardCard :member="{ name: 'Christian Becker', role: 'Jugendwart', area: 'Jugendtraining', email: 'jugend@tc-hardt.de' }" />
              <ExtendedBoardCard :member="{ name: 'Markus Jansen', role: 'Kassenprüfer', area: 'Finanzen' }" />
            </BaseGrid>
          </div>

          <!-- Membership Steps Demo -->
          <div class="sg-card">
            <h3 class="sg-sub-title"><code>&lt;MembershipSignupSteps&gt;</code></h3>
            <MembershipSignupSteps pdf-path="/docs/aufnahmeantrag.pdf" />
          </div>

          <!-- LegalSection Demo -->
          <div class="sg-card">
            <h3 class="sg-sub-title"><code>&lt;LegalSection&gt;</code></h3>
            <LegalSection title="1. Angaben gemäß § 5 TMG" divider>
              <p>
                Tennisclub Hardt 1970 e.V.<br>
                Birkmannsweg 16<br>
                41169 Mönchengladbach
              </p>
            </LegalSection>
            <LegalSection title="2. Vertreten durch" divider>
              <p>Marcus Gölden (1. Vorsitzender)</p>
            </LegalSection>
          </div>

          <!-- BaseImage Demo -->
          <div class="sg-card">
            <h3 class="sg-sub-title"><code>&lt;BaseImage&gt;</code> (Bild-Komponente)</h3>
            <BaseGrid :cols="3">
              <div>
                <span class="preview-note">variant="feature"</span>
                <BaseImage
                  src="/img/home/unsere-werte.jpg"
                  alt="Unsere Werte"
                  variant="feature"
                />
              </div>
              <div>
                <span class="preview-note">variant="portrait"</span>
                <BaseImage
                  src="/img/home/alexander-lunyov-wBLW_19byJY-unsplash.jpg"
                  alt="Portrait"
                  variant="portrait"
                />
              </div>
              <div>
                <span class="preview-note">variant="round"</span>
                <div class="flex-center">
                  <BaseImage
                    src="/img/memorial/reinhard.jpg"
                    alt="Round"
                    variant="round"
                    size="small"
                  />
                </div>
              </div>
            </BaseGrid>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.styleguide-page {
  min-height: 100vh;
  background-color: var(--color-gray-50);
  color: var(--color-gray-900);
  font-family: var(--font-sans);
  padding-bottom: var(--space-24);

  @include dark {
    background-color: var(--color-gray-950);
    color: var(--color-gray-100);
  }
}

.sg-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: rgb(255 255 255 / 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--space-4) var(--space-6) 0;

  @include dark {
    background-color: rgb(15 23 42 / 0.9);
    border-bottom-color: var(--color-gray-800);
  }
}

.sg-header-inner {
  max-width: 80rem;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
}

.sg-eyebrow {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent-500);
}

.sg-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.sg-tabs {
  max-width: 80rem;
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding-bottom: var(--space-3);
}

.sg-tab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  color: var(--color-gray-600);
  background-color: transparent;
  border: 1px solid transparent;
  transition: all var(--transition-fast);

  @include dark {
    color: var(--color-gray-300);
  }

  &:hover:not(.is-active) {
    background-color: var(--color-gray-100);

    @include dark {
      background-color: var(--color-gray-800);
    }
  }

  &.is-active {
    background-color: var(--color-brand-dark-800);
    color: var(--color-pure-white);
  }
}

.tab-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.sg-body {
  max-width: 80rem;
  margin-inline: auto;
  padding: var(--space-10) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.sg-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.sg-section-head {
  border-left: 4px solid var(--color-accent-500);
  padding-left: var(--space-4);
}

.sg-section-title {
  margin: 0 0 var(--space-1);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.sg-section-desc {
  margin: 0;
  color: var(--color-gray-500);
  font-size: 0.9375rem;
}

.sg-card {
  background-color: var(--color-pure-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-800);
  }
}

.sg-sub-title {
  margin: 0 0 var(--space-4);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-gray-700);

  @include dark {
    color: var(--color-gray-300);
  }

  &.with-mt {
    margin-top: var(--space-8);
  }
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);

  &.with-mb {
    margin-bottom: var(--space-6);
  }
}

.with-mt {
  margin-top: var(--space-8);
}

.with-my {
  margin-block: var(--space-8);
}

.dark-preview-strip {
  margin-top: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background-color: var(--color-brand-dark-900);
  display: inline-flex;
}

.badge-matrix {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.typo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.collapsible-demo-box {
  margin-top: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  font-size: 0.875rem;

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.palettes-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @include up('md') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include up('xl') {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.palette-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.palette-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.palette-swatch {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgb(17 24 39 / 0.1);
}

.palette-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.palette-var {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

.steps-stack {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);

  @include dark {
    border-color: var(--color-gray-800);
  }
}

.step-row {
  height: 2.5rem;
  padding-inline: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  transition: transform var(--transition-fast);
  transform-origin: left;

  &:hover {
    transform: scale(1.03);
    z-index: 10;
  }
}

.step-label {
  font-weight: 700;
}

.step-hex {
  opacity: 0.85;
  text-transform: uppercase;
}

.sg-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.no-padding {
  padding: 0 !important;
}

.overflow-hidden {
  overflow: hidden;
}

.card-caption {
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-200);

  @include dark {
    background-color: var(--color-gray-800);
    border-bottom-color: var(--color-gray-700);
  }
}

.card-caption-title {
  margin: 0 0 var(--space-1);
  font-size: 1rem;
  font-weight: 700;
}

.card-caption-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-400);
  }
}

.preview-note {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-gray-500);
  margin-bottom: var(--space-2);
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
