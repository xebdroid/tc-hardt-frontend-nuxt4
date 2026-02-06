<script setup lang="ts">
import AppButton from '~/components/base/AppButton.vue'
import type { HeroSlide } from '~/components/base/Hero.vue'
import Hero from '~/components/base/Hero.vue'

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
    src: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
    alt: 'Tennisplatz',
    overlayPosition: 'center',
    slotName: 'jubilee-hero'
  }
]

// 2. Timeline Data
const timelineItems = [
  {
    date: '19.04.2026',
    title: 'Tag der offenen Tür / Saisoneröffnung',
    description: 'Wir starten unser Jubiläumsjahr mit einem bunten Saisonauftakt. Alle Tennisinteressierten sind herzlich eingeladen.',
    icon: 'i-heroicons-home-modern'
  },
  {
    date: '27.06.2026',
    title: 'Jubiläumsfeier',
    description: 'Das Highlight unseres Festjahres! Eine Jubiläums-Gala mit Musik, leckerem Essen und Highlights aus 50 Jahren.',
    icon: 'i-heroicons-cake'
  },
  {
    date: '25.07.2026',
    title: 'Sangria Open',
    description: 'Sommer, Sonne, Sangria – unser Kultturnier für Jung und Alt.',
    icon: 'i-heroicons-sun'
  },
  {
    date: '29.08. – 13.09.2026',
    title: 'Kreis- & Stadtmeisterschaften',
    description: 'Wir sind Gastgeber der Stadtmeisterschaften! Spannende Matches garantiert.',
    icon: 'i-heroicons-trophy'
  },
  {
    date: '26./27.09.2026',
    title: 'Finaltag der Clubmeisterschaften',
    description: 'Wer wird Clubmeister 2026? Das große Finalwochenende.',
    icon: 'i-heroicons-star'
  },
  {
    date: '10.10.2026',
    title: 'Glühwein Open & Saisonabschluss',
    description: 'Ein gemütliches Herbstturnier mit Glühwein und anschließendem Saisonabschluss.',
    icon: 'i-heroicons-fire'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen">

    <Hero :slides="heroSlides" height="large">
      <template #jubilee-hero>
        <div class="text-center max-w-4xl mx-auto">
          <div class="mb-6 flex justify-center">
            <span class="rounded-full bg-accent-500 text-brand-dark-950 px-4 py-1.5 text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.4)] backdrop-blur-sm">
              Jubiläumsjahr 2026
            </span>
          </div>
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-euro-extended drop-shadow-2xl">
            50 Jahre <span class="text-accent-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">Tennis op de Hardt</span>
          </h1>
          <p class="text-lg sm:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Ein halbes Jahrhundert voller Sport, Gemeinschaft und unvergesslicher Momente.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AppButton
              to="#events"
              label="Zu den Highlights"
              variant="primary"
              size="xl"
            />
            <AppButton
              to="/contact"
              label="Kontakt"
              variant="outline"
              size="xl"
              class="!text-white !border-white hover:!bg-white/10 w-full sm:w-auto"
            />
          </div>
        </div>
      </template>
    </Hero>

    <div class="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
      <div class="text-base leading-7 text-gray-700 dark:text-gray-300 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-brand-dark-900 dark:text-white sm:text-4xl mb-8">
          50 Jahre Tennis op de Hardt
        </h2>
        <div class="text-lg leading-relaxed space-y-6">
          <p>
            Der <strong>TC Hardt 1976 e.V.</strong> feiert im Jahr 2026 sein <strong class="text-accent-500 dark:text-accent-500">50-jähriges Vereinsjubiläum</strong>.
            Dieses besondere Jubiläum wollen wir gemeinsam mit euch feiern.
          </p>
        </div>
      </div>
    </div>

    <UContainer class="py-16 space-y-16 overflow-x-hidden">
      <UTimeline
        :items="timelineItems"
        :default-value="5"
        size="3xl"
        :ui="{ item: 'even:lg:flex-row-reverse even:lg:-translate-x-[calc(100%-3rem)] even:lg:text-right',
               wrapper: 'border border-brand-dark-100 rounded-2xl p-6 lg:max-w-[400px]',
               date: 'text-accent-500 dark:text-accent-400 font-semibold text-md',
               title: 'text-accent-500 dark:text-accent-400 font-bold text-lg'}"
        class="lg:translate-x-[calc(50%-1rem)]"
      />
    </UContainer>

  </div>
</template>
