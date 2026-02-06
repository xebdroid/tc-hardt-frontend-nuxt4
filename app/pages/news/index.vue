<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import db from '~/assets/data/db.json'

useHead({ title: 'Aktuelles | TC Hardt' })
const localePath = useLocalePath()
const newsItems = db.news
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <Hero
      :slides="[]"
      height="small"
      fallback-class="bg-tennis-900"
    >
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Aktuelles
          </h1>
          <p class="text-xl text-tennis-100 max-w-2xl mx-auto">
            Neuigkeiten, Spielberichte und Termine.
          </p>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="news in newsItems"
          :key="news.id"
          :to="localePath(`/news/${news.id}`)"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
        >
          <div class="h-56 overflow-hidden relative shrink-0">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
            <img :src="news.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" :alt="news.title">
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-highlight-500" />
              <span class="text-xs font-bold text-gray-500 uppercase">{{ news.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-tennis-600 transition-colors">
              {{ news.title }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
              {{ news.excerpt }}
            </p>
            <span class="inline-flex items-center text-tennis-600 text-sm font-bold group-hover:translate-x-1 transition-transform mt-auto">
              Weiterlesen <UIcon name="i-heroicons-arrow-small-right" class="w-4 h-4 ml-1" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
