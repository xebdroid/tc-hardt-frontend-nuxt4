<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/section/Hero.vue'
import db from '~/assets/data/db.json'

useHead({
  title: 'Mitglied werden | TC Hardt',
  meta: [{ name: 'description', content: 'Werde Teil unserer Tennis-Gemeinschaft. Lade hier deinen Mitgliedsantrag herunter.' }]
})

// --- CONFIG ---
// Pfad zur PDF-Datei (muss im Ordner /public/files/ liegen oder angepasst werden)
const PDF_PATH = '/files/Aufnahmeantrag_TC_Hardt.pdf'

// --- DATA ---
const rawTariffs = db.tariffs

// Hero Slides
const heroSlides = computed<HeroSlide[]>(() => [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop',
    title: 'Dein Platz ist bei uns.',
    subtitle: 'Werde Teil einer starken Gemeinschaft.',
    description: 'Egal ob ambitionierter Mannschaftsspieler oder Hobbyspieler – beim TC Hardt findest du Spielpartner, Freunde und ein zweites Zuhause.',
    overlayPosition: 'center',
    // CTA 1: Scrollt zur Anleitung/Download
    ctaPrimary: { label: 'Mitgliedsantrag herunterladen', to: '#anmeldung', icon: 'i-heroicons-arrow-down-tray' },
    // CTA 2: Scrollt zu den Preisen
    ctaSecondary: { label: 'Zu den Tarifen', to: '#tarife' }
  }
])

