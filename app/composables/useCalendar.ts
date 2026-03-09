// app/composables/useCalendar.ts
import { computed } from 'vue'
import type { Event } from '~/types'
import { useI18n } from 'vue-i18n'
import db from '~/assets/data/db.json'

export function useCalendar(event: Event) {
  const { t } = useI18n()
  // Helper to format dates for calendar links (YYYYMMDDTHHMMSSZ)
  // We'll assume a default time if not provided, e.g., 9am for start, 10am for end.
  // Timezone is assumed to be Europe/Berlin.
  const toUTC = (dateString: string, timeString: string = '09:00'): string => {
    const [hours, minutes] = timeString.split(':').map(Number)
    const date = new Date(dateString)
    date.setUTCHours(hours - 2) // Adjust for CEST to UTC
    date.setUTCMinutes(minutes)
    date.setUTCSeconds(0)
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const googleLink = computed(() => {
    const cleanTimeString = (ts: string) => ts.replace('Uhr', '').trim()
    const startTime = event.time ? cleanTimeString(event.time.split('–')[0]) : '09:00'
    let endTime: string;
    if (event.time && event.time.includes('–')) {
      endTime = cleanTimeString(event.time.split('–')[1])
    } else {
      endTime = (parseInt(startTime.split(':')[0]) + 1).toString() + ':00'
    }

    const startDate = toUTC(event.date, startTime)
    const endDate = toUTC(event.dateEnd || event.date, endTime)

    const atHomeKeywords = ['clubhaus', 'anlage', 'tc hardt']
    const locationString = event.location?.toLowerCase() || ''
    const isAtHome = atHomeKeywords.some(keyword => locationString.includes(keyword))
    const location = isAtHome ? db.clubInfo.address : event.location

    const url = new URL('https://www.google.com/calendar/render')
    url.searchParams.append('action', 'TEMPLATE')
    url.searchParams.append('text', event.title)
    url.searchParams.append('dates', `${startDate}/${endDate}`)
    url.searchParams.append('details', event.description || '')
    url.searchParams.append('location', location || '')
    return url.toString()
  })

  const icsContent = computed(() => {
    const cleanTimeString = (ts: string) => ts.replace('Uhr', '').trim()
    const startTime = event.time ? cleanTimeString(event.time.split('–')[0]) : '09:00'
    let endTime: string;
    if (event.time && event.time.includes('–')) {
      endTime = cleanTimeString(event.time.split('–')[1])
    } else {
      endTime = (parseInt(startTime.split(':')[0]) + 1).toString() + ':00'
    }

    const startDate = toUTC(event.date, startTime)
    const endDate = toUTC(event.dateEnd || event.date, endTime)

    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `URL:${process.client ? document.location.href : 'http://tc-hardt.de'}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || ''}`,
      `LOCATION:${event.location || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\\n')

    return `data:text/calendar;charset=utf8,${encodeURIComponent(content)}`
  })

  const calendarOptions = computed(() => [
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
      download: `${(event as any).slug}.ics`
    }
  ])

  return {
    calendarOptions
  }
}
