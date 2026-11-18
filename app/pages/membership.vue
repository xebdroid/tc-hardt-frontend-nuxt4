<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Button from '~/components/base/Button.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import PricingCard from '~/components/base/PricingCard.vue'
import BaseGrid from '~/components/base/Grid.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import BaseIcon from '~/components/base/Icon.vue'
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
      <div class="steps-header">
        <Headline
          title="So wirst du Mitglied"
          description="Dein Weg in den Club – einfach und unkompliziert in 3 Schritten."
          alignment="center"
          margin-bottom="none"
        />
      </div>
      <div class="signup-grid">
        <ol class="steps-list">
          <li class="step-item">
            <div class="step-num">1</div>
            <div class="step-body">
              <h3 class="step-title">Herunterladen</h3>
              <p class="step-desc">Lade den Aufnahmeantrag als PDF herunter.</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-num">2</div>
            <div class="step-body">
              <h3 class="step-title">Ausfüllen</h3>
              <p class="step-desc">Fülle den Antrag digital oder per Hand aus und unterschreibe ihn.</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-num">3</div>
            <div class="step-body">
              <h3 class="step-title">Absenden</h3>
              <p class="step-desc">
                Sende den Antrag per E-Mail an
                <a href="mailto:info@tc-hardt.de" class="mail-link">info@tc-hardt.de</a>
                oder per Post.
              </p>
            </div>
          </li>
        </ol>

        <div class="download-card">
          <BaseIcon name="i-heroicons-document-text" class="bg-doc-icon" />

          <div class="download-content">
            <Headline
              title="Aufnahmeantrag"
              description="Hier findest du das offizielle Formular inklusive der Datenschutzhinweise."
              alignment="center"
              mode="light"
              size="h3"
            />

            <Button
              :to="PDF_PATH"
              target="_blank"
              size="xl"
              icon="i-heroicons-arrow-down-tray"
              variant="highlight"
              label="Antrag (PDF)"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.steps-header {
  margin-bottom: var(--space-12);
}

.signup-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  align-items: stretch;

  @include up("md") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.steps-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.step-item {
  display: flex;
  align-items: flex-start;
}

.step-num {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: var(--color-brand-dark-900);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.step-body {
  margin-left: var(--space-6);
}

.step-title {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  font-weight: 700;
}

.step-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-brand-dark-700);

  @include dark {
    color: var(--color-gray-400);
  }
}

.mail-link {
  font-weight: 700;
  color: var(--color-brand-dark-900);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @include dark {
    color: var(--color-white);
  }
}

.download-card {
  background-color: var(--color-brand-dark-900);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include up("sm") {
    padding: var(--space-12);
  }
}

.bg-doc-icon {
  position: absolute;
  right: -1.5rem;
  bottom: -1.5rem;
  width: 12rem;
  height: 12rem;
  color: rgb(255 255 255 / 0.05);
  transform: rotate(12deg);
  pointer-events: none;
}

.download-content {
  position: relative;
  z-index: 10;
}
</style>
