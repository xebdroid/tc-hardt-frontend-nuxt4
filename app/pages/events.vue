<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import db from '~/assets/data/db.json'
import type { Event } from '~/types'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import EventList from '~/components/events/EventList.vue'
import EventItem from '~/components/events/EventItem.vue'
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

const isTbaDate = (dateStr?: string) => !dateStr || dateStr.trim().toLowerCase() === 'tba' || isNaN(new Date(dateStr).getTime())

const upcomingEvents = computed(() => {
  return [...db.events]
    .filter(event => isTbaDate(event.date) || new Date(event.date) >= now.value)
    .sort((a, b) => {
      const aTba = isTbaDate(a.date)
      const bTba = isTbaDate(b.date)
      if (aTba && bTba) return 0
      if (aTba) return 1
      if (bTba) return -1
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
})

// --- SCHEMA.ORG: RICH SNIPPETS FOR EVENTS ---
const upcomingEventsForSchema = computed(() => {
  return upcomingEvents.value
    .filter(event => !isTbaDate(event.date))
    .slice(0, 10)
    .map(event => {
      const atHomeKeywords = ['clubhaus', 'anlage', 'tc hardt']
      const locationString = event.location?.toLowerCase() || ''
      const isAtHome = atHomeKeywords.some(keyword => locationString.includes(keyword))
      const address = isAtHome ? (db as any).clubInfo?.address : event.location

      return {
        name: event.title,
        startDate: event.date,
        endDate: event.dateEnd || event.date,
        description: event.description || 'Vereinsveranstaltung des TC Hardt e.V.',
        location: {
          name: isAtHome ? 'TC Hardt e.V. Clubanlage' : (event.location || 'TC Hardt e.V.'),
          address: address || 'Birkmannsweg 16, 41169 Mönchengladbach'
        },
        image: event.image || '/img/logo.png',
        url: 'https://www.tc-hardt.de/termine'
      }
    })
})

// Übermittelt die Termine an das SEO-Modul
useSchemaOrg([
  ...upcomingEventsForSchema.value.map(evt => defineEvent(evt))
])

const upcomingEventsByMonth = computed(() => {
  const grouped: { [key: string]: Event[] } = {}
  for (const event of upcomingEvents.value) {
    const month = isTbaDate(event.date)
      ? 'Termin noch offen'
      : new Date(event.date).toLocaleString('de-DE', { month: 'long' })

    if (!grouped[month]) {
      grouped[month] = []
    }
    grouped[month].push(event as Event)
  }
  return grouped
})

const pastEvents = computed(() => {
  return [...db.events]
    .filter(event => !isTbaDate(event.date) && new Date(event.date) < now.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const pastEventsByYear = computed(() => {
  const grouped = new Map<number, Event[]>()
  for (const event of pastEvents.value) {
    const year = new Date(event.date).getFullYear()
    if (!grouped.has(year)) {
      grouped.set(year, [])
    }
    grouped.get(year)!.push(event as Event)
  }
  return Array.from(grouped.entries())
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, events]) => ({ year, events }))
})

const eventCountDescription = computed(() => {
  const upcomingCount = upcomingEvents.value.length
  return `Ein Jahr voller Events: Freut euch auf ${upcomingCount} kommende Termine und werft einen Blick auf unsere vergangenen Highlights.`
})

const openPastYear = ref<number | null>(null)
const openPastEventId = ref<number | null>(null)

const handlePastYearToggle = (year: number) => {
  openPastYear.value = openPastYear.value === year ? null : year
}

const handlePastEventToggle = (id: number) => {
  openPastEventId.value = openPastEventId.value === id ? null : id
}
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

    <Section margin-bottom="none">
      <Headline
        :title="`Unsere Events ${currentYear}`"
        :description="eventCountDescription"
        tag="h2"
        size="h2"
        alignment="center"
        margin-bottom="sm"
      />
      <div class="flex justify-center">
        <Button
          label="Alle Termine herunterladen"
          icon="i-heroicons-arrow-down-tray"
          variant="outline"
          @click="downloadAllIcs"
        />
      </div>
    </Section>


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
      <div class="space-y-4">
        <UCollapsible
          v-for="group in pastEventsByYear"
          :key="group.year"
          class="flex flex-col"
          :open="openPastYear === group.year"
        >
          <button
            type="button"
            class="group/year w-full p-4 md:px-6 md:py-5 flex justify-between items-center gap-4 cursor-pointer text-left rounded-xl bg-white dark:bg-gray-900 border transition-all duration-200"
            :class="openPastYear === group.year
              ? 'border-accent-500 dark:border-accent-400 shadow-sm'
              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5'"
            @click="handlePastYearToggle(group.year)"
          >
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-calendar-days"
                class="w-6 h-6 text-accent-500 shrink-0"
              />
              <span class="text-xl md:text-2xl font-bold text-brand-dark-900 dark:text-white group-hover/year:text-accent-600 dark:group-hover/year:text-accent-400 transition-colors">
                Jahrgang {{ group.year }}
              </span>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {{ group.events.length }} {{ group.events.length === 1 ? 'Termin' : 'Termine' }}
              </span>
            </div>

            <UIcon
              name="i-heroicons-chevron-down"
              class="w-6 h-6 transition-transform duration-300 shrink-0"
              :class="openPastYear === group.year ? 'rotate-180 text-accent-500' : 'text-gray-400'"
            />
          </button>

          <template #content>
            <div class="pt-4 space-y-4">
              <EventItem
                v-for="event in group.events"
                :key="event.id"
                :event="event"
                :is-past="true"
                :is-open="openPastEventId === event.id"
                @toggle="handlePastEventToggle(event.id)"
              />
            </div>
          </template>
        </UCollapsible>
      </div>
    </Section>
  </div>
</template>
