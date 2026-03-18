<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import db from '~/assets/data/db.json'
import type { Event } from '~/types'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import EventList from '~/components/events/EventList.vue'
import EventItem from '~/components/events/EventItem.vue'
import EventCalendarView from '~/components/events/EventCalendarView.vue'
import { useAllEventsCalendar } from '~/composables/useAllEventsCalendar'
import Button from '~/components/base/Button.vue'

useSeoMeta({
  title: 'Events & Termine',
  ogTitle: 'Events & Termine',
  description: 'Verpasse keine Veranstaltung beim TC Hardt! Hier findest du alle aktuellen Termine, Turniere und Feiern im Überblick.',
  ogDescription: 'Verpasse keine Veranstaltung beim TC Hardt! Hier findest du alle aktuellen Termine, Turniere und Feiern im Überblick.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

// Sicherer SSR-Umgang mit Datum (verhindert Hydration Mismatches)
const now = ref(new Date())
const currentYear = computed(() => now.value.getFullYear())

onMounted(() => {
  now.value = new Date()
})

const { downloadAllIcs } = useAllEventsCalendar()

const upcomingEvents = computed(() => {
  return [...db.events]
    .filter(event => new Date(event.date) >= now.value)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const upcomingEventsByMonth = computed(() => {
  const grouped: { [key: string]: Event[] } = {}
  for (const event of upcomingEvents.value) {
    const eventDate = new Date(event.date)
    // Group by month name only, without the year
    const month = eventDate.toLocaleString('de-DE', { month: 'long' })

    if (!grouped[month]) {
      grouped[month] = []
    }
    grouped[month].push(event as Event)
  }
  return grouped
})

const pastEvents = computed(() => {
  return [...db.events]
    .filter(event => new Date(event.date) < now.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const eventCountDescription = computed(() => {
  const upcomingCount = upcomingEvents.value.length
  return `Ein Jahr voller Events: Freut euch auf ${upcomingCount} kommende Termine und werft einen Blick auf unsere vergangenen Highlights.`
})

const openPastEventId = ref<number | null>(null)

const handlePastEventToggle = (id: number) => {
  openPastEventId.value = openPastEventId.value === id ? null : id
}

const currentView = ref<'list' | 'calendar'>('list')
</script>

<template>
  <div>
    <Hero height="small" fallback-class="bg-brand-dark-900">
      <template #content>
        <Headline
          title="Club-Veranstaltungen"
          description="Das ist bei uns im Club los. Komm vorbei!"
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'sm'"
        />
      </template>
    </Hero>

    <Section margin-bottom="sm">
      <Headline
        :title="`Unsere Events ${currentYear}`"
        :description="eventCountDescription"
        tag="h2"
        size="h2"
        alignment="center"
        margin-bottom="sm"
      />

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">

        <!-- View Switcher -->
        <div class="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl inline-flex shadow-inner">
          <button
            @click="currentView = 'list'"
            class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2"
            :class="currentView === 'list' ? 'bg-white dark:bg-gray-700 shadow text-brand-dark-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
          >
            <UIcon name="i-heroicons-list-bullet" class="w-5 h-5" />
            Liste
          </button>
          <button
            @click="currentView = 'calendar'"
            class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2"
            :class="currentView === 'calendar' ? 'bg-white dark:bg-gray-700 shadow text-brand-dark-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
          >
            <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
            Kalender
          </button>
        </div>

        <Button
          label="Alle Termine herunterladen"
          icon="i-heroicons-arrow-down-tray"
          variant="outline"
          size="lg"
          @click="downloadAllIcs"
        />
      </div>
    </Section>

    <!-- LIST VIEW -->
    <div v-show="currentView === 'list'" class="animate-in fade-in duration-300">
      <Section
        v-if="upcomingEvents.length > 0"
        variant="secondary-light"
        rounded
        overlap-bottom
        padding-top="xs"
        padding-bottom="sm"
        :padding-left="{ base: 'none', md: 'xs' , lg: 'md' }"
        :padding-right="{ base: 'none', md: 'xs' , lg: 'md'}"
        :outer-container="{ base: false, md: true}"
        class="relative z-10"
      >
        <template v-if="Object.keys(upcomingEventsByMonth).length > 0">
          <EventList
            v-for="(monthlyEvents, month) in upcomingEventsByMonth"
            :key="month"
            :month="month"
            :events="monthlyEvents"
          />
        </template>
        <div v-else class="text-center text-gray-500 py-8">
          <p>Zurzeit sind keine neuen Termine geplant. Schau bald wieder vorbei!</p>
        </div>
      </Section>
    </div>

    <!-- CALENDAR VIEW -->
    <div v-if="currentView === 'calendar'" class="animate-in fade-in zoom-in-95 duration-300">
      <Section
        variant="secondary-light"
        rounded
        overlap-bottom
        padding-top="md"
        padding-bottom="xl"
        :padding-left="{ base: 'xs', md: 'sm' , lg: 'md' }"
        :padding-right="{ base: 'xs', md: 'sm' , lg: 'md'}"
        :outer-container="{ base: false, md: true}"
        class="relative z-10"
      >
        <EventCalendarView :events="(db.events as any)" />
      </Section>
    </div>

    <Section
      v-if="pastEvents.length > 0"
      variant="gray-light"
      rounded
      outer-container
      overlap-top
      padding-top="lg"
      padding-bottom="sm"
      :padding-left="{ base: 'none', md: 'md' }"
      :padding-right="{ base: 'none', md: 'md'}"
      margin-bottom="xl"
      class="relative z-0"
    >
      <Headline
        title="Vergangene Events"
        description="Ein kleiner Rückblick auf unsere letzten Veranstaltungen."
        alignment="center"
      />
      <EventItem
        v-for="event in pastEvents"
        :key="event.id"
        :event="event"
        :is-past="true"
        :is-open="openPastEventId === event.id"
        @toggle="handlePastEventToggle(event.id)"
      />
    </Section>
  </div>
</template>
