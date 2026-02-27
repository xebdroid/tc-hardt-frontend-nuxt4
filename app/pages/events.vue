<script setup lang="ts">
import { computed, ref } from 'vue'
import db from '~/assets/data/db.json'
import type { Event } from '~/types'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import EventList from '~/components/events/EventList.vue'
import EventItem from '~/components/events/EventItem.vue'

useHead({ title: 'Events | TC Hardt' })

const now = new Date()
const currentYear = now.getFullYear()

const upcomingEvents = computed(() => {
  return [...db.events]
    .filter(event => new Date(event.date) >= now)
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
    .filter(event => new Date(event.date) < now)
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
</script>

<template>
  <div>
    <Hero height="small" fallback-class="bg-brand-dark-900">
      <template #content>
        <div class="text-center">
          <h1 class="text-3xl sm:text-5xl font-bold text-white mb-4 font-heading">
            Club-Veranstaltungen
          </h1>
          <p class="text-xl text-gray-300">
            Das ist bei uns im Club los. Komm vorbei!
          </p>
        </div>
      </template>
    </Hero>

    <Section>
      <div class="max-w-4xl mx-auto">
        <Headline
          :title="`Unsere Events ${currentYear}`"
          :description="eventCountDescription"
          tag="h2"
          size="h2"
          alignment="center"
          margin-bottom="lg"
        />
      </div>
    </Section>


    <Section
      v-if="upcomingEvents.length > 0"
      variant="secondary-light"
      rounded
      outer-container
      overlap-bottom
      padding-top="sm"
      padding-bottom="xs"
      padding-left="md"
      padding-right="md"
      class="relative z-10"
    >
      <div v-if="Object.keys(upcomingEventsByMonth).length > 0">
        <EventList
          v-for="(monthlyEvents, month) in upcomingEventsByMonth"
          :key="month"
          :month="month"
          :events="monthlyEvents"
        />
      </div>
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
      padding-left="md"
      padding-right="md"
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
