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
    watch: true // State Änderungen landen automatisch im Cookie
  })

  // 2. Das Status-Cookie (Speichert OB schon gewählt wurde)
  const hasDecided = useCookie<boolean>('cookie-decided', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365
  })

  // 3. Modal State (Initial offen, wenn noch nicht entschieden)
  const isModalOpen = ref(!hasDecided.value)

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
    hasDecided.value = true
    isModalOpen.value = false
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
