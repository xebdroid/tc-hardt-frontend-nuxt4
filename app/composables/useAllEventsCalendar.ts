// app/composables/useAllEventsCalendar.ts
import db from '~/assets/data/db.json'
import type { Event } from '~/types'

export function useAllEventsCalendar() {
  const generateIcsContent = () => {
    const now = new Date()
    const upcomingEvents = [...db.events]
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const toUTC = (dateString: string, timeString: string = '09:00'): string => {
      const [hours, minutes] = timeString.split(':').map(Number)
      const date = new Date(dateString)
      // Hinweis: Diese Logik geht fest von Sommerzeit (CEST, UTC+2) aus.
      // Für eine ganzjährige Lösung müsste man die Zeitverschiebung dynamisch ermitteln.
      date.setUTCHours(hours - 2)
      date.setUTCMinutes(minutes)
      date.setUTCSeconds(0)
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const eventEntries = upcomingEvents.map(event => {
      const cleanTimeString = (ts: string) => ts.replace('Uhr', '').trim()
      const startTime = event.time ? cleanTimeString(event.time.split('–')[0]) : '09:00'
      let endTime: string;
      if (event.time && event.time.includes('–')) {
        endTime = cleanTimeString(event.time.split('–')[1])
      } else {
        endTime = (parseInt(startTime.split(':')[0]) + 2).toString() + ':00'
      }

      const startDate = toUTC(event.date, startTime)
      const endDate = toUTC(event.dateEnd || event.date, endTime)

      const atHomeKeywords = ['clubhaus', 'anlage', 'tc hardt']
      const locationString = event.location?.toLowerCase() || ''
      const isAtHome = atHomeKeywords.some(keyword => locationString.includes(keyword))
      const location = isAtHome ? (db as any).clubInfo?.address : event.location

      // WICHTIG: Nutze einfache Backslashes für echte Zeilenumbrüche \r\n
      return [
        'BEGIN:VEVENT',
        `URL:${process.client ? window.location.origin : 'https://tc-hardt.de'}`,
        `UID:${event.id}@tc-hardt.de`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
        `LOCATION:${location || ''}`,
        'END:VEVENT'
      ].join('\r\n')
    }).join('\r\n')

    const calendarContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TC Hardt//Website//DE',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:TC Hardt Termine',
      'X-WR-TIMEZONE:Europe/Berlin',
      eventEntries,
      'END:VCALENDAR'
    ].join('\r\n')

    return calendarContent
  }

  const downloadAllIcs = () => {
    if (!process.client) return

    const content = generateIcsContent()
    // Erstellung eines Blobs für bessere Safari-Kompatibilität
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'tc-hardt-termine.ics')

    document.body.appendChild(link)
    link.click()

    // Aufräumen
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return {
    downloadAllIcs
  }
}
