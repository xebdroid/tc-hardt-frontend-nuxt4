<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import db from '~/assets/data/db.json'

const route = useRoute()


// News Item finden
const newsItem = computed(() => {
  return db.news.find(n => n.id === Number(route.params.id))
})

// Wenn ID nicht gefunden, Redirect oder Error (einfacher Fall hier)
if (!newsItem.value) {
  // In einer echten App: throw createError({ statusCode: 404, statusMessage: 'News nicht gefunden' })
}

useHead({ title: newsItem.value ? `${newsItem.value.title} | TC Hardt` : 'News' })
</script>

<template>
  <div v-if="newsItem" class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <Hero
      :slides="[]"
      height="small"
      fallback-class="bg-gray-900"
    >
      <template #content>
        <h1 class="text-3xl sm:text-5xl font-heading font-bold text-white mb-4 max-w-4xl mx-auto leading-tight">
          {{ newsItem.title }}
        </h1>
        <div class="flex items-center justify-center gap-2 text-tennis-100">
          <UIcon name="i-heroicons-calendar" />
          <span>{{ newsItem.date }}</span>
        </div>
      </template>
    </Hero>

    <UContainer class="py-16">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 md:p-12 max-w-4xl mx-auto -mt-32 relative z-20">
        <img
          :src="newsItem.image"
          class="w-full h-auto rounded-xl mb-8 shadow-md"
          :alt="newsItem.title"
        >

        <div class="prose dark:prose-invert max-w-none text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p class="font-bold text-xl mb-6">{{ newsItem.excerpt }}</p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="newsItem.content" />
        </div>

        <div class="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <UButton
            :to="$localePath('news')"
            variant="ghost"
            icon="i-heroicons-arrow-left"
          >
            Zurück zur Übersicht
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
