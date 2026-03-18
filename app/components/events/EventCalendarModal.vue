<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Event } from '~/types'
import { UModal, UButton } from '#components'
import EventItem from '~/components/events/EventItem.vue'

const props = defineProps<{
  modelValue: boolean
  events: Event[]
}>()

const emit = defineEmits(['update:modelValue'])

const selectedEvent = ref<Event | null>(null)

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    if (!val) {
      setTimeout(() => { selectedEvent.value = null }, 300)
    }
  }
})

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
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'sm:max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl'
    }"
  >
    <template #content>
        <div class="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl min-h-[400px]">

          <div v-if="!selectedEvent">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl sm:text-3xl font-bold text-brand-dark-900 dark:text-white capitalize">{{ monthName }}</h2>
              <div class="flex items-center gap-1 sm:gap-2">
                <UButton icon="i-heroicons-chevron-left" variant="ghost" color="gray" @click="prevMonth" />
                <UButton icon="i-heroicons-chevron-right" variant="ghost" color="gray" @click="nextMonth" />
                <UButton icon="i-heroicons-x-mark" variant="ghost" color="gray" @click="isOpen = false" class="ml-2 sm:ml-4" />
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-2">
              <div v-for="day in weekDays" :key="day" class="font-bold text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {{ day }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1 sm:gap-2">
              <div
                v-for="(day, idx) in calendarDays"
                :key="idx"
                class="min-h-[80px] sm:min-h-[120px] border border-gray-200 dark:border-gray-800 rounded-lg p-1 sm:p-2 flex flex-col transition-colors"
                :class="[
                  day.empty ? 'bg-gray-50 dark:bg-gray-800/30 border-transparent' : 'bg-white dark:bg-gray-800',
                  !day.empty && isToday(day.date) ? 'ring-2 ring-brand-light-500 bg-brand-light-50 dark:bg-brand-light-900/10' : ''
                ]"
              >
                <template v-if="!day.empty">
                  <span
                    class="text-xs sm:text-sm font-semibold mb-1"
                    :class="[
                      isToday(day.date) ? 'text-brand-light-600' : 'text-gray-700 dark:text-gray-300',
                      day.events.length > 0 && !isToday(day.date) ? 'text-brand-dark-900 dark:text-white' : ''
                    ]"
                  >
                    {{ day.date }}
                  </span>
                  <div class="flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
                    <div
                      v-for="event in day.events"
                      :key="event.id"
                      class="text-[10px] sm:text-xs bg-brand-light-100 dark:bg-brand-light-900/30 text-brand-light-800 dark:text-brand-light-300 p-1 rounded truncate text-left leading-tight cursor-pointer hover:bg-brand-light-200 dark:hover:bg-brand-light-900/50 transition-colors"
                      :title="event.title"
                      @click.stop="selectEvent(event)"
                    >
                      <span v-if="event.time" class="font-semibold">{{ event.time.split(' ')[0] }}</span>
                      {{ event.title }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div v-else class="animate-in fade-in zoom-in-95 duration-200">
            <div class="mb-6 flex items-center justify-between">
              <UButton icon="i-heroicons-arrow-left" variant="ghost" color="gray" label="Zurück zum Kalender" @click="selectedEvent = null" />
              <UButton icon="i-heroicons-x-mark" variant="ghost" color="gray" @click="isOpen = false" />
            </div>

            <div class="pointer-events-auto">
              <!-- Die EventItem Komponente nutzen wir direkt zur Detailanzeige -->
              <EventItem :event="selectedEvent" :is-open="true" />
            </div>
          </div>

        </div>
    </template>
  </UModal>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
