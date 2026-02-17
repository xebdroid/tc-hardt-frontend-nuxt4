<script setup lang="ts">
import AppButton from '~/components/base/Button.vue'
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
    description: 'Wir starten unser Jubiläumsjahr mit einem bunten Saisonauftakt.',
    icon: 'i-heroicons-home-modern',
    image: 'https://images.unsplash.com/photo-1554287898-906a6586d6ac?q=80&w=800'
  },
  {
    date: '27.06.2026',
    title: 'Jubiläumsfeier',
    description: 'Eine Jubiläums-Gala mit Musik, leckerem Essen und Highlights aus 50 Jahren.',
    icon: 'i-heroicons-cake',
    image: 'https://images.unsplash.com/photo-1519671482749-b09be7956a6a?q=80&w=800'
  },
  {
    date: '25.07.2026',
    title: 'Sangria Open',
    description: 'Sommer, Sonne, Sangria – unser Kultturnier für Jung und Alt.',
    icon: 'i-heroicons-sun',
    image: 'https://images.unsplash.com/photo-1587049352851-d4895c09a37d?q=80&w=800'
  },
  {
    date: '29.08. – 13.09.2026',
    title: 'Kreis- & Stadtmeisterschaften',
    description: 'Wir sind Gastgeber der Stadtmeisterschaften! Spannende Matches garantiert.',
    icon: 'i-heroicons-trophy',
    image: 'https://images.unsplash.com/photo-1612154363435-0873b885b734?q=80&w=800'
  },
  {
    date: '26./27.09.2026',
    title: 'Finaltag der Clubmeisterschaften',
    description: 'Wer wird Clubmeister 2026? Das große Finalwochenende.',
    icon: 'i-heroicons-star',
    image: 'https://images.unsplash.com/photo-1594464296232-950337d24271?q=80&w=800'
  },
  {
    date: '10.10.2026',
    title: 'Glühwein Open & Saisonabschluss',
    description: 'Ein gemütliches Herbstturnier mit Glühwein und anschließendem Saisonabschluss.',
    icon: 'i-heroicons-fire',
    image: 'https://images.unsplash.com/photo-1605199124451-ebadace9db38?q=80&w=800'
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

    <div id="events" class="py-16 sm:py-24 bg-gray-50 dark:bg-brand-dark-950">
      <UContainer>
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-brand-dark-900 dark:text-white sm:text-4xl mb-4">
            Unsere Jubiläums-Highlights 2026
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Ein ganzes Jahr voller besonderer Events für unsere Mitglieder und Freunde.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in timelineItems"
            :key="index"
            class="relative rounded-2xl h-80 overflow-hidden group shadow-lg"
          >
            <img :src="item.image" :alt="item.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              <UIcon :name="item.icon" class="w-10 h-10 text-accent-400 mb-4" />
              <p class="text-xl font-bold mb-1">
                {{ item.title }}
              </p>
              <p class="text-md font-semibold text-gray-300 mb-2">
                {{ item.date }}
              </p>
              <p class="text-gray-200 text-sm">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

  </div>
</template>
