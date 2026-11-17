<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: [String, Date],
    default: null
  },
  dateEnd: {
    type: [String, Date],
    default: null
  },
  dateString: {
    type: String,
    default: ''
  },
  variant: {
    type: String as () => 'default' | 'jubilee',
    default: 'default'
  }
})

const months = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']

const parseDate = (dateInput: string | Date) => {
  if (!dateInput) return { day: '00', month: '???', year: '0000' }
  if (typeof dateInput === 'string' && dateInput.trim().toLowerCase() === 'tba') {
    return { day: 'TBA', month: 'TERMIN', year: 'OFFEN' }
  }
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) {
    return { day: 'TBA', month: 'TERMIN', year: 'OFFEN' }
  }
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: months[date.getMonth()],
    year: date.getFullYear().toString()
  }
}

const startDate = computed(() => parseDate(props.date))
const endDate = computed(() => props.dateEnd ? parseDate(props.dateEnd) : null)

const defaultDates = computed(() => {
  const dates = [startDate.value]
  if (endDate.value) {
    dates.push(endDate.value)
  }
  return dates
})

const parsedJubileeDate = computed(() => {
  if (!props.dateString) {
    return {
      type: 'single',
      day: '00',
      month: '???',
      year: '0000'
    }
  }

  if (props.dateString.includes('–')) {
    const [start, end] = props.dateString.split('–').map(s => s.trim())
    const startParts = start.split('.')
    const endParts = end.split('.')
    return {
      type: 'range',
      startDay: startParts[0],
      startMonth: months[parseInt(startParts[1], 10) - 1],
      endDay: endParts[0],
      endMonth: months[parseInt(endParts[1], 10) - 1],
      year: endParts[2]
    }
  }

  if (props.dateString.includes('/')) {
    const parts = props.dateString.split('.')
    const days = parts[0]
    const [day1, day2] = days.split('/')
    return {
      type: 'multiday',
      day1,
      day2,
      month: months[parseInt(parts[1], 10) - 1],
      year: parts[2]
    }
  }

  const parts = props.dateString.split('.')
  return {
    type: 'single',
    day: parts[0],
    month: months[parseInt(parts[1], 10) - 1],
    year: parts[2]
  }
})
</script>

<template>
  <!-- Jubilee Variant -->
  <div v-if="variant === 'jubilee'" class="event-date is-jubilee">
    <div class="jubilee-col">
      <div v-if="parsedJubileeDate.type === 'single'" class="jubilee-row">
        <span class="jubilee-highlight">{{ parsedJubileeDate.day }}.</span>
        <span class="jubilee-highlight">{{ parsedJubileeDate.month }}</span>
      </div>
      <div v-else-if="parsedJubileeDate.type === 'multiday'" class="jubilee-row">
        <span class="jubilee-highlight">{{ parsedJubileeDate.day1 }}/{{ parsedJubileeDate.day2 }}.</span>
        <span class="jubilee-highlight">{{ parsedJubileeDate.month }}</span>
      </div>
      <div v-else-if="parsedJubileeDate.type === 'range'" class="jubilee-row is-range">
        <span class="jubilee-highlight">{{ parsedJubileeDate.startDay }}. {{ parsedJubileeDate.startMonth }}</span>
        <span class="jubilee-arrow">→</span>
        <span class="jubilee-highlight">{{ parsedJubileeDate.endDay }}. {{ parsedJubileeDate.endMonth }}</span>
      </div>
      <div class="jubilee-year">
        {{ parsedJubileeDate.year }}
      </div>
    </div>
  </div>

  <!-- Default Variant -->
  <div v-else-if="variant === 'default'" class="event-date is-default">
    <template v-for="(dateItem, index) in defaultDates" :key="index">
      <div v-if="index > 0" class="date-sep">
        -
      </div>
      <div class="date-block">
        <div class="day">
          {{ dateItem.day }}
        </div>
        <div class="month-year">
          <div class="month">
            {{ dateItem.month }}
          </div>
          <div class="year">
            {{ dateItem.year }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.event-date {
  &.is-jubilee {
    margin-bottom: var(--space-4);
    text-align: center;
  }

  &.is-default {
    display: flex;
    align-items: center;
  }
}

.jubilee-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.jubilee-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;

  &.is-range {
    gap: 0.75rem;
  }
}

.jubilee-highlight {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  color: var(--color-accent-500);

  @include dark {
    color: var(--color-accent-400);
  }
}

.jubilee-arrow {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-gray-400);
}

.jubilee-year {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-gray-500);
  margin-top: 0.25rem;
}

.date-sep {
  margin-inline: 0.5rem;
  color: var(--color-gray-300);
  font-size: 1.5rem;
  font-weight: 300;

  @include up("md") {
    font-size: 1.875rem;
  }

  @include dark {
    color: var(--color-gray-600);
  }
}

.date-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.day {
  font-size: 1.875rem;
  font-weight: 800;
  color: var(--color-accent-500);
  line-height: 1;
  margin-top: -0.25rem;

  @include up("md") {
    font-size: 2.25rem;
  }

  @include dark {
    color: var(--color-accent-400);
  }
}

.month-year {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.month {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-800);
  line-height: 1.25;

  @include up("md") {
    font-size: 0.875rem;
  }

  @include dark {
    color: var(--color-white);
  }
}

.year {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-gray-400);
  line-height: 1.25;

  @include up("md") {
    font-size: 0.875rem;
  }

  @include dark {
    color: var(--color-gray-500);
  }
}
</style>
