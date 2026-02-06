<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Sponsors from '~/components/base/Sponsors.vue'
import AppButton from '~/components/base/AppButton.vue'
import db from '~/assets/data/db.json'

const { t } = useI18n()

// --- DATA ---
const heroSlides = computed<HeroSlide[]>(() => [
  {
    type: 'video',
    src: '/videos/plaetze_von_oben.mp4',
    poster: '/img/anlage/tc-hardt-anlage-01.jpg',
    title: 'Unsere Anlagen von oben',
    subtitle: 'Erkunde unsere erstklassigen Tennisplätze und Einrichtungen.',
    overlayPosition: 'center',
    ctaPrimary: { label: 'Mitglied werden', to: '/membership' }
  },
  {
    type: 'video',
    src: '/videos/tennis_example.mp4',
    poster: '/img/video-poster.jpg',
    title: 'Training in Aktion',
    subtitle: 'Schau dir an, wie unsere Jugend trainiert.',
    overlayPosition: 'center',
    ctaPrimary: { label: 'Probetraining', to: '/contact' }
  },
  {
    type: 'image',
    src: '/img/50_jahre_3.png',
    title: 'Unsere Jubiläums-Highlights 2026',
    overlayPosition: 'bottom-right',
    ctaPrimary: { label: "Mehr erfahren", to: '/contact' }
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop',
    title: t('home.hero.title'),
    subtitle: t('home.hero.description'),
    overlayPosition: 'center',
    ctaPrimary: { label: t('home.hero.cta_primary'), to: '/contact' },
    ctaSecondary: { label: t('home.hero.cta_secondary'), to: '/about' }
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1530915365347-e35b749a0381?q=80&w=1740&auto=format&fit=crop',
    title: 'Leidenschaft am Ball',
    subtitle: 'Unsere Trainer bringen dein Spiel auf das nächste Level.',
    overlayPosition: 'bottom-left',
    ctaPrimary: { label: 'Training buchen', to: '/training' }
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop',
    overlayImage: '/tc-hardt-logo.svg',
    overlayImageClass: 'w-20 mb-4 drop-shadow-md',
    title: 'Mehr als ein Verein',
    subtitle: 'Erlebe unsere starke Gemeinschaft.',
    overlayPosition: 'bottom-right',
    ctaPrimary: { label: 'Termine ansehen', to: '/news' }
  }
])

const clubFeatures = computed(() => [
  {
    icon: 'i-heroicons-trophy',
    title: t('home.intro_features.courts.title'),
    description: t('home.intro_features.courts.desc'),
    to: 'membership'
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.intro_features.community.title'),
    description: t('home.intro_features.community.desc'),
    to: 'membership'
  },
  {
    icon: 'i-heroicons-sparkles',
    title: t('home.intro_features.training.title'),
    description: t('home.intro_features.training.desc'),
    to: 'training'
  },
  {
    icon: 'i-heroicons-home-modern',
    title: 'Clubheim',
    description: 'Geselligkeit & kühle Getränke nach dem Match.',
    to: 'about'
  }
])

const values = computed(() => [
  { icon: 'i-heroicons-heart', title: t('home.values.items.hospitality.title'), description: t('home.values.items.hospitality.desc') },
  { icon: 'i-heroicons-user-group', title: t('home.values.items.team_spirit.title'), description: t('home.values.items.team_spirit.desc') },
  { icon: 'i-heroicons-scale', title: t('home.values.items.fairness.title'), description: t('home.values.items.fairness.desc') },
  { icon: 'i-heroicons-face-smile', title: t('home.values.items.fun.title'), description: t('home.values.items.fun.desc') }
])

const newsItems = db.news
</script>

