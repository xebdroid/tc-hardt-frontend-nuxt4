import type { Event } from '~/types'

const HOME_LOCATION_KEYWORDS = ['clubhaus', 'anlage', 'tc hardt']

/**
 * Parst ein deutsches Datum ("DD.MM.YYYY") oder ISO-Datum in einen Unix-Timestamp (ms).
 */
export function parseGermanDate(dateStr?: string | null): number {
  if (!dateStr) return 0
  if (dateStr.includes('.')) {
    const parts = dateStr.split('.').map(Number)
    if (parts.length === 3) {
      const [day = 1, month = 1, year = 2000] = parts
      return new Date(year, month - 1, day).getTime()
    }
  }
  const parsed = new Date(dateStr).getTime()
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Prüft, ob ein Termin-Datum noch offen ("tba") oder ungültig ist.
 */
export function isTbaDate(dateStr?: string | null): boolean {
  if (!dateStr || dateStr.trim().toLowerCase() === 'tba') return true
  return isNaN(new Date(dateStr).getTime())
}

/**
 * Konvertiert ein Datum ("YYYY-MM-DD") und eine Uhrzeit ("HH:MM") in das UTC-Kalenderformat "YYYYMMDDTHHMMSSZ".
 */
export function toCalendarUtc(dateString: string, timeString: string = '09:00'): string {
  const [hours = 9, minutes = 0] = timeString.split(':').map(Number)
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  date.setUTCHours(hours - 2)
  date.setUTCMinutes(minutes)
  date.setUTCSeconds(0)
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/**
 * Berechnet Start- und Endzeitpunkt im UTC-Kalenderformat für ein Event.
 */
export function getEventCalendarUtcRange(event: Event, defaultDurationHours: number = 1): { startDate: string; endDate: string } {
  const cleanTimeString = (ts: string) => ts.replace('Uhr', '').trim()
  const startTime = event.time ? cleanTimeString(event.time.split('–')[0] || '09:00') : '09:00'

  let endTime: string
  if (event.time && event.time.includes('–')) {
    endTime = cleanTimeString(event.time.split('–')[1] || '10:00')
  } else {
    const startHour = parseInt(startTime.split(':')[0] || '9', 10)
    endTime = `${startHour + defaultDurationHours}:00`
  }

  return {
    startDate: toCalendarUtc(event.date, startTime),
    endDate: toCalendarUtc(event.dateEnd || event.date, endTime)
  }
}

/**
 * Prüft, ob ein Event auf der Vereinsanlage stattfindet, und gibt die passende Adresse zurück.
 */
export function resolveEventLocation(location?: string | null, clubAddress: string = 'Birkmannsweg 16, 41169 Mönchengladbach') {
  const locationLower = location?.toLowerCase() || ''
  const isAtHome = HOME_LOCATION_KEYWORDS.some(keyword => locationLower.includes(keyword))
  return {
    isAtHome,
    address: isAtHome ? clubAddress : (location || '')
  }
}
