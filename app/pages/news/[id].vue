<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Section from '~/components/base/Section.vue'
import ArticleInfoBox from '~/components/ArticleInfoBox.vue'
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'

const route = useRoute()
const newsItem = computed(() => {
  return db.news.find(n => n.id == Number(route.params.id))
})

useHead({
  title: newsItem.value ? `${newsItem.value.title} - TC Hardt` : 'News nicht gefunden',
})

const isLargeImageLayout = computed(() => newsItem.value?.layout === 'large-image')
</script>

<template>
  <div v-if="newsItem" class="bg-white dark:bg-gray-900 min-h-screen">

    <Hero
      height="small"
      :slides="
        [
          {
            type: 'color',
            title: newsItem.title,

          }
        ]
      "
    />

    <Section
      variant="secondary-light"
      outer-container
      rounded
      padding-top="sm"
      padding-bottom="sm"
      padding-left="sm"
      padding-right="sm"
    >
      <div class="max-w-6xl mx-auto">

        <!-- Variante 2: Großes Bild links, Text darunter. Info rechts. -->
        <div v-if="isLargeImageLayout" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <img
              v-if="newsItem.image"
              :src="newsItem.image"
              :alt="newsItem.title"
              class="w-full h-auto rounded-xl shadow-lg mb-8"
            >

            <div class="prose dark:prose-invert max-w-none text-lg leading-relaxed">
              <div v-html="newsItem.content"/>
            </div>
          </div>

          <div class="lg:col-span-1">
            <ArticleInfoBox :date="newsItem.date" class="sticky top-24" />
          </div>
        </div>

        <!-- Variante 1: Text links + Info Box. Kleines Bild rechts. -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <div class="prose dark:prose-invert max-w-none text-lg leading-relaxed mb-10">
              <div v-html="newsItem.content"/>
            </div>

            <!-- Info Box unter dem Text (aber in der linken Spalte) -->
            <ArticleInfoBox :date="newsItem.date" />
          </div>

          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <img
                v-if="newsItem.image"
                :src="newsItem.image"
                :alt="newsItem.title"
                class="w-full h-auto rounded-xl shadow-lg"
              >
            </div>
          </div>
        </div>

      </div>
    </Section>

  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Artikel nicht gefunden</h1>
      <NuxtLink to="/news" class="text-primary-600 hover:underline">Zurück zur Übersicht</NuxtLink>
    </div>
  </div>
</template>
