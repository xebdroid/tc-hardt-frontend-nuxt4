import { defineStore } from 'pinia'

interface ConsentState {
  necessary: boolean
  maps: boolean
}

export const useConsentStore = defineStore('consent', () => {

  // 1. Das Einstellungs-Cookie (Speichert WAS erlaubt ist)
  const cookie = useCookie<ConsentState>('cookie-consent', {
    default: () => ({ necessary: true, maps: false }),
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

  // 5. Actions
  function acceptAll() {
    cookie.value.maps = true
    _finalize()
  }

  function saveSettings(settings: { maps: boolean }) {
    cookie.value.maps = settings.maps
    _finalize()
  }

  function declineAll() {
    cookie.value.maps = false
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
    hasDecided,
    acceptAll,
    saveSettings,
    declineAll,
    openModal
  }
})
