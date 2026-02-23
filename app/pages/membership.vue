<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Button from '~/components/base/Button.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import PricingCard from '~/components/base/PricingCard.vue'
import Section from '~/components/base/Section.vue'
import db from '~/assets/data/db.json'

useHead({
  title: 'Mitglied werden | TC Hardt',
  meta: [{ name: 'description', content: 'Werde Teil unserer Tennis-Gemeinschaft. Tarife und Aufnahmeantrag.' }]
})

definePageMeta({
  hideFooterCta: true
})

const PDF_PATH = '/downloads/aufnahmeantrag-tc-hardt.pdf'
const rawTariffs = db.tariffs

const heroSlides: import('vue').ComputedRef<HeroSlide[]> = computed(() => [
  {
    type: 'image',
    src: '/img/membership/leerer-tennisplatz-mit-schlaeger-ki.png',
    title: 'Dein Platz ist bei uns.',
    subtitle: 'Tennis, Gemeinschaft & Leidenschaft.',
    description: 'Egal ob Anfänger oder Profi – beim TC Hardt findest du ideale Bedingungen und ein lebendiges Vereinsleben.',
    overlayPosition: 'center',
    ctaPrimary: { label: 'Tarife ansehen', to: '#tarife' },
    ctaSecondary: { label: 'Direkt zum Antrag', to: '#anmeldung', icon: 'i-heroicons-arrow-down-tray' }
  }
])

const benefits = [
  { icon: 'i-heroicons-sparkles', title: '6 Top-Plätze', description: 'Hervorragend gepflegte Ascheplätze.' },
  { icon: 'i-heroicons-user-group', title: 'Tolle Community', description: 'Vom Schleifchenturnier bis zum Sommerfest.' },
  { icon: 'i-heroicons-academic-cap', title: 'Training für Alle', description: 'Gefördertes Training für Kinder & Jugendliche.' },
  { icon: 'i-heroicons-home-modern', title: 'Moderne Anlage', description: 'Clubhaus mit Sonnenterrasse & Gastronomie.' }
]

const formatPrice = (price: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)

