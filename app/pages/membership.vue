<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import PricingCard from '~/components/base/PricingCard.vue'
import BaseGrid from '~/components/base/Grid.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import MembershipSignupSteps from '~/components/membership/MembershipSignupSteps.vue'
import db from '~/assets/data/db.json'

useSeoMeta({
  title: 'Mitgliedschaft & Preise',
  ogTitle: 'Mitgliedschaft & Preise',
  description: 'Werde Teil unserer Tennis-Gemeinschaft! Hier findest du alle Infos zu Mitgliedsbeiträgen, Schnupperangeboten und den Aufnahmeantrag.',
  ogDescription: 'Werde Teil unserer Tennis-Gemeinschaft! Hier findest du alle Infos zu Mitgliedsbeiträgen, Schnupperangeboten und den Aufnahmeantrag.',
  ogImage: '/img/membership/tennis-platz-bank.jpg',
  twitterCard: 'summary_large_image',
})

definePageMeta({
  hideFooterCta: true
})

const PDF_PATH = '/downloads/aufnahmeantrag-tc-hardt.pdf'
const rawTariffs = db.tariffs as any[]

const heroSlides: import('vue').ComputedRef<HeroSlide[]> = computed(() => [
  {
    type: 'image',
    src: '/img/membership/tennis-platz-bank.jpg',
    title: 'Dein Platz ist bei uns.',
    subtitle: 'Tennis, Gemeinschaft & Leidenschaft.',
    description: 'Egal ob Anfänger oder Profi – beim TC Hardt findest du ideale Bedingungen und ein lebendiges Vereinsleben.',
    contentPosition: 'bottom-center',
    ctaPrimary: { variant: 'highlight', label: 'Direkt zum Antrag', to: '#anmeldung', icon: 'i-heroicons-arrow-down-tray' },
    ctaSecondary: { variant: 'brand-dark', label: 'Tarife ansehen', to: '#tarife' },
    overlayClass: 'overlay-accent-strong',
    theme: 'light'
  }
])

const benefits = [
  { icon: 'i-heroicons-sparkles', title: '6 Top-Plätze', description: 'Hervorragend gepflegte Ascheplätze.' },
  { icon: 'i-heroicons-user-group', title: 'Tolle Community', description: 'Von den Stadtmeisterschaften bis zu den Glühwein Open.' },
  { icon: 'i-heroicons-academic-cap', title: 'Training für Alle', description: 'Gefördertes Training für Kinder & Jugendliche.' },
  { icon: 'i-heroicons-home-modern', title: 'Moderne Anlage', description: 'Clubhaus mit Sonnenterrasse, Geselligkeit & kühle Getränke nach dem Match.' }
]

const formatPrice = (price: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)

const scrollToDownload = () => {
  document.getElementById('anmeldung')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const getPlanBase = (override: Record<string, any> = {}) => {
  const defaultButton = {
    label: 'Zum Antrag',
    icon: 'i-heroicons-arrow-down-tray',
    variant: 'brand-dark',
    block: true,
    size: 'lg',
  }

  const basePlan = {
    title: override.title || '',
    description: override.description || '',
    price: override.price || '',
    billingCycle: override.billingCycle || '',
    features: override.features || [],
    button: { ...defaultButton, ...override.button },
  }

  return { ...basePlan, ...override }
}

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
    })
  ]
})

const simplifiedRegularPlans = computed(() => {
  const adult = rawTariffs.find(t => t.id === 'adult')!
  const family = rawTariffs.find(t => t.id === 'family')!
  const student = rawTariffs.find(t => t.id === 'student')!
  const youth = rawTariffs.find(t => t.id === 'youth')!
  const child = rawTariffs.find(t => t.id === 'child')!
  const passive = rawTariffs.find(t => t.id === 'passive')!

  return [
    getPlanBase({
      title: 'Erwachsene',
      description: 'Volle Mitgliedschaft für Einzelpersonen ab 18 Jahren.',
      price: formatPrice(adult.price),
      discountedPrice: formatPrice(adult.price / 2),
      discountText: 'Nur im 1. Jahr',
      billingCycle: '/ Jahr',
      features: ['Alle Vorteile des Clubs', 'Teilnahme an Events', 'Volle Spielberechtigung'],
    }),
    getPlanBase({
      title: 'Familie',
      description: 'Für Eltern mit allen Kindern und Azubis bis 27 Jahre.',
      price: formatPrice(family.price),
      discountedPrice: formatPrice(family.price / 2),
      discountText: 'Nur im 1. Jahr',
      billingCycle: '/ Jahr',
      features: ['Gilt für beide Elternteile', 'Inklusive aller Kinder (<18)', 'Inklusive Azubis/Studenten (<27)'],
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
      <Headline
        alignment="center"
        title="Mehr als nur ein Tennisclub"
        description="Beim TC Hardt triffst du Freunde. Wir legen Wert auf ein familiäres Miteinander, sportlichen Ehrgeiz und gesellige Abende auf unserer Terrasse."
      />

      <BaseGrid :cols="4">
        <FeatureCard
          v-for="(benefit, index) in benefits"
          :key="index"
          v-bind="benefit"
        />
      </BaseGrid>
    </Section>

    <Section
      id="tarife"
      variant="highlight-light"
      outer-container
      rounded
      :padding-top="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'lg', sm: 'lg', md: 'xl' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
    >
      <Headline
        alignment="center"
        title="Schnupperangebote"
        description="Ideal für Einsteiger und Neugierige. Die Mitgliedschaft endet automatisch nach 3 Monaten, ohne dass eine Kündigung erforderlich ist."
      />
      <BaseGrid :cols="2">
        <PricingCard
          v-for="(plan, i) in simplifiedTrialPlans"
          :key="i"
          :plan="plan"
          @button-click="scrollToDownload"
        />
      </BaseGrid>
    </Section>

    <Section
      id="jahresmitgliedschaften"
      variant="accent-light"
      overlap-top
      rounded
      outer-container
      :padding-top="{ base: 'xs', sm: 'xs', md: 'sm' }"
      :padding-bottom="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      margin-bottom="sm"
    >
      <Headline
        alignment="center"
        title="Jahresmitgliedschaften"
        description="Werde ein fester Teil unserer Gemeinschaft. Alle Jahresmitgliedschaften für aktive Spieler profitieren im ersten Jahr von 50% Rabatt."
        hyphens
      />
      <BaseGrid :cols="2">
        <PricingCard
          v-for="(plan, i) in simplifiedRegularPlans"
          :key="i"
          :plan="plan"
          @button-click="scrollToDownload"
        />
      </BaseGrid>
    </Section>

    <Section
      id="anmeldung"
      variant="secondary-light"
      outer-container
      rounded
      :padding-top="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      margin-bottom="xl"
    >
      <MembershipSignupSteps :pdf-path="PDF_PATH" />
    </Section>
  </div>
</template>
