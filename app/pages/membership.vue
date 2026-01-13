<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/section/Hero.vue'
import db from '~/assets/data/db.json'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

useHead({
  title: 'Mitglied werden | TC Hardt',
  meta: [{ name: 'description', content: 'Werde Teil unserer Tennis-Gemeinschaft.' }]
})

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
    ctaPrimary: { label: 'Jetzt Mitglied werden', to: '#formular' },
    ctaSecondary: { label: 'Zum Schnupperangebot', to: '#tarife' }
  }
])

// Vorteile (Angepasst: Clubhaus statt Gastronomie, keine Emojis)
const benefits = [
  { icon: 'i-heroicons-sparkles', title: 'Top Anlage', desc: '6 gepflegte Ascheplätze am Waldrand.', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' },
  { icon: 'i-heroicons-user-group', title: 'Gemeinschaft', desc: 'Events, Turniere und Sommerfeste.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { icon: 'i-heroicons-academic-cap', title: 'Training', desc: 'Tennisschule für alle Level.', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
  { icon: 'i-heroicons-currency-euro', title: 'Faire Preise', desc: 'Günstiger Einstieg & Familienrabatte.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10' },
  { icon: 'i-heroicons-home-modern', title: 'Clubhaus & Terrasse', desc: 'Clubraum mit Beamer & Sound, Sonnenterrasse und Getränke-Selbstbedienung.', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/10' },
  { icon: 'i-heroicons-trophy', title: 'Wettkampf', desc: 'Mannschaften in vielen Altersklassen.', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
]

// --- STATE ---
const formSectionRef = ref<HTMLElement | null>(null)

const state = reactive({
  tariff: '' as string,
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: 'male',
  email: '',
  phone: '',
  street: '',
  houseNumber: '',
  zip: '',
  city: '',
  playedBefore: false,
  isTeamPlayer: false,
  previousClub: '',
  iban: '',
  sepaAccepted: false,
  privacyAccepted: false,
  keyRequested: false
})

// --- TABS (Ohne Emojis) ---
const tariffTabs = [
  { label: 'Schnupperangebot', slot: 'trial' },
  { label: 'Erwachsene & Familie', slot: 'adults' },
  { label: 'Jugend & Ausbildung', slot: 'youth' }
]

// --- HELPER ---
const formatPrice = (price: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)

const selectTariff = (tariffId: string) => {
  state.tariff = tariffId
  const el = document.getElementById('formular')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// --- TRANSFORMER ---
const mapToPlan = (t: any) => {
  const isSelected = state.tariff === t.id
  const hasDiscount = ['adult', 'family', 'student', 'youth'].includes(t.id)
  const isTrial = t.id.startsWith('trial_')

  const isAdultGroup = ['adult', 'family', 'senior', 'passive'].includes(t.id)

  // Farben
  let themeColorBorder = ''
  let btnBgClass = ''
  let btnTextClass = ''

  if (isTrial) {
    themeColorBorder = 'border-highlight-500'
    btnBgClass = 'bg-highlight-500 hover:bg-highlight-600'
    btnTextClass = 'text-tennis-900'
  } else if (isAdultGroup) {
    themeColorBorder = 'border-tennis-800'
    btnBgClass = 'bg-tennis-800 hover:bg-tennis-900'
    btnTextClass = 'text-white'
  } else {
    themeColorBorder = 'border-tennis-500'
    btnBgClass = 'bg-tennis-500 hover:bg-tennis-600'
    btnTextClass = 'text-white'
  }

  const btnClass = `font-bold py-2 transition-transform active:scale-95 ${btnBgClass} ${btnTextClass}`

  // Badge
  let badge = undefined
  if (t.id === 'adult') badge = { label: 'Bestseller', variant: 'soft', color: 'primary' }
  if (t.id === 'family') badge = { label: 'Top Deal', variant: 'subtle', color: 'primary' }
  if (isTrial && t.price === 0) badge = { label: 'Gratis', variant: 'solid', color: 'primary' }

  // Highlighting
  let ringClass = 'ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-2 hover:ring-opacity-50 hover:shadow-lg'
  if (isSelected) {
    if (isTrial) ringClass = 'ring-2 ring-highlight-500 shadow-xl'
    else if (isAdultGroup) ringClass = 'ring-2 ring-tennis-800 shadow-xl'
    else ringClass = 'ring-2 ring-tennis-500 shadow-xl'
  }

  return {
    title: t.label,
    description: t.description,
    price: formatPrice(t.price),
    discount: hasDiscount ? formatPrice(t.price / 2) : undefined,
    billingCycle: t.suffix,
    billingPeriod: isTrial ? 'Endet automatisch' : (hasDiscount ? 'im 1. Jahr' : undefined),
    features: t.features,
    badge: badge,
    highlight: isSelected,
    scale: isSelected,

    class: `bg-white dark:bg-gray-800 transition-all duration-300 border-t-4 ${themeColorBorder} ${ringClass}`,

    button: {
      label: isSelected ? 'Ausgewählt' : (isTrial ? 'Jetzt testen' : 'Wählen'),
      color: 'neutral',
      variant: 'solid',
      block: true,
      size: 'md',
      class: btnClass,
      onClick: () => selectTariff(t.id)
    }
  }
}

const adultPlans = computed(() => rawTariffs.filter(t => ['adult', 'family', 'senior', 'passive'].includes(t.id)).map(mapToPlan))
const youthPlans = computed(() => rawTariffs.filter(t => ['student', 'youth', 'child'].includes(t.id)).map(mapToPlan))
const trialPlans = computed(() => rawTariffs.filter(t => t.id.startsWith('trial_')).map(mapToPlan))

const tariffOptions = computed(() => rawTariffs.map(t => ({
  label: `${t.label} (${formatPrice(t.price)})`,
  value: t.id
})))

// --- VALIDATION ---
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.tariff) errors.push({ name: 'tariff', message: 'Bitte Tarif wählen' })
  if (!state.firstName) errors.push({ name: 'firstName', message: 'Pflichtfeld' })
  if (!state.lastName) errors.push({ name: 'lastName', message: 'Pflichtfeld' })
  if (!state.birthDate) errors.push({ name: 'birthDate', message: 'Pflichtfeld' })
  if (!state.email) errors.push({ name: 'email', message: 'Pflichtfeld' })
  if (!state.street) errors.push({ name: 'street', message: 'Pflichtfeld' })
  if (!state.houseNumber) errors.push({ name: 'houseNumber', message: 'Pflichtfeld' })
  if (!state.zip) errors.push({ name: 'zip', message: 'Pflichtfeld' })
  if (!state.city) errors.push({ name: 'city', message: 'Pflichtfeld' })
  if (!state.iban) { errors.push({ name: 'iban', message: 'IBAN erforderlich' }) }
  if (!state.sepaAccepted) errors.push({ name: 'sepaAccepted', message: 'Zustimmung nötig' })
  if (!state.privacyAccepted) errors.push({ name: 'privacyAccepted', message: 'Zustimmung nötig' })
  return errors
}

const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  console.log('Form Data:', event.data)
  await new Promise(r => setTimeout(r, 800))
  alert(`Danke ${event.data.firstName}! Antrag eingegangen. Wir melden uns per E-Mail.`)
}
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
            Tennis beim TC Hardt ist mehr als Sport.
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
                :class="benefit.text"
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
            Wähle den Tarif, der zu dir passt.
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

    <div id="formular" class="w-full bg-white dark:bg-gray-900 py-24 border-t border-gray-100 dark:border-gray-800 scroll-mt-16">
      <UContainer class="max-w-3xl">

        <div class="text-center mb-10">
          <h2 class="text-3xl font-heading font-bold text-tennis-900 dark:text-white mb-2">
            Online-Mitgliedsantrag
          </h2>
          <p class="text-gray-500">
            Bitte fülle alle Felder sorgfältig aus.
          </p>
        </div>

        <div class="mb-10 p-4 bg-gray-50 border-l-4 border-tennis-500 text-sm text-gray-600 rounded-r-md">
          <strong>Hinweis:</strong> Dieser Online-Antrag dient der Vorab-Übermittlung deiner Daten.
          Die Mitgliedschaft wird erst nach Leistung einer Unterschrift rechtswirksam (wird separat angefordert).
        </div>

        <UForm
          :state="state"
          :validate="validate"
          class="space-y-12"
          @submit="onSubmit"
        >

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-tennis-900 border-b pb-2 border-gray-100">1. Mitgliedschaft & Tarif</h3>

            <UFormField
              label="Gewählter Tarif"
              name="tariff"
              required
            >
              <USelect
                v-model="state.tariff"
                :items="tariffOptions"
                option-attribute="label"
                value-attribute="value"
                placeholder="Bitte oben auswählen..."
                size="xl"
                class="w-full"
                :ui="{ base: 'bg-gray-50' }"
              />
            </UFormField>

            <div class="p-5 bg-gray-50 rounded-xl space-y-4">
              <h4 class="font-bold text-gray-700 text-sm uppercase">Tennis-Erfahrung</h4>
              <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <UCheckbox
                  v-model="state.playedBefore"
                  label="Ich habe schon mal Tennis gespielt"
                  color="primary"
                />
                <UCheckbox
                  v-model="state.isTeamPlayer"
                  label="Ich bin/war Mannschaftsspieler"
                  color="primary"
                />
              </div>
              <UFormField label="Bisheriger Verein (optional)" name="previousClub">
                <UInput
                  v-model="state.previousClub"
                  placeholder="Name des Vereins"
                  size="md"
                  class="w-full bg-white"
                />
              </UFormField>
            </div>

            <div class="p-5 bg-gray-50 rounded-xl">
              <UCheckbox
                v-model="state.keyRequested"
                name="keyRequested"
                size="lg"
                color="primary"
              >
                <template #label>
                  <span class="font-bold text-gray-900">Eigener Schlüssel gewünscht?</span>
                  <span class="block text-xs text-gray-500">Zzgl. 75,00 € Kaution (einmalig).</span>
                </template>
              </UCheckbox>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-tennis-900 border-b pb-2 border-gray-100">2. Persönliche Daten</h3>

            <div class="grid md:grid-cols-2 gap-6">
              <UFormField
                label="Vorname"
                name="firstName"
                required
              >
                <UInput
                  v-model="state.firstName"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
              <UFormField
                label="Nachname"
                name="lastName"
                required
              >
                <UInput
                  v-model="state.lastName"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <UFormField
                label="Geburtsdatum"
                name="birthDate"
                required
              >
                <UInput
                  v-model="state.birthDate"
                  type="date"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
              <UFormField label="Geschlecht" name="gender">
                <USelect
                  v-model="state.gender"
                  :items="[{label: 'Männlich', value: 'male'}, {label: 'Weiblich', value: 'female'}]"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
            </div>

            <div class="grid md:grid-cols-[3fr_1fr] gap-6">
              <UFormField
                label="Straße"
                name="street"
                required
              >
                <UInput
                  v-model="state.street"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
              <UFormField
                label="Nr."
                name="houseNumber"
                required
              >
                <UInput
                  v-model="state.houseNumber"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
            </div>

            <div class="grid md:grid-cols-[1fr_2fr] gap-6">
              <UFormField
                label="PLZ"
                name="zip"
                required
              >
                <UInput
                  v-model="state.zip"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
              <UFormField
                label="Stadt"
                name="city"
                required
              >
                <UInput
                  v-model="state.city"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <UFormField
                label="E-Mail"
                name="email"
                required
              >
                <UInput
                  v-model="state.email"
                  type="email"
                  icon="i-heroicons-envelope"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
              <UFormField label="Telefon / Handy" name="phone">
                <UInput
                  v-model="state.phone"
                  icon="i-heroicons-phone"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50' }"
                />
              </UFormField>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-tennis-900 border-b pb-2 border-gray-100">3. Zahlung (SEPA)</h3>

            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <p class="text-xs text-gray-500 mb-4">
                Ich ermächtige den TC Hardt e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
                Gläubiger-ID: DE53ZZZ00000103775.
              </p>
              <UFormField
                label="IBAN"
                name="iban"
                required
              >
                <UInput
                  v-model="state.iban"
                  icon="i-heroicons-credit-card"
                  placeholder="DE..."
                  size="xl"
                  class="w-full bg-white"
                />
              </UFormField>
              <div class="mt-4">
                <UCheckbox
                  v-model="state.sepaAccepted"
                  required
                  label="Ich akzeptiere das SEPA-Lastschriftmandat."
                  color="primary"
                />
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-tennis-900 border-b pb-2 border-gray-100">4. Abschluss</h3>

            <UFormField name="privacyAccepted">
              <UCheckbox
                v-model="state.privacyAccepted"
                size="lg"
                color="primary"
              >
                <template #label>
                  Ich habe die <NuxtLink to="/privacy" class="text-highlight-600 hover:underline font-bold">Datenschutzerklärung</NuxtLink> und die Vereinssatzung gelesen.
                </template>
              </UCheckbox>
            </UFormField>

            <div class="pt-4">
              <UButton
                type="submit"
                block
                size="xl"
                color="neutral"
                variant="solid"
                class="bg-highlight-500 hover:bg-highlight-600 text-tennis-900 font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                trailing-icon="i-heroicons-paper-airplane"
              >
                Antrag senden
              </UButton>
            </div>
          </div>

        </UForm>
      </UContainer>
    </div>

    <div class="bg-gray-50 dark:bg-gray-950 py-12 text-center border-t border-gray-200">
      <UContainer>
        <p class="text-gray-500 mb-4 text-sm">Probleme mit dem Online-Formular?</p>
        <UButton
          to="/downloads/Aufnahmeantrag_TC_Hardt.pdf"
          target="_blank"
          icon="i-heroicons-document-arrow-down"
          color="white"
          variant="solid"
          class="text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          PDF-Antrag herunterladen
        </UButton>
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
