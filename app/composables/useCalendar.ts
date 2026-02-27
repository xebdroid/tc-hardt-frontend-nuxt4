// app/composables/useCalendar.ts
import { computed } from 'vue'
import type { Event } from '~/types'

export function useCalendar(event: Event) {
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

    const url = new URL('https://www.google.com/calendar/render')
    url.searchParams.append('action', 'TEMPLATE')
    url.searchParams.append('text', event.title)
    url.searchParams.append('dates', `${startDate}/${endDate}`)
    url.searchParams.append('details', event.description || '')
    url.searchParams.append('location', event.location || '')
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
      label: 'Google Calendar',
      icon: 'i-simple-icons-googlecalendar',
      to: googleLink.value,
      target: '_blank'
    },
    {
      label: 'Download .ics',
      icon: 'i-heroicons-arrow-down-tray',
      to: icsContent.value,
      download: `event-${event.id}.ics`
    }
  ])

  return {
    calendarOptions
  }
}
