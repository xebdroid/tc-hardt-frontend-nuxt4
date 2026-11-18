import { computed } from 'vue'
import type { Event } from '~/types'
import { useI18n } from 'vue-i18n'
import db from '~/assets/data/db.json'
import { isTbaDate, getEventCalendarUtcRange, resolveEventLocation } from '~/utils/date'

export function useCalendar(event: Event) {
  const { t } = useI18n()

  const isTba = computed(() => isTbaDate(event.date))

  const googleLink = computed(() => {
    const { startDate, endDate } = getEventCalendarUtcRange(event, 1)
    const { address } = resolveEventLocation(event.location, db.clubInfo.address)

    const url = new URL('https://www.google.com/calendar/render')
    url.searchParams.append('action', 'TEMPLATE')
    url.searchParams.append('text', event.title)
    url.searchParams.append('dates', `${startDate}/${endDate}`)
    url.searchParams.append('details', event.description || '')
    url.searchParams.append('location', address)
    return url.toString()
  })

  const icsContent = computed(() => {
    const { startDate, endDate } = getEventCalendarUtcRange(event, 1)

    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:https://tc-hardt.de',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || ''}`,
      `LOCATION:${event.location || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')

    return `data:text/calendar;charset=utf8,${encodeURIComponent(content)}`
  })

  const calendarOptions = computed(() => {
    if (isTba.value) return []
    return [
      {
        label: t('calendar.google'),
        icon: 'i-simple-icons-googlecalendar',
        to: googleLink.value,
        target: '_blank'
      },
      {
        label: t('calendar.download_ics'),
        icon: 'i-heroicons-arrow-down-tray',
        to: icsContent.value,
        download: `${event.slug || event.id}.ics`
      }
    ]
  })

  return {
    calendarOptions
  }
}
