<script setup lang="ts">
import AppButton from '~/components/base/Button.vue'
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
    overlayPosition: 'bottom-center',
    slotName: 'jubilee-hero'
  }
]

// 2. Timeline Data
const timelineItems = [
  {
    date: '19.04.2026',
    title: 'Tag der offenen Tür / Saisoneröffnung',
    description: 'Wir starten unser Jubiläumsjahr mit einem bunten Saisonauftakt.',
    icon: 'i-heroicons-home-modern',
    image: 'https://images.unsplash.com/photo-1683691357603-7538f78a6c83'
  },
  {
    date: '27.06.2026',
    title: 'Jubiläumsfeier',
    description: 'Eine Jubiläums-Gala mit Musik, leckerem Essen und Highlights aus 50 Jahren.',
    icon: 'i-heroicons-cake',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1740'
  },
  {
    date: '25.07.2026',
    title: 'Sangria Open',
    description: 'Sommer, Sonne, Sangria – unser Kultturnier für Jung und Alt.',
    icon: 'i-heroicons-sun',
    image: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=774'
  },
  {
    date: '29.08. – 13.09.2026',
    title: 'Kreis- & Stadtmeisterschaften',
    description: 'Wir sind Gastgeber der Stadtmeisterschaften! Spannende Matches garantiert.',
    icon: 'i-heroicons-trophy',
    image: '/img/jubilee/tennis-plaetze-von-oben.jpg'
  },
  {
    date: '26.09. – 27.09.2026',
    title: 'Finaltag der Clubmeisterschaften',
    description: 'Wer wird Clubmeister 2026? Das große Finalwochenende.',
    icon: 'i-heroicons-star',
    image: 'https://images.unsplash.com/photo-1614713509225-720e74941913'
  },
  {
    date: '10.10.2026',
    title: 'Glühwein Open & Saisonabschluss',
    description: 'Ein gemütliches Herbstturnier mit Glühwein und anschließendem Saisonabschluss.',
    icon: 'i-heroicons-fire',
    image: 'https://images.unsplash.com/photo-1669847171248-8f12c8160d57?q=80&w=774'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">

    <Hero :slides="heroSlides" height="full">
      <template #jubilee-hero>
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-euro-extended drop-shadow-lg pt-16">
            <span class="block text-2xl sm:text-4xl lg:text-5xl tracking-wide">Tennis op de Hardt</span>
          </h1>
          <p class="text-lg sm:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Ein halbes Jahrhundert voller Sport, Gemeinschaft und unvergesslicher Momente.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AppButton
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
              Ein Jahr voller Highlights
            </h2>
            <p class="text-lg leading-8 text-gray-600 dark:text-gray-400">
              Das Jahr 2026 steht ganz im Zeichen unseres 50-jährigen Bestehens. Wir haben ein abwechslungsreiches Programm für euch zusammengestellt – von sportlichen Wettkämpfen bis hin zu geselligen Feiern. Seid dabei und feiert mit uns!
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
