import { defineStore } from 'pinia'

interface ConsentState {
  necessary: boolean
  maps: boolean
  analytics: boolean // NEU: Feld für Statistik-Tracking
}

export const useConsentStore = defineStore('consent', () => {

  // 1. Das Einstellungs-Cookie (Speichert WAS erlaubt ist)
  const cookie = useCookie<ConsentState>('cookie-consent', {
    default: () => ({ necessary: true, maps: false, analytics: false }), // NEU: Default auf false
    maxAge: 60 * 60 * 24 * 365, // 1 Jahr
    sameSite: 'lax',
    path: '/',
  })

  // 2. Status ob schon gewählt wurde (wird direkt aus document.cookie gelesen)
  const hasDecided = computed(() => {
    if (import.meta.server) return false
    return document.cookie.split(';').some(c => c.trim().startsWith('cookie-decided=') && c.includes('true'))
  })

  // 3. Modal State (Initial immer zu, um SSR-Flackern zu vermeiden)
  const isModalOpen = ref(false)

  // 4. Getter
  const isMapsAllowed = computed(() => cookie.value.maps)
  const isAnalyticsAllowed = computed(() => cookie.value.analytics) // NEU: Getter

  // 5. Actions
  function acceptAll() {
    cookie.value.maps = true
    cookie.value.analytics = true // NEU
    _finalize()
  }

  function saveSettings(settings: { maps: boolean, analytics: boolean }) { // NEU: Parameter erweitert
    cookie.value.maps = settings.maps
    cookie.value.analytics = settings.analytics // NEU
    _finalize()
  }

  function declineAll() {
    cookie.value.maps = false
    cookie.value.analytics = false // NEU
    _finalize()
  }

  function openModal() {
    isModalOpen.value = true
  }

  // Interne Funktion zum Schließen & Speichern des Status
  function _finalize() {
    isModalOpen.value = false

    if (import.meta.client) {
      const maxAge = 60 * 60 * 24 * 365
      document.cookie = `cookie-decided=true; path=/; max-age=${maxAge}; samesite=lax`
    }
  }

  return {
    isModalOpen,
    isMapsAllowed,
    isAnalyticsAllowed, // NEU: Exportiert
    hasDecided,
    acceptAll,
    saveSettings,
    declineAll,
    openModal
  }
})