const scrollToDownload = () => {
  document.getElementById('anmeldung')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const getPlanBase = (override: Record<string, any> = {}) => {
  const defaultButton = {
    label: 'Zum Antrag',
    icon: 'i-heroicons-arrow-down-tray',
    variant: 'secondary', // Default to secondary
    block: true,
    size: 'lg',
  }

  // Define a more prominent and consistent badge style
  const badgeClass = 'text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full absolute top-0 -translate-y-1/2'

  const basePlan = {
    title: override.title || '',
    description: override.description || '',
    price: override.price || '',
    billingCycle: override.billingCycle || '',
    features: override.features || [],
    class: 'bg-white dark:bg-brand-dark-950 border border-gray-200 dark:border-brand-dark-800 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 flex flex-col h-full relative',
    button: { ...defaultButton, ...override.button },
    badge: override.badge
      ? {
          ...override.badge,
          class: `${badgeClass} ${override.badge.highlight ? 'bg-highlight-500 text-brand-dark-950' : 'bg-brand-dark-800 text-white'}`
        }
      : undefined
  }

  return { ...basePlan, ...override }
}

// 1. Trial Plans
const simplifiedTrialPlans = computed(() => {
  const trialAdult = rawTariffs.find(t => t.id === 'trial_adult')!
  const trialYoung = rawTariffs.find(t => t.id === 'trial_young')!
  const trialChild = rawTariffs.find(t => t.id === 'trial_child')!
  const trialMini = rawTariffs.find(t => t.id === 'trial_mini')!

  return [
    getPlanBase({
      title: 'Erwachsene & Jugend',
      description: 'Für alle ab 8 Jahren. Endet automatisch nach 3 Monaten.',
      price: 'ab ' + formatPrice(trialYoung.price),
      billingCycle: '/ 3 Monate',
      priceBreakdown: [
        { label: 'Erwachsene', price: formatPrice(trialAdult.price) },
        { label: 'Jugend/Azubis (bis 27 J.)', price: formatPrice(trialYoung.price) },
      ],
      features: ['Volle Spielberechtigung', 'Keine Kündigung nötig', 'Perfekt zum Testen'],
      badge: { label: 'Reinschnuppern' }
    }),
    getPlanBase({
      title: 'Kinder & Minis',
      description: 'Für die Jüngsten unter 8 Jahren. Endet automatisch.',
      price: 'ab ' + formatPrice(trialMini.price),
      billingCycle: '/ 3 Monate',
      priceBreakdown: [
        { label: 'Kinder (5-7 J.)', price: formatPrice(trialChild.price) },
        { label: 'Minis (< 5 J.)', price: formatPrice(trialMini.price) },
      ],
      features: ['Spielerischer Einstieg', 'Soziale Kontakte', 'Gefördertes Training'],
      badge: { label: 'Für die Kleinsten' },
    })
  ]
})

// 2. Regular Plans
const simplifiedRegularPlans = computed(() => {
  const adult = rawTariffs.find(t => t.id === 'adult')!
  const family = rawTariffs.find(t => t.id === 'family')!
  const senior = rawTariffs.find(t => t.id === 'senior')!
  const student = rawTariffs.find(t => t.id === 'student')!
  const youth = rawTariffs.find(t => t.id === 'youth')!
  const child = rawTariffs.find(t => t.id === 'child')!
  const passive = rawTariffs.find(t => t.id === 'passive')!

  return [
    getPlanBase({
      title: 'Erwachsene',
      description: 'Volle Mitgliedschaft für Einzelpersonen ab 18 Jahren.',
      price: formatPrice(adult.price),
      discount: `Nur ${formatPrice(adult.price / 2)} im 1. Jahr!`,
      billingCycle: '/ Jahr',
      features: ['Alle Vorteile des Clubs', 'Teilnahme an Events', 'Volle Spielberechtigung'],
      badge: { label: 'Bestseller', highlight: true }
    }),
    getPlanBase({
      title: 'Familie',
      description: 'Für Eltern mit allen Kindern und Azubis bis 27 Jahre.',
      price: formatPrice(family.price),
      discount: `Nur ${formatPrice(family.price / 2)} im 1. Jahr!`,
      billingCycle: '/ Jahr',
      features: ['Gilt für beide Elternteile', 'Inklusive aller Kinder (<18)', 'Inklusive Azubis/Studenten (<27)'],
      badge: { label: 'Top-Deal für Familien' }
    }),
    getPlanBase({
      title: 'Jugend & Ausbildung',
      description: 'Ermäßigte Tarife für alle in Ausbildung bis 27 Jahre.',
      price: 'ab ' + formatPrice(child.price),
      billingCycle: '/ Jahr',
      priceBreakdown: [
        { label: 'Studenten/Azubis (<27)', price: formatPrice(student.price) },
        { label: 'Jugendliche (8-17)', price: formatPrice(youth.price) },
        { label: 'Kinder (<8)', price: formatPrice(child.price) },
      ],
      features: ['50% Rabatt im 1. Jahr', 'Gefördertes Jugendtraining', 'Teilnahme an Jugend-Events'],
    }),
    getPlanBase({
      title: 'Passiv / Förderer',
      description: 'Unterstütze den Verein und bleibe Teil der Gemeinschaft.',
      price: formatPrice(passive.price),
      billingCycle: '/ Jahr',
      features: ['Unterstützung des Vereinslebens', 'Einladung zu allen Events', 'Keine Spielberechtigung'],
    })
  ]
})
</script>

<template>
  <div>
    <Hero
      :slides="heroSlides"
      height="large"
    />

    <Section>
      <div class="text-center mb-12 max-w-3xl mx-auto">
        <h2 class="text-3xl font-heading font-bold text-brand-dark-900 dark:text-white mb-4">
          Mehr als nur ein Tennisclub
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg">
          Beim TC Hardt triffst du Freunde. Wir legen Wert auf ein familiäres Miteinander,
          sportlichen Ehrgeiz und gesellige Abende auf unserer Terrasse.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          v-for="(benefit, index) in benefits"
          :key="index"
          v-bind="benefit"
        />
      </div>
    </Section>

    <Section
      id="schnupperangebote"
      variant="highlight-light"
      outer-container
      rounded
      padding-top="sm"
      padding-bottom="xl"
      padding-left="sm"
      padding-right="sm"
    >
      <div class="text-center mb-12">
        <h2 class="text-3xl font-heading font-bold text-brand-dark-900 dark:text-white">
          Schnupperangebote
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2 mx-auto">
          Ideal für Einsteiger und Neugierige. Die Mitgliedschaft endet automatisch nach 3 Monaten, ohne dass eine Kündigung erforderlich ist.
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-8 mx-auto">
        <PricingCard
          v-for="(plan, i) in simplifiedTrialPlans"
          :key="i"
          :plan="plan"
          @button-click="scrollToDownload"
        />
      </div>
    </Section>

    <Section
      id="jahresmitgliedschaften"
      variant="accent-light"
      overlap-top
      rounded
      outer-container
      padding-top="sm"
      padding-bottom="sm"
      margin-bottom="xl"
      padding-left="sm"
      padding-right="sm"
    >
      <div class="text-center mb-12">
        <h2 class="text-3xl font-heading font-bold text-brand-dark-900 dark:text-white">
          Jahresmitgliedschaften
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2 mx-auto">
          Werde ein fester Teil unserer Gemeinschaft. Alle Jahresmitgliedschaften für aktive Spieler profitieren im ersten Jahr von 50% Rabatt.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 gap-8 mx-auto">
        <PricingCard
          v-for="(plan, i) in simplifiedRegularPlans"
          :key="i"
          :plan="plan"
          @button-click="scrollToDownload"
        />
      </div>
    </Section>

    <Section
      id="anmeldung"
      variant="secondary-light"
      outer-container
      rounded
      padding-top="sm"
      padding-bottom="sm"
      margin-bottom="xl"
      padding-left="sm"
      padding-right="sm"
    >
      <div class="grid lg:grid-cols-2 gap-16 items-stretch">
        <div class="relative">
          <div class="mb-12">
            <h2 class="text-3xl sm:text-4xl font-heading font-bold mb-4">
              So wirst du Mitglied
            </h2>
            <p class="text-lg">
              Dein Weg in den Club – einfach und unkompliziert in 3 Schritten.
            </p>
          </div>

          <ol class="space-y-12">
            <li class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-dark-900 text-white flex items-center justify-center font-bold text-2xl">
                1
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-bold mb-1">Herunterladen</h3>
                <p class="text-sm text-brand-dark-700 dark:text-gray-400">Lade den Aufnahmeantrag als PDF herunter.</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-dark-900 text-white flex items-center justify-center font-bold text-2xl">
                2
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-bold mb-1">Ausfüllen</h3>
                <p class="text-sm text-brand-dark-700 dark:text-gray-400">Fülle den Antrag digital oder per Hand aus.</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-dark-900 text-white flex items-center justify-center font-bold text-2xl">
                3
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-bold mb-1">Absenden</h3>
                <p class="text-sm text-brand-dark-700 dark:text-gray-400">Sende den Antrag per E-Mail an <a href="mailto:info@tc-hardt.de" class="font-bold hover:underline text-brand-dark-900 dark:text-white">info@tc-hardt.de</a> oder per Post.</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="bg-brand-dark-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl h-full flex flex-col justify-center">
          <UIcon name="i-heroicons-document-text" class="absolute -right-6 -bottom-6 w-48 h-48 text-white/5 rotate-12 pointer-events-none" />

          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-white mb-4">
              Aufnahmeantrag
            </h3>
            <p class="text-gray-300 mb-8 mx-auto">
              Hier findest du das offizielle Formular inklusive der Datenschutzhinweise.
            </p>

            <Button
              :to="PDF_PATH"
              target="_blank"
              size="xl"
              icon="i-heroicons-arrow-down-tray"
              class="shadow-xl hover:shadow-2xl transition-all"
              variant="highlight"
              label="Antrag herunterladen (PDF)"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
