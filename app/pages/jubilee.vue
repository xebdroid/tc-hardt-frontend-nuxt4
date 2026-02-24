<script setup lang="ts">
import BaseButton from '~/components/base/Button.vue'
import type { HeroSlide } from '~/components/base/Hero.vue'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import EventDate from '~/components/base/EventDate.vue'

useHead({
  title: '50 Jahre Tennis op de Hardt - Jubiläum 2026',
  meta: [
    { name: 'description', content: 'Der TC Hardt 1976 e.V. feiert sein 50-jähriges Vereinsjubiläum.' }
  ]
})

// 1. Hero Data
const heroSlides: HeroSlide[] = [
  {
    type: 'image',
    src: '/img/jubilee/50-jahre-tc-hardt.jpg',
    alt: '50 Jahre TC Hardt Jubiläum',
    contentPosition: 'bottom-center',
    slotName: 'jubilee-hero',
    theme: 'light'
  }
]

// 2. Timeline Data
const timelineItems = [
  {
    date: '19.04.2026',
    title: 'Tag der offenen Tür / Saisoneröffnung',
    description: 'Wir starten unser Jubiläumsjahr mit einem bunten Saisonauftakt. Alle Tennisinteressierten sind herzlich eingeladen, den TC Hardt kennenzulernen, den Schläger selbst in die Hand zu nehmen und gemeinsam mit unseren Mitgliedern und dem Verein in die neue Saison zu starten.',
    icon: 'i-heroicons-home-modern',
    image: 'https://images.unsplash.com/photo-1683691357603-7538f78a6c83'
  },
  {
    date: '27.06.2026',
    title: 'Jubiläumsfeier',
    description: 'Das Highlight unseres Festjahres für unsere Mitglieder! Freut euch auf eine Jubiläums-Gala mit Musik, leckerem Essen, Getränken und einigen weiteren Highlights. Ein Abend, an dem Sport, Geselligkeit und Erinnerungen an 50 Jahre TC Hardt im Mittelpunkt stehen.',
    icon: 'i-heroicons-cake',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1740'
  },
  {
    date: '25.07.2026',
    title: 'Sangria Open',
    description: 'Sommer, Sonne, Sangria – unser Kultturnier verbindet lockeren Tennisspaß mit geselligem Beisammensein. Ein Event für Jung und Alt, für Vereinsmitglieder und Freunde, für Anfänger und Profis, das längst zum festen Bestandteil des Clublebens gehört.',
    icon: 'i-heroicons-sun',
    image: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=774'
  },
  {
    date: '29.08. – 13.09.2026',
    title: 'Kreis- & Stadtmeisterschaften',
    description: 'Wir freuen uns, Gastgeber der Kreis- und Stadtmeisterschaften 2026 zu sein! Spannende Matches, hochklassiges Tennis und eine tolle Atmosphäre sind garantiert – kommt vorbei und feuert die Spielerinnen und Spieler an. Wir freuen uns auf viele Zuschauer aus dem gesamten Stadtgebiet!',
    icon: 'i-heroicons-trophy',
    image: '/img/jubilee/tennis-plaetze-von-oben.jpg'
  },
  {
    date: '26.09. – 27.09.2026',
    title: 'Finaltag der Clubmeisterschaften',
    description: 'Wer wird Clubmeister 2026? Beim großen Finalwochenende unserer Clubmeisterschaften entscheidet sich, wer die Titel mit nach Hause nimmt. Ein sportlicher Vereins-Höhepunkt zum Ende der Sommersaison.',
    icon: 'i-heroicons-star',
    image: 'https://images.unsplash.com/photo-1614713509225-720e74941913'
  },
  {
    date: '10.10.2026',
    title: 'Glühwein Open & Saisonabschluss',
    description: 'Zum Ausklang unseres Jubiläumsjahres laden wir traditionellerweise gemeinsam mit unserer Tennisschule Rot-Weiss zu den Glühwein Open ein. Freut euch auf ein gemütliches Herbstturnier mit Glühwein und geselligem Beisammensein. Der Tag mündet in einem gemeinsamen Saisonabschluss in unserem Clubhaus mit leckerem Essen und guter Musik. Der perfekte Abschluss für ein Jahr voller unvergesslicher Momente.',
    icon: 'i-heroicons-fire',
    image: 'https://images.unsplash.com/photo-1669847171248-8f12c8160d57?q=80&w=774'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">

    <Hero :slides="heroSlides" height="full">
      <template #jubilee-hero="{ slide }">
        <div class="text-center max-w-4xl mx-auto">
          <h1
            class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 font-euro-extended drop-shadow-lg pt-16"
            :class="[slide.theme === 'dark' ? 'text-gray-900' : 'text-white']"
          >
            <span class="block text-2xl sm:text-4xl lg:text-5xl tracking-wide">Tennis op de Hardt</span>
          </h1>
          <p
            class="text-lg sm:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium"
            :class="[slide.theme === 'dark' ? 'text-gray-600' : 'text-gray-100']"
          >
            Ein halbes Jahrhundert voller Sport, Gemeinschaft und unvergesslicher Momente.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BaseButton
              to="#events"
              label="Zu den Highlights"
              variant="highlight"
              size="xl"
            />
          </div>
        </div>
      </template>
    </Hero>

    <div id="events" class="scroll-mt-16">
      <div
        class="text-center relative"
        :style="{ zIndex: timelineItems.length + 1 }"
      >
        <Section>
          <div class="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-brand-dark-900 dark:text-white sm:text-4xl mb-4">
              Unsere Jubiläums-Highlights 2026
            </h2>
            <p class="text-lg leading-8 text-gray-600 dark:text-gray-400">
              Das Jahr 2026 steht ganz im Zeichen unseres 50-jährigen Bestehens. Dieses besondere Jubiläum wollen wir gemeinsam mit euch feiern – Mitgliedern, Sponsoren, Freunden, Tennisfans und allen, die Lust auf ein tolles Festjahr haben.
            </p>
          </div>
        </Section>
      </div>

      <template
        v-for="(item, index) in timelineItems"
        :key="index"
      >
        <div
          class="relative"
          :style="{ zIndex: timelineItems.length - index }"
        >
          <Section
            :variant="index % 2 === 0 ? 'secondary-light' : 'default'"
            :background-image="index % 2 !== 0 ? item.image : undefined"
            :parallax="index % 2 !== 0"
            :rounded="index === 0 ? true : 'bottom'"
            :padding-top="index === 0 ? 'md' : 'xl'"
            padding-bottom="md"
            :overlap-top="index !== 0 ? true : false"
            :margin-bottom="index === timelineItems.length - 1 ? 'xl' : undefined"
            outer-container
          >
            <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-3xl mx-auto">
              <EventDate :date-string="item.date" />
              <h3 class="text-3xl font-bold tracking-tight text-brand-dark-900 dark:text-white sm:text-4xl mb-4">
                {{ item.title }}
              </h3>
              <p class="text-lg text-gray-700 dark:text-gray-300">
                {{ item.description }}
              </p>
            </div>
          </Section>
        </div>
      </template>
    </div>

  </div>
</template>
