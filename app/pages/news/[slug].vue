<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Section from '~/components/base/Section.vue'
import ArticleInfoBox from '~/components/ArticleInfoBox.vue'
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Image from '~/components/base/Image.vue'
import Button from '~/components/base/Button.vue'

const route = useRoute()
const newsItem = computed(() => {
  // Find by slug instead of id
  return (db.news as any).find(n => n.slug === route.params.slug)
})

if (newsItem.value) {
  useSeoMeta({
    title: () => newsItem.value.title,
    ogTitle: () => newsItem.value.title,
    twitterTitle: () => newsItem.value.title,
    description: () => newsItem.value.excerpt,
    ogDescription: () => newsItem.value.excerpt,
    twitterDescription: () => newsItem.value.excerpt,
    ogImage: () => newsItem.value.image || '/img/logo.png',
    twitterImage: () => newsItem.value.image || '/img/logo.png',
    twitterCard: 'summary_large_image',
  })
} else {
  useSeoMeta({
    title: 'News nicht gefunden',
    robots: 'noindex, nofollow'
  })
}

const isLargeImageLayout = computed(() => newsItem.value?.layout === 'large-image')
</script>

<template>
  <div v-if="newsItem">

    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <div class="flex flex-col items-center gap-6">
          <Headline
            title="Aktuelles"
            tag="h1"
            size="h1"
            mode="light"
            alignment="center"
            margin-bottom="none"
          />
          <Button
            to="/news"
            variant="ghost-white"
            label="Zurück zur Übersicht"
            icon="i-heroicons-arrow-left"
          />
        </div>
      </template>
    </Hero>

    <Section
      variant="secondary-light"
      outer-container
      rounded
      padding-top="sm"
      padding-bottom="sm"
      padding-left="sm"
      padding-right="sm"
      margin-bottom="xl"
      margin-top="sm"
    >
      <div class="max-w-6xl mx-auto">

        <!-- Variante 2: Großes Bild links, Text darunter. Info rechts. -->
        <div v-if="isLargeImageLayout" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 flex flex-col">
            <Image
              v-if="(newsItem as any).image_large || newsItem.image"
              :src="(newsItem as any).image_large || newsItem.image"
              :alt="newsItem.title"
              class="mb-8 order-1 lg:order-2"
            />

            <Headline
              :title="newsItem.title"
              tag="h1"
              size="h3"
              mode="dark"
              alignment="left"
              margin-bottom="sm"
              class="order-2 lg:order-1"
            />

            <div class="prose dark:prose-invert max-w-none text-lg leading-relaxed order-3">
              <div v-html="newsItem.content"/>
              <div v-if="newsItem.cta && newsItem.cta.to && newsItem.cta.label" class="mt-8">
                <Button
                  :to="newsItem.cta.to"
                  :label="newsItem.cta.label"
                  variant="brand-dark"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-1 order-last">
            <ArticleInfoBox
              :date="newsItem.date"
              :title="newsItem.title"
              class="sticky top-24"
            />
          </div>
        </div>

        <!-- Variante 1: Text links + Info Box. Kleines Bild rechts. -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 order-2 lg:order-1">
            <Headline
              :title="newsItem.title"
              tag="h1"
              size="h3"
              mode="dark"
              alignment="left"
              margin-bottom="sm"
            />
            <div class="prose dark:prose-invert max-w-none text-lg leading-relaxed mb-10">
              <div v-html="newsItem.content"/>
              <div v-if="newsItem.cta && newsItem.cta.to && newsItem.cta.label" class="mt-8">
                <Button
                  :to="newsItem.cta.to"
                  :label="newsItem.cta.label"
                  variant="brand-dark"
                />
              </div>
            </div>

            <!-- Info Box unter dem Text (aber in der linken Spalte) -->
            <ArticleInfoBox :date="newsItem.date" :title="newsItem.title" />
          </div>

          <div class="lg:col-span-1 order-1 lg:order-2">
            <Image
              v-if="newsItem.image"
              :src="newsItem.image"
              :alt="newsItem.title"
              class="aspect-square"
            />
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
