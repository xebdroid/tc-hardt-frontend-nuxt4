<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Event } from '~/types'
import { UButton } from '#components'
import EventDetailModal from '~/components/events/EventDetailModal.vue'

const props = defineProps<{
  events: Event[]
}>()

const selectedEvent = ref<Event | null>(null)

const currentDate = ref(new Date())

const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

const monthName = computed(() => {
  return currentDate.value.toLocaleString('de-DE', { month: 'long', year: 'numeric' })
})

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)

  let startingDayOfWeek = firstDay.getDay()
  // Make Monday = 0, Sunday = 6
  startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

  const daysInMonth = lastDay.getDate()

  const days = []

  // Empty slots
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ empty: true })
  }

  // Days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)

    // Find events for this date
    const dayEvents = props.events.filter(e => {
       const currentStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`

       if (e.dateEnd) {
         return currentStr >= e.date && currentStr <= e.dateEnd
       }
       return currentStr === e.date
    })

    days.push({
      empty: false,
      date: i,
      fullDate: date,
      events: dayEvents
    })
  }

  return days
})

const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const todayString = new Date().toISOString().split('T')[0]

const isToday = (dayDate: number) => {
  const currentStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(dayDate).padStart(2, '0')}`
  return currentStr === todayString
}

const selectEvent = (event: Event) => {
  selectedEvent.value = event
}
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 md:p-8 overflow-hidden">

    <div>
      <div class="flex justify-between items-center mb-6 md:mb-8">
        <h2 class="text-xl sm:text-3xl md:text-4xl font-bold text-brand-dark-900 dark:text-white capitalize">{{ monthName }}</h2>
        <div class="flex items-center gap-2 sm:gap-4 bg-gray-50 dark:bg-gray-800 p-1 rounded-full">
          <UButton icon="i-heroicons-chevron-left" variant="ghost" color="gray" class="rounded-full" @click="prevMonth" />
          <UButton icon="i-heroicons-chevron-right" variant="ghost" color="gray" class="rounded-full" @click="nextMonth" />
        </div>
      </div>

      <!-- Mobile: List View for Current Month, Desktop: Calendar Grid -->
      <div class="block md:hidden">
        <div class="space-y-4">
          <template v-for="(day, idx) in calendarDays" :key="'mobile-' + idx">
            <div v-if="!day.empty && day.events && day.events.length > 0" class="border rounded-2xl p-4 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50" :class="[isToday(day.date as number) ? 'ring-2 ring-brand-light-500 bg-brand-light-50 dark:bg-brand-light-900/20 border-brand-light-200 dark:border-brand-light-800' : '']">
              <div class="flex items-center gap-3 mb-3">
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold" :class="[isToday(day.date as number) ? 'bg-brand-light-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200']">
                  {{ day.date }}
                </span>
                <span class="font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                  {{ weekDays[(new Date(currentYear, currentMonth, day.date as number).getDay() + 6) % 7] }}
                </span>
              </div>
              <div class="flex flex-col gap-2">
                <div
                  v-for="event in day.events"
                  :key="event.id"
                  class="flex flex-col text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 p-3 rounded-xl cursor-pointer hover:border-brand-light-400 active:scale-[0.98] transition-all shadow-sm"
                  @click.stop="selectEvent(event)"
                >
                  <span v-if="event.time" class="font-bold text-brand-light-600 dark:text-brand-light-400 mb-1">{{ event.time.split(' ')[0] }}</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ event.title }}</span>
                </div>
              </div>
            </div>
          </template>

          <div v-if="calendarDays.filter(d => !d.empty && d.events && d.events.length > 0).length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            Keine Termine in diesem Monat.
          </div>
        </div>
      </div>

      <!-- Desktop Calendar Grid -->
      <div class="hidden md:block">
        <!-- Wochentage -->
        <div class="grid grid-cols-7 gap-3 text-center mb-3">
          <div v-for="day in weekDays" :key="day" class="font-bold text-gray-400 dark:text-gray-500 text-sm tracking-wider uppercase">
            {{ day }}
          </div>
        </div>

        <!-- Kalender Matrix -->
        <div class="grid grid-cols-7 gap-3">
          <div
            v-for="(day, idx) in calendarDays"
            :key="idx"
            class="min-h-[140px] border rounded-2xl p-2 flex flex-col transition-all duration-200"
            :class="[
              day.empty ? 'bg-transparent border-transparent' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 hover:border-brand-light-300 dark:hover:border-brand-light-700',
              !day.empty && isToday(day.date as number) ? 'ring-2 ring-brand-light-500 bg-brand-light-50 dark:bg-brand-light-900/20 border-brand-light-200 dark:border-brand-light-800' : ''
            ]"
          >
            <template v-if="!day.empty">
              <div class="flex justify-between items-start mb-2">
                <span
                  class="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold"
                  :class="[
                    isToday(day.date as number) ? 'bg-brand-light-500 text-white' : 'text-gray-600 dark:text-gray-300',
                    day.events && day.events.length > 0 && !isToday(day.date as number) ? 'text-brand-dark-900 dark:text-white' : ''
                  ]"
                >
                  {{ day.date }}
                </span>
              </div>

              <div class="flex flex-col gap-1.5 flex-1 overflow-y-auto no-scrollbar custom-scrollbar">
                <div
                  v-for="event in day.events"
                  :key="event.id"
                  class="group flex flex-col text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-lg text-left leading-snug cursor-pointer hover:border-brand-light-400 hover:shadow-md transition-all active:scale-95"
                  :title="event.title"
                  @click.stop="selectEvent(event)"
                >
                  <span v-if="event.time" class="font-bold text-brand-light-600 dark:text-brand-light-400 mb-0.5">{{ event.time.split(' ')[0] }}</span>
                  <span class="font-medium truncate group-hover:text-brand-dark-900 dark:group-hover:text-white transition-colors">{{ event.title }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <EventDetailModal
      v-if="selectedEvent"
      :event="selectedEvent"
      @close="selectedEvent = null"
    />

  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Optional: Dezenten Scrollbar für Desktop zeigen, wenn es scrollt */
@media (min-width: 768px) {
  .custom-scrollbar::-webkit-scrollbar {
    display: block;
    height: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 10px;
  }
}
</style>
