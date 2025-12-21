<script setup lang="ts">
import db from '~/assets/data/db.json'

const { t } = useI18n()
const localePath = useLocalePath()

// News aus der JSON laden
const newsItems = db.news

// Features (Ascheplätze etc.)
const clubFeatures = computed(() => [
  {
    icon: 'i-heroicons-trophy',
    title: t('home.intro_features.courts.title'),
    description: t('home.intro_features.courts.desc')
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.intro_features.community.title'),
    description: t('home.intro_features.community.desc')
  },
  {
    icon: 'i-heroicons-sparkles',
    title: t('home.intro_features.training.title'),
    description: t('home.intro_features.training.desc')
  },
  {
    icon: 'i-heroicons-home-modern',
    title: t('home.intro_features.gastronomy.title'),
    description: t('home.intro_features.gastronomy.desc')
  }
])

// Werte (Fairness etc.)
const values = computed(() => [
  {
    icon: 'i-heroicons-heart',
    title: t('home.values.items.hospitality.title'),
    description: t('home.values.items.hospitality.desc')
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.values.items.team_spirit.title'),
    description: t('home.values.items.team_spirit.desc')
  },
  {
    icon: 'i-heroicons-scale',
    title: t('home.values.items.fairness.title'),
    description: t('home.values.items.fairness.desc')
  },
  {
    icon: 'i-heroicons-face-smile',
    title: t('home.values.items.fun.title'),
    description: t('home.values.items.fun.desc')
  }
])
</script>

<template>
  <div class="flex flex-col">

    <div class="relative flex items-center min-h-[700px] bg-tennis-900 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop"
        class="absolute inset-0 w-full h-full object-cover opacity-30"
        alt="Tennisplatz"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-tennis-900 via-tennis-900/60 to-transparent" />

      <UContainer class="relative z-10 py-24 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight-400/10 border border-highlight-400/20 text-highlight-400 mb-8 backdrop-blur-sm">
          <UIcon name="i-heroicons-star" class="w-4 h-4" />
          <span class="text-xs font-bold uppercase tracking-widest">{{ $t('home.hero.badge') }}</span>
        </div>

        <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6 font-heading">
          {{ $t('home.hero.title') }}
        </h1>

        <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ $t('home.hero.description') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            :to="localePath('contact')"
            size="xl"
            color="highlight"
            variant="solid"
            class="font-bold text-tennis-950"
            :ui="{ rounded: 'rounded-full' }"
          >
            {{ $t('home.hero.cta_primary') }}
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
            </template>
          </UButton>

          <UButton
            :to="localePath('about')"
            size="xl"
            color="white"
            variant="soft"
            class="font-bold"
            :ui="{ rounded: 'rounded-full' }"
          >
            {{ $t('home.hero.cta_secondary') }}
          </UButton>
        </div>
      </UContainer>
    </div>

    <div class="bg-gray-50 dark:bg-gray-900 py-16 lg:py-24">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in clubFeatures"
            :key="index"
            class="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-tennis-200 dark:hover:border-tennis-700 transition-all duration-300 group"
          >
            <div class="w-12 h-12 rounded-xl bg-tennis-50 dark:bg-tennis-900/50 flex items-center justify-center text-tennis-600 mb-4 group-hover:scale-110 transition-transform">
              <UIcon :name="feature.icon" class="w-7 h-7" />
            </div>
            <h3 class="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </div>

    <div class="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <UContainer>
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="lg:w-1/2">
            <span class="text-highlight-600 font-bold uppercase tracking-widest text-sm mb-2 block">
              TC Hardt Philosophie
            </span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-tennis-900 dark:text-white mb-6">
              {{ $t('home.values.title') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              {{ $t('home.values.description') }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                v-for="(val, i) in values"
                :key="i"
                class="flex gap-4"
              >
                <UIcon :name="val.icon" class="w-6 h-6 text-highlight-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">{{ val.title }}</h4>
                  <p class="text-sm text-gray-500 mt-1">{{ val.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 relative">
            <div class="absolute -inset-4 bg-highlight-100/50 dark:bg-highlight-900/20 rounded-3xl -rotate-3 transform" />
            <img
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop"
              class="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3] border-4 border-white dark:border-gray-800"
              alt="Tennis Community"
            >
          </div>
        </div>
      </UContainer>
    </div>

    <div class="bg-gray-50 dark:bg-gray-900 py-24">
      <UContainer>
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-heading font-bold text-tennis-900 dark:text-white">
              {{ $t('home.news.title') }}
            </h2>
          </div>
          <UButton
            variant="ghost"
            color="gray"
            trailing-icon="i-heroicons-arrow-right"
          >
            Alle News
          </UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="news in newsItems"
            :key="news.id"
            class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div class="h-48 overflow-hidden">
              <img
                :src="news.image"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              >
            </div>
            <div class="p-6">
              <span class="text-xs font-bold text-highlight-600 mb-2 block">{{ news.date }}</span>
              <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{{ news.title }}</h3>
              <p class="text-gray-500 text-sm line-clamp-2 mb-4">{{ news.excerpt }}</p>
              <span class="text-tennis-600 text-sm font-medium group-hover:underline">Weiterlesen</span>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <div class="bg-tennis-900 py-24 text-center">
      <UContainer>
        <UIcon name="i-heroicons-heart" class="w-12 h-12 text-highlight-400 mb-6" />
        <h2 class="text-3xl sm:text-5xl font-heading font-bold text-white mb-6">
          {{ $t('home.cta_bottom.title') }}
        </h2>
        <p class="text-tennis-100 text-lg mb-8 max-w-2xl mx-auto">
          {{ $t('home.cta_bottom.description') }}
        </p>
        <UButton
          :to="localePath('contact')"
          size="xl"
          color="highlight"
          variant="solid"
          class="font-bold text-tennis-950"
          :ui="{ rounded: 'rounded-full' }"
        >
          {{ $t('home.cta_bottom.button') }}
        </UButton>
      </UContainer>
    </div>

  </div>
</template>
