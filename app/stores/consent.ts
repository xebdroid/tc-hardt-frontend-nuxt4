// stores/consent.ts
import { defineStore } from 'pinia'

interface ConsentState {
  necessary: boolean
  maps: boolean
}

export const useConsentStore = defineStore('consent', () => {

  // 1. DAS COOKIE (Speichert die Entscheidung dauerhaft)
  const cookie = useCookie<ConsentState>('cookie-consent', {
    default: () => ({ necessary: true, maps: false }),
    maxAge: 60 * 60 * 24 * 365, // 1 Jahr gültig
    watch: true // Änderungen am State speichern automatisch ins Cookie
  })

  // 2. ENTSCHEIDUNGS-STATUS (Wurde schon gewählt?)
  const hasDecided = useCookie<boolean>('cookie-decided', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365
  })

  // 3. MODAL STATE (Offen, wenn noch keine Entscheidung getroffen wurde)
  const isModalOpen = ref(!hasDecided.value)

  // 4. GETTER
  const isMapsAllowed = computed(() => cookie.value.maps)

  // 5. ACTIONS
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

  // Interne Funktion zum Speichern und Schließen
  function _finalize() {
    hasDecided.value = true
    isModalOpen.value = false
  }

  return {
    isModalOpen,
    isMapsAllowed,
    acceptAll,
    saveSettings,
    declineAll,
    openModal
  }
})