<template>
  <div class="flex flex-col">

    <Hero
      :slides="heroSlides"
      height="full"
      fallback-class="bg-brand-dark-900"
      :autoplay="6000"
    />

    <Section
      variant="gray-light"
      padding-top="xl"
      overlap-top
      rounded
    >
      <div class="text-center mb-12 max-w-3xl mx-auto">
        <span class="text-brand-light-600 font-bold uppercase tracking-widest text-sm mb-2 block">
          Willkommen beim TC Hardt
        </span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-brand-dark-900 dark:text-white">
          Tennis, Tradition & Teamgeist
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Entdecke, was unseren Verein besonders macht und warum du dich bei uns wohlfühlen wirst.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <NuxtLink
          v-for="(feature, index) in clubFeatures"
          :key="index"
          :to="$localePath(feature.to)"
          class="
            flex flex-col items-center text-center p-8 rounded-2xl
            bg-white dark:bg-gray-800
            shadow-md hover:shadow-xl hover:-translate-y-1
            border-t-4 border-highlight-400
            transition-all duration-300 group
          "
        >
          <div class="w-14 h-14 rounded-full bg-brand-light-50 dark:bg-brand-light-900/50 flex items-center justify-center text-brand-light-600 mb-6 group-hover:scale-110 transition-transform">
            <UIcon :name="feature.icon" class="w-8 h-8" />
          </div>
          <h3 class="font-heading font-bold text-xl text-brand-dark-900 dark:text-white mb-3 group-hover:text-highlight-600 transition-colors">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ feature.description }}
          </p>
        </NuxtLink>
      </div>
    </Section>

    <Section
      variant="default"
      padding-top="xl"
      padding-bottom="xl"
      class="overflow-hidden"
    >
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        <div class="lg:w-1/2 relative order-2 lg:order-1 px-4 lg:px-0">

          <div class="relative z-10 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1591100463799-a9ef12226ba4?q=80&w=928&auto=format&fit=crop"
              class="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
              alt="Tennis Community TC Hardt"
            >
          </div>

          <div class="absolute top-6 right-6 z-30 bg-highlight-400 text-brand-dark-900 p-4 rounded-xl shadow-lg rotate-3 hidden sm:block">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-star" class="w-5 h-5" />
              <span class="font-bold font-heading text-sm">Seit 1976</span>
            </div>
          </div>

        </div>

        <div class="lg:w-1/2 order-1 lg:order-2">
          <span class="text-accent-600 font-bold uppercase tracking-widest text-sm mb-2 block">
            TC Hardt Philosophie
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-brand-dark-900 dark:text-white mb-6">
            {{ $t('home.values.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-10 text-lg leading-relaxed">
            {{ $t('home.values.description') }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(val, i) in values"
              :key="i"
              class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-brand-light-200 transition-colors"
            >
              <div class="mt-1 flex-shrink-0">
                <UIcon :name="val.icon" class="w-6 h-6 text-highlight-500" />
              </div>
              <div>
                <h4 class="font-bold text-brand-dark-900 dark:text-white text-lg">
                  {{ val.title }}
                </h4>
                <p class="text-base text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                  {{ val.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 flex justify-end">
            <AppButton
              to="/about"
              variant="brand-dark"
              label="Mehr über uns"
              trailing-icon="i-heroicons-arrow-right"
            />
          </div>
        </div>

      </div>
    </Section>

    <Section
      variant="primary"
      padding-top="xl"
      padding-bottom="xl"
      rounded
    >
      <div class="flex justify-between items-end mb-12">
        <div>
          <span class="text-highlight-400 font-bold uppercase tracking-widest text-sm mb-2 block">Aktuelles</span>
          <h2 class="text-3xl font-heading font-bold text-white">
            {{ $t('home.news.title') }}
          </h2>
        </div>

        <AppButton
          :to="$localePath('news')"
          variant="highlight"
          trailing-icon="i-heroicons-arrow-right"
          class="!text-white hover:!text-highlight-400"
        >
          Alle News
        </AppButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink
          v-for="news in newsItems"
          :key="news.id"
          :to="$localePath(`/news/${news.id}`)"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-brand-dark-900"
        >
          <div class="h-56 overflow-hidden relative">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
            <img
              :src="news.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              :alt="news.title"
            >
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-highlight-500" />
              <span class="text-xs font-bold text-gray-500 uppercase">{{ news.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-brand-dark-900 dark:text-white group-hover:text-highlight-600 transition-colors line-clamp-2">
              {{ news.title }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
              {{ news.excerpt }}
            </p>
            <span class="inline-flex items-center text-highlight-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
              Weiterlesen <UIcon name="i-heroicons-arrow-small-right" class="w-4 h-4 ml-1" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </Section>

    <Section
      :use-container="false"
      padding-top="xl"
      padding-bottom="lg"
    >
      <UContainer>
        <div class="text-center mb-10 px-4">
          <h2 class="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2">
            {{ t('sponsors.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ t('sponsors.subtitle') }}
          </p>
        </div>
      </UContainer>

      <Sponsors />
    </Section>
  </div>
</template>
