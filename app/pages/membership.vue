<script setup lang="ts">
import Hero from '~/components/section/Hero.vue'
import db from '~/assets/data/db.json'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

useHead({
  title: 'Mitglied werden | TC Hardt',
  meta: [{ name: 'description', content: 'Werde Teil unserer Tennis-Gemeinschaft.' }]
})

// --- DATA ---
const rawTariffs = db.tariffs

const benefits = [
  { icon: 'i-heroicons-sparkles', title: 'Top Anlage', desc: '6 top-gepflegte Ascheplätze in traumhafter Lage.', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' },
  { icon: 'i-heroicons-user-group', title: 'Starke Gemeinschaft', desc: 'Vom Hobby-Match bis zum Sommerfest.', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
  { icon: 'i-heroicons-academic-cap', title: 'Professionelles Training', desc: 'Tennisschule Rot-Weiß für alle Altersklassen.', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
  { icon: 'i-heroicons-currency-euro', title: 'Faire Beiträge', desc: 'Günstige Einstiegstarife & Familienrabatte.', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' }
]

// --- STATE ---
const formSectionRef = ref<HTMLElement | null>(null)

const state = reactive({
  tariff: '' as string,
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  street: '',
  houseNumber: '',
  zip: '',
  city: '',
  iban: '',
  privacyAccepted: false,
  sepaAccepted: false,
  keyRequested: false
})

// --- TABS ---
const tariffTabs = [
  { label: '🔥 Schnupperangebot', slot: 'trial' },
  { label: 'Erwachsene & Familie', slot: 'adults' },
  { label: 'Jugend & Ausbildung', slot: 'youth' }
]

// --- HELPER ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

const selectTariff = (tariffId: string) => {
  state.tariff = tariffId
  if (formSectionRef.value) {
    formSectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// --- TRANSFORMER ---
const mapToPlan = (t: any) => {
  const isSelected = state.tariff === t.id
  const hasDiscount = ['adult', 'family', 'student', 'youth'].includes(t.id)
  const isTrial = t.id.startsWith('trial_')

  // Gruppen-Identifikation für Farben
  const isAdultGroup = ['adult', 'family', 'senior', 'passive'].includes(t.id)
  const isYouthGroup = !isTrial && !isAdultGroup

  // 1. Border Farben (Top Border der Karte)
  let borderColorClass = 'border-t-4 '
  if (isTrial) borderColorClass += 'border-highlight-500'      // Lime
  else if (isAdultGroup) borderColorClass += 'border-tennis-800' // Navy
  else borderColorClass += 'border-tennis-500'                 // Blue

  // 2. Button Farben (Custom Classes statt "color" Prop)
  // Wir nutzen !bg-..., um Nuxt UI Defaults sicher zu überschreiben
  let btnClass = 'font-bold transition-transform active:scale-95 '
  if (isTrial) {
    // Lime Button (Dunkler Text für Kontrast)
    btnClass += 'bg-highlight-500 hover:bg-highlight-600 text-tennis-900'
  } else if (isAdultGroup) {
    // Navy Button (Weißer Text)
    btnClass += 'bg-tennis-800 hover:bg-tennis-900 text-white'
  } else {
    // Blue Button (Weißer oder dunkler Text, Tennis-500 ist hell, nehmen wir Weiß oder Dunkel)
    // Bei Tennis-500 (#7ac7ea) ist Schwarz oft besser lesbar, aber Weiß geht bei dunklerem Hover.
    // Nehmen wir text-tennis-900 für Sicherheit.
    btnClass += 'bg-tennis-500 hover:bg-tennis-600 text-tennis-900'
  }

  // Badge
  let badge = undefined
  if (t.id === 'adult') badge = { label: 'Beliebt', variant: 'soft', color: 'primary' }
  if (t.id === 'family') badge = { label: 'Top Deal', variant: 'subtle', color: 'primary' }
  if (isTrial && t.price === 0) badge = { label: 'Gratis testen', variant: 'solid', color: 'primary' } // Hier nutzen wir Primary (Standard grünlich in Nuxt UI oft) oder Neutral

  // Card Styling (Highlight Ringfarbe passt sich Button an)
  let ringClass = 'ring-1 ring-gray-100 dark:ring-gray-700'
  if (isSelected) {
    if (isTrial) ringClass = 'ring-2 ring-highlight-500 shadow-xl scale-[1.02]'
    else if (isAdultGroup) ringClass = 'ring-2 ring-tennis-800 shadow-xl scale-[1.02]'
    else ringClass = 'ring-2 ring-tennis-500 shadow-xl scale-[1.02]'
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

    // Klasse für die Karte selbst
    class: `bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 ${borderColorClass} ${ringClass}`,

    // Button Konfiguration mit Custom Classes
    button: {
      label: isSelected ? 'Ausgewählt' : (isTrial ? 'Jetzt testen' : 'Auswählen'),
      color: 'neutral', // "Neutral" als Basis, damit wir mit CSS überschreiben können
      variant: 'solid',
      block: true,
      size: 'md',
      class: btnClass, // Hier kommen unsere Farben rein
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
  else if (state.iban.length < 15) { errors.push({ name: 'iban', message: 'Ungültig' }) }
  if (!state.sepaAccepted) errors.push({ name: 'sepaAccepted', message: 'Zustimmung nötig' })
  if (!state.privacyAccepted) errors.push({ name: 'privacyAccepted', message: 'Zustimmung nötig' })
  return errors
}

const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  console.log('Form Data:', event.data)
  await new Promise(r => setTimeout(r, 800))
  alert(`Vielen Dank, ${event.data.firstName}! Dein Antrag ist eingegangen.`)
}
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-950">

    <Hero
      :slides="[{
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop',
        title: 'Mitglied werden',
        subtitle: 'Tennis, Spaß & neue Freunde.',
        description: 'Egal ob Anfänger oder Profi – bei uns findest du deinen Platz. Starte jetzt ganz einfach online.',
        overlayPosition: 'center',
      }]"
      height="large"
      fallback-class="bg-tennis-900"
    />

    <div class="bg-white dark:bg-gray-900 py-20 border-b border-gray-100 dark:border-gray-800">
      <UContainer>
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <span class="text-highlight-600 font-bold uppercase tracking-widest text-sm mb-3 block">50 Jahre TC Hardt</span>
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-6">
            Dein Verein im Grünen
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Wir sind mehr als nur ein Sportverein. Wir sind ein Treffpunkt für Freunde, Familien und alle, die Tennis lieben.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
          >
            <div
              class="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
              :class="benefit.bg"
            >
              <UIcon
                :name="benefit.icon"
                class="w-8 h-8"
                :class="benefit.text"
              />
            </div>
            <div>
              <h3 class="font-bold text-xl mb-2 text-gray-900 dark:text-white group-hover:text-tennis-600 transition-colors">
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
        <div class="text-center mb-12 max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-4">
            Finde deinen Tarif
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Fair und transparent. Unser Highlight für Neumitglieder:<br>
            <span class="text-highlight-600 font-bold">50% Rabatt im 1. Jahr</span> (bei regulärer Mitgliedschaft).
          </p>
        </div>

        <UTabs
          :items="tariffTabs"
          class="w-full"
          :ui="{ list: { background: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700' } }"
        >
          <template #trial>
            <div class="pt-10">
              <div class="mb-10 bg-white dark:bg-gray-800 border-l-4 border-highlight-500 rounded-r-xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div class="flex-grow">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <UIcon name="i-heroicons-sparkles" class="text-highlight-500 w-6 h-6" />
                    Einfach mal ausprobieren?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Mit unserem Schnupperangebot spielst du <strong>3 Monate lang</strong> ohne Verpflichtungen.
                    Die Mitgliedschaft endet danach <strong>automatisch</strong>. Ideal zum Testen!
                  </p>
                </div>
              </div>
              <UPricingPlans :ui="{ wrapper: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6' }">
                <UPricingPlan
                  v-for="(plan, index) in trialPlans"
                  :key="index"
                  v-bind="plan"
                />
              </UPricingPlans>
            </div>
          </template>

          <template #adults>
            <div class="pt-10">
              <UPricingPlans :ui="{ wrapper: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6' }">
                <UPricingPlan
                  v-for="(plan, index) in adultPlans"
                  :key="index"
                  v-bind="plan"
                />
              </UPricingPlans>
            </div>
          </template>

          <template #youth>
            <div class="pt-10">
              <UPricingPlans :ui="{ wrapper: 'grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto' }">
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

    <div ref="formSectionRef" class="w-full bg-white dark:bg-gray-900 py-24 scroll-mt-16 border-t border-gray-100 dark:border-gray-800">
      <UContainer class="max-w-4xl">

        <div class="text-center mb-12">
          <div class="inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm mb-6 text-tennis-600">
            <UIcon name="i-heroicons-pencil-square" class="w-10 h-10" />
          </div>
          <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-4">
            Dein Mitgliedsantrag
          </h2>
          <p class="text-xl text-gray-500 max-w-2xl mx-auto">
            Fülle einfach das Formular aus. Wir kümmern uns um den Rest.
          </p>
        </div>

        <UForm
          :state="state"
          :validate="validate"
          class="space-y-10"
          @submit="onSubmit"
        >
          <div class="space-y-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 border-b pb-4 border-gray-100 dark:border-gray-800">
              <span class="flex items-center justify-center w-8 h-8 bg-tennis-100 text-tennis-700 rounded-full text-sm font-bold">1</span>
              Tarifauswahl
            </h3>

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
                placeholder="Bitte wählen..."
                size="xl"
                class="w-full"
                :ui="{ base: 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white' }"
              />
            </UFormField>
          </div>

          <div class="space-y-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 border-b pb-4 border-gray-100 dark:border-gray-800">
              <span class="flex items-center justify-center w-8 h-8 bg-tennis-100 text-tennis-700 rounded-full text-sm font-bold">2</span>
              Persönliche Daten
            </h3>

            <div class="grid md:grid-cols-2 gap-6">
              <UFormField
                label="Vorname"
                name="firstName"
                required
              >
                <UInput
                  v-model="state.firstName"
                  icon="i-heroicons-user"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
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
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
                />
              </UFormField>
            </div>

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
                :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
              />
            </UFormField>

            <div class="grid md:grid-cols-2 gap-6">
              <UFormField
                label="E-Mail Adresse"
                name="email"
                required
              >
                <UInput
                  v-model="state.email"
                  type="email"
                  icon="i-heroicons-envelope"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
                />
              </UFormField>
              <UFormField label="Telefon / Mobil" name="phone">
                <UInput
                  v-model="state.phone"
                  icon="i-heroicons-phone"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
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
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
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
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
                />
              </UFormField>
            </div>

            <div class="grid md:grid-cols-[1fr_3fr] gap-6">
              <UFormField
                label="PLZ"
                name="zip"
                required
              >
                <UInput
                  v-model="state.zip"
                  size="xl"
                  class="w-full"
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
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
                  :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
                />
              </UFormField>
            </div>

            <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-start gap-4 border border-gray-200 dark:border-gray-700">
              <UCheckbox
                v-model="state.keyRequested"
                name="keyRequested"
                size="lg"
                color="primary"
              />
              <div>
                <p class="font-bold text-gray-900 dark:text-white cursor-pointer select-none" @click="state.keyRequested = !state.keyRequested">
                  Eigener Schlüssel gewünscht?
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  Damit hast du jederzeit Zugang zur Anlage. (Zzgl. 75,00 € Kaution).
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 border-b pb-4 border-gray-100 dark:border-gray-800">
              <span class="flex items-center justify-center w-8 h-8 bg-tennis-100 text-tennis-700 rounded-full text-sm font-bold">3</span>
              Zahlung (SEPA Lastschrift)
            </h3>
            <UFormField
              label="IBAN"
              name="iban"
              required
              help="Deine Daten werden sicher übertragen."
            >
              <UInput
                v-model="state.iban"
                icon="i-heroicons-credit-card"
                placeholder="DE..."
                size="xl"
                class="w-full"
                :ui="{ base: 'bg-gray-50 dark:bg-gray-800' }"
              />
            </UFormField>
          </div>

          <div class="space-y-6 pt-2">
            <UFormField name="sepaAccepted">
              <UCheckbox
                v-model="state.sepaAccepted"
                size="lg"
                color="primary"
              >
                <template #label>
                  <span class="text-gray-700 dark:text-gray-300">Ich ermächtige den TC Hardt e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen.</span>
                </template>
              </UCheckbox>
            </UFormField>
            <UFormField name="privacyAccepted">
              <UCheckbox
                v-model="state.privacyAccepted"
                size="lg"
                color="primary"
              >
                <template #label>
                  <span class="text-gray-700 dark:text-gray-300">Ich habe die <NuxtLink to="/privacy" class="text-highlight-600 hover:underline font-bold">Datenschutzerklärung</NuxtLink> und Satzung gelesen und akzeptiere sie.</span>
                </template>
              </UCheckbox>
            </UFormField>

            <div class="pt-6">
              <UButton
                type="submit"
                block
                size="xl"
                color="neutral"
                variant="solid"
                class="bg-highlight-500 hover:bg-highlight-600 text-tennis-900 font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                trailing-icon="i-heroicons-paper-airplane"
              >
                Antrag senden
              </UButton>
            </div>
          </div>
        </UForm>
      </UContainer>
    </div>

    <div class="bg-gray-50 dark:bg-gray-950 py-12">
      <UContainer>
        <div class="flex justify-center">
          <UButton
            to="/downloads/Aufnahmeantrag_TC_Hardt.pdf"
            target="_blank"
            icon="i-heroicons-document-arrow-down"
            color="gray"
            variant="ghost"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Antrag lieber als PDF downloaden?
          </UButton>
        </div>
      </UContainer>
    </div>

  </div>
</template>
