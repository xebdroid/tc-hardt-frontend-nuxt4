<script setup lang="ts">
import EventItem from './EventItem.vue'
import type { Event } from '~/types'

defineProps({
  month: {
    type: String,
    required: true
  },
  events: {
    type: Array as () => Event[],
    required: true
  }
})
</script>

<template>
  <div class="mb-12">
    <h2 class="text-3xl font-bold text-brand-dark-900 dark:text-white mb-6 font-heading">
      {{ month }}
    </h2>
    <div class="space-y-4">
      <EventItem
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>
