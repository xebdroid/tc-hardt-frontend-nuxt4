import db from '~/assets/data/db.json'
import type { Event } from '~/types'
import { isTbaDate, getEventCalendarUtcRange, resolveEventLocation } from '~/utils/date'

export function useAllEventsCalendar() {
  const generateIcsContent = () => {
    const now = new Date()
    const upcomingEvents = [...db.events]
      .filter(event => !isTbaDate(event.date) && new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const eventEntries = upcomingEvents.map((event) => {
      const { startDate, endDate } = getEventCalendarUtcRange(event as Event, 2)
      const { address } = resolveEventLocation(event.location, db.clubInfo?.address)

      return [
        'BEGIN:VEVENT',
        `URL:${import.meta.client ? window.location.origin : 'https://tc-hardt.de'}`,
        `UID:${event.id}@tc-hardt.de`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
        `LOCATION:${address}`,
        'END:VEVENT'
      ].join('\r\n')
    })

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TC Hardt//NONSGML v1.0//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      ...eventEntries,
      'END:VCALENDAR'
    ].join('\r\n')
  }

  const downloadAllIcs = () => {
    if (import.meta.server) return

    const content = generateIcsContent()
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'tc-hardt-termine.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    downloadAllIcs
  }
}
