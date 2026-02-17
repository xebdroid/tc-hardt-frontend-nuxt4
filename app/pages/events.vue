<script setup lang="ts">
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Section from '~/components/base/Section.vue'
import Image from '~/components/base/Image.vue'

useHead({ title: 'Events | TC Hardt' })

const upcomingEvents = computed(() => {
  return db.events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const pastEvents = computed(() => {
  return db.events
    .filter(event => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

function formatDay(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { day: '2-digit' })
}

function formatMonth(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { month: 'short' })
}

function formatYear(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { year: 'numeric' })
}
</script>

<template>
  <div>
    <Hero height="small" fallback-class="bg-brand-dark-900">
      <template #content>
        <Headline
          title="Alle Termine"
          description="Das ist bei uns im Club los. Komm vorbei!"
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'sm'"
        />
      </template>
    </Hero>

    <Section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="event in upcomingEvents" :key="event.id">
          <div
            class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105"
            :class="{
              'lg:col-span-3': event.highlightLevel === 2,
              'ring-2 ring-accent-500 dark:ring-accent-400': event.highlightLevel === 1,
              'bg-accent-50 dark:bg-accent-900/10': event.highlightLevel === 1,
            }"
          >
            <Image
              v-if="event.image"
              :src="event.image"
              :alt="event.title"
              class="w-full h-56 object-cover"
            />
            <div class="p-6 flex-grow flex flex-col">
              <div class="flex items-start">
                <div class="text-center mr-6 flex-shrink-0">
                  <div class="text-4xl font-bold text-brand-light-800">
                    {{ formatDay(event.date) }}
                  </div>
                  <div class="text-lg font-semibold text-gray-500 -mt-1">
                    {{ formatMonth(event.date) }}
                  </div>
                   <div class="text-md font-medium text-gray-400">
                    {{ formatYear(event.date) }}
                  </div>
                </div>
                <div class="flex-grow">
                  <h3 class="text-2xl font-bold text-gray-800 mb-2">
                    {{ event.title }}
                  </h3>
                  <div class="text-gray-600 space-y-1">
                    <div v-if="event.time" class="flex items-center">
                      <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-2" />
                      <span>{{ event.time }}</span>
                    </div>
                    <div v-if="event.location" class="flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
                      <span>{{ event.location }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-gray-700 mt-4 flex-grow">
                {{ event.description }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </Section>

    <Section v-if="pastEvents.length > 0" variant="secondary-light" rounded overlap-top>
      <Headline title="Vergangene Termine" alignment="center" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <template v-for="event in pastEvents" :key="event.id">
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col opacity-70"
          >
            <div class="p-6">
              <div class="flex items-center">
                <div class="text-center mr-4 flex-shrink-0">
                  <div class="text-2xl font-bold text-gray-400">
                    {{ formatDay(event.date) }}
                  </div>
                  <div class="text-sm font-semibold text-gray-400">
                    {{ formatMonth(event.date) }}
                  </div>
                  <div class="text-xs font-medium text-gray-400">
                    {{ formatYear(event.date) }}
                  </div>
                </div>
                <div class="flex-grow">
                  <h3 class="text-xl font-semibold text-gray-600">
                    {{ event.title }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </Section>
  </div>
</template>
