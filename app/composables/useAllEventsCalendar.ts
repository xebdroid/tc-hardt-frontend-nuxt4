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
      date.setUTCHours(hours - 2) // Adjust for CEST to UTC
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
        endTime = (parseInt(startTime.split(':')[0]) + 2).toString() + ':00' // Assume 2 hour duration if no end time
      }

      const startDate = toUTC(event.date, startTime)
      const endDate = toUTC(event.dateEnd || event.date, endTime)

      const atHomeKeywords = ['clubhaus', 'anlage', 'tc hardt']
      const locationString = event.location?.toLowerCase() || ''
      const isAtHome = atHomeKeywords.some(keyword => locationString.includes(keyword))
      const location = isAtHome ? db.clubInfo.address : event.location

      return [
        'BEGIN:VEVENT',
        `URL:${process.client ? document.location.origin : 'http://tc-hardt.de'}`,
        `UID:${event.id}@tc-hardt.de`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description || ''}`,
        `LOCATION:${location || ''}`,
        'END:VEVENT'
      ].join('\\r\\n')
    }).join('\\r\\n')

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
    ].join('\\r\\n')

    return `data:text/calendar;charset=utf8,${encodeURIComponent(calendarContent)}`
  }

  const downloadAllIcs = () => {
    const dataUri = generateIcsContent()
    const link = document.createElement('a')
    link.href = dataUri
    link.setAttribute('download', 'tc-hardt-termine.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    downloadAllIcs
  }
}
