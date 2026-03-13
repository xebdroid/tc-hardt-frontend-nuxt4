import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false)
  const hasFullScreenHero = ref(false)

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  function openMobileMenu() {
    isMobileMenuOpen.value = true
  }

  function setFullScreenHero(value: boolean) {
    hasFullScreenHero.value = value
  }

  return {
    isMobileMenuOpen,
    hasFullScreenHero,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    setFullScreenHero
  }
})
