<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Image from '~/components/base/Image.vue'
import db from '~/assets/data/db.json'

const route = useRoute()

// News Item finden
const newsItem = computed(() => {
  const item = db.news.find(n => n.id === Number(route.params.id))
  // Type assertion to help with type inference in the template
  return item as (typeof db.news)[0] | undefined
})

// Wenn ID nicht gefunden, Redirect oder Error
if (!newsItem.value) {
  throw createError({ statusCode: 404, statusMessage: 'News nicht gefunden' })
}

useHead({ title: newsItem.value ? `${newsItem.value.title} | TC Hardt` : 'News' })

const isLargeImageLayout = computed(() => newsItem.value?.layout === 'large-image')
</script>

<template>
  <div v-if="newsItem">
    <Hero height="small">
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl sm:text-6xl font-heading font-bold text-white mb-6">
            {{ newsItem.title }}
          </h1>
        </div>
      </template>
    </Hero>

    <Section class="bg-gray-50 dark:bg-gray-900">
      <div class="max-w-4xl mx-auto">
        <!-- Large Image Layout -->
        <template v-if="isLargeImageLayout">
          <Image
            :src="newsItem.image"
            :alt="newsItem.title"
            variant="feature"
            class="w-full h-auto mb-8"
          />
        </template>

        <!-- Small Image Layout (Default) -->
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
            <div class="md:col-span-2">
              <Headline
                tag="p"
                :title="newsItem.excerpt"
                size="h5"
                :margin-bottom="'sm'"
              />
              <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <UIcon name="i-heroicons-calendar" />
                <span>{{ newsItem.date }}</span>
              </div>
            </div>
            <Image
              :src="newsItem.image"
              :alt="newsItem.title"
              variant="event"
              class="w-40 h-40"
            />
          </div>
        </template>

        <!-- Common Content Area -->
        <div class="prose dark:prose-invert max-w-none text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
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
    </Section>
  </div>
</template>