// Vorteile
const benefits = [
  { icon: 'i-heroicons-sparkles', title: 'Top Anlage', desc: '6 gepflegte Ascheplätze am Waldrand.', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' },
  { icon: 'i-heroicons-user-group', title: 'Gemeinschaft', desc: 'Events, Turniere und Sommerfeste.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { icon: 'i-heroicons-academic-cap', title: 'Training', desc: 'Tennisschule für alle Level.', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
  { icon: 'i-heroicons-currency-euro', title: 'Faire Preise', desc: 'Günstiger Einstieg & Familienrabatte.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10' },
  { icon: 'i-heroicons-home-modern', title: 'Clubhaus & Terrasse', desc: 'Clubraum mit Beamer & Sound, Sonnenterrasse.', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/10' },
  { icon: 'i-heroicons-trophy', title: 'Wettkampf', desc: 'Mannschaften in vielen Altersklassen.', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
]

// Tabs
const tariffTabs = [
  { label: 'Schnupperangebot', slot: 'trial' },
  { label: 'Erwachsene & Familie', slot: 'adults' },
  { label: 'Jugend & Ausbildung', slot: 'youth' }
]

// --- HELPER ---
const formatPrice = (price: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)

const scrollToDownload = () => {
  const el = document.getElementById('anmeldung')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// --- TRANSFORMER (Für Pricing Cards) ---
const mapToPlan = (t: any) => {
  const isAdultGroup = ['adult', 'family', 'senior', 'passive'].includes(t.id)
  const isTrial = t.id.startsWith('trial_')
  const hasDiscount = ['adult', 'family', 'student', 'youth'].includes(t.id)

  // Styling
  const themeColorBorder = isTrial ? 'border-highlight-500' : (isAdultGroup ? 'border-tennis-800' : 'border-tennis-500')
  const btnBgClass = isTrial ? 'bg-highlight-500 hover:bg-highlight-600 text-tennis-900' : (isAdultGroup ? 'bg-tennis-800 hover:bg-tennis-900 text-white' : 'bg-tennis-500 hover:bg-tennis-600 text-white')

  // Badges
  let badge = undefined
  if (t.id === 'adult') badge = { label: 'Bestseller', variant: 'soft', color: 'primary' }
  if (t.id === 'family') badge = { label: 'Top Deal', variant: 'subtle', color: 'primary' }
  if (isTrial && t.price === 0) badge = { label: 'Gratis', variant: 'solid', color: 'primary' }

  return {
    title: t.label,
    description: t.description,
    price: formatPrice(t.price),
    discount: hasDiscount ? formatPrice(t.price / 2) : undefined,
    billingCycle: t.suffix,
    billingPeriod: isTrial ? 'Endet automatisch' : (hasDiscount ? 'im 1. Jahr' : undefined),
    features: t.features,
    badge: badge,
    class: `bg-white dark:bg-gray-800 transition-all duration-300 border-t-4 ${themeColorBorder} ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-xl`,

    // Button führt jetzt zum Download-Bereich
    button: {
      label: 'Antrag laden',
      icon: 'i-heroicons-arrow-down-tray',
      color: 'neutral',
      variant: 'solid',
      block: true,
      size: 'md',
      class: `font-bold py-2 ${btnBgClass}`,
      onClick: scrollToDownload
    }
  }
}

const adultPlans = computed(() => rawTariffs.filter(t => ['adult', 'family', 'senior', 'passive'].includes(t.id)).map(mapToPlan))
const youthPlans = computed(() => rawTariffs.filter(t => ['student', 'youth', 'child'].includes(t.id)).map(mapToPlan))
const trialPlans = computed(() => rawTariffs.filter(t => t.id.startsWith('trial_')).map(mapToPlan))

</script>

<template>
  <div class="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-950">

    <Hero
      :slides="heroSlides"
      height="large"
      fallback-class="bg-tennis-900"
    />

    <div class="bg-white dark:bg-gray-900 py-20 border-b border-gray-100 dark:border-gray-800">
      <UContainer>
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-4">
            Warum Mitglied werden?
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-lg">
            Tennis beim TC Hardt ist mehr als Sport. Entdecke unsere Vorteile.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex items-start gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-md transition-all group"
          >
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors"
              :class="benefit.bg"
            >
              <UIcon
                :name="benefit.icon"
                class="w-6 h-6"
                :class="benefit.color"
              />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-tennis-600 transition-colors">
                {{ benefit.title }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {{ benefit.desc }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <div id="tarife" class="bg-tennis-50/50 dark:bg-gray-950 py-24 scroll-mt-16">
      <UContainer>
        <div class="text-center mb-10 max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-4">
            Unsere Beiträge
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Transparent und fair. Wähle den Tarif, der zu dir passt.
          </p>
        </div>

        <UTabs
          :items="tariffTabs"
          class="w-full"
          :ui="{ list: { background: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8' } }"
        >
          <template #trial>
            <div class="pt-4 animate-fade-in">
              <div class="mb-8 bg-highlight-50 dark:bg-highlight-900/10 border border-highlight-200 rounded-xl p-6 text-center max-w-3xl mx-auto">
                <h3 class="font-bold text-highlight-700 dark:text-highlight-400 mb-1">Dein Einstieg ohne Risiko</h3>
                <p class="text-sm text-gray-700 dark:text-gray-300">Die Probemitgliedschaft endet automatisch nach 3 Monaten.</p>
              </div>
              <UPricingPlans :ui="{ wrapper: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' }">
                <UPricingPlan
                  v-for="(plan, index) in trialPlans"
                  :key="index"
                  v-bind="plan"
                />
              </UPricingPlans>
            </div>
          </template>

          <template #adults>
            <div class="pt-4 animate-fade-in">
              <div class="mb-8 bg-tennis-100/50 border border-tennis-200 rounded-xl p-6 text-center max-w-3xl mx-auto">
                <h3 class="font-bold text-tennis-800 mb-1">50% Willkommens-Rabatt</h3>
                <p class="text-sm text-gray-700">Gilt für alle aktiven Neumitglieder im ersten Jahr.</p>
              </div>
              <UPricingPlans :ui="{ wrapper: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' }">
                <UPricingPlan
                  v-for="(plan, index) in adultPlans"
                  :key="index"
                  v-bind="plan"
                />
              </UPricingPlans>
            </div>
          </template>

          <template #youth>
            <div class="pt-4 animate-fade-in">
              <UPricingPlans :ui="{ wrapper: 'grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto' }">
                <UPricingPlan
                  v-for="(plan, index) in youthPlans"
                  :key="index"
                  v-bind="plan"
                />
              </UPricingPlans>
            </div>
          </template>
        </UTabs>
      </UContainer>
    </div>

    <div id="anmeldung" class="w-full bg-white dark:bg-gray-900 py-24 border-t border-gray-100 dark:border-gray-800 scroll-mt-16">
      <UContainer class="max-w-4xl">

        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-6">
            So wirst du Mitglied
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Wir haben den Prozess so einfach wie möglich gestaltet. Lade den Antrag herunter, fülle ihn aus und schicke ihn uns zurück.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 relative mb-16">
          <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"/>

          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 rounded-full bg-white dark:bg-gray-800 border-4 border-highlight-500 flex items-center justify-center mb-6 shadow-lg z-10">
              <span class="text-4xl">📥</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Herunterladen</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Lade dir das PDF-Formular auf dein Gerät herunter.</p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 rounded-full bg-white dark:bg-gray-800 border-4 border-tennis-500 flex items-center justify-center mb-6 shadow-lg z-10">
              <span class="text-4xl">✍️</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Ausfüllen</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Fülle das Formular digital oder handschriftlich aus.</p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 rounded-full bg-white dark:bg-gray-800 border-4 border-green-500 flex items-center justify-center mb-6 shadow-lg z-10">
              <span class="text-4xl">✉️</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Absenden</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Schicke es per E-Mail oder wirf es in den Briefkasten.</p>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-tennis-600 mb-6 mx-auto" />

          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Aufnahmeantrag TC Hardt
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            Das PDF enthält alle Tarife, Datenschutzinformationen und das SEPA-Mandat.
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <UButton
              :to="PDF_PATH"
              target="_blank"
              size="xl"
              icon="i-heroicons-arrow-down-tray"
              class="font-bold py-4 px-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform"
              color="primary"
            >
              Antrag herunterladen (PDF)
            </UButton>
          </div>

          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 grid sm:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center justify-center sm:justify-end gap-2">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
              <span>Per E-Mail an: <a href="mailto:info@tc-hardt.de" class="text-tennis-600 font-bold hover:underline">info@tc-hardt.de</a></span>
            </div>
            <div class="flex items-center justify-center sm:justify-start gap-2">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
              <span>Oder Post/Einwurf: <strong>Birkmannsweg 16</strong></span>
            </div>
          </div>
        </div>

      </UContainer>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
