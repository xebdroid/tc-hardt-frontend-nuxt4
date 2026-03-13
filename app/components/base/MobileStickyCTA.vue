<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import { useUIStore } from '~/stores/ui'

const props = defineProps<{
  isMenuOpen: boolean
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const uiStore = useUIStore()

// Scroll-State
const scrollY = ref(0)
const isMounted = ref(false)
const isScrollVisible = computed(() => scrollY.value > 400)

function handleScroll() {
  scrollY.value = window.scrollY
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Sofortiger Reset bei Navigation
watch(() => route.fullPath, () => {
  scrollY.value = 0
}, { immediate: true })

onMounted(() => {
  isMounted.value = true
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Konfiguration: Welche Seiten haben einen großen Hero?
// (Nutzt die Namen aus der nuxt.config / i18n)
const pagesWithLargeHero = ['index', 'jubilee']

const hasHero = computed(() => {
  const currentName = route.name?.toString() || ''
  return pagesWithLargeHero.some(p => currentName.includes(p))
})

// Blacklist Logik
const blacklistedPages = ['membership', 'imprint', 'privacy']
const isBlacklisted = computed(() => {
  const currentName = route.name?.toString() || ''
  return blacklistedPages.some(page => currentName.includes(page))
})

/**
 * SICHTBARKEITS-LOGIK
 */

// 1. Soll der Mitglied-CTA angezeigt werden?
const showCta = computed(() => {
  if (!isMounted.value || props.isMenuOpen || isBlacklisted.value) return false
  
  // Wenn die Seite einen großen Hero hat, erst nach 200px zeigen
  if (hasHero.value && scrollY.value <= 200) return false
  
  return true
})

// 2. Soll der Back-to-Top angezeigt werden?
const showBackToTop = computed(() => {
  if (!isMounted.value || props.isMenuOpen) return false
  return isScrollVisible.value
})
</script>

<template>
  <div class="sm:hidden">
    <div class="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
      <div class="flex items-center justify-end max-w-md mx-auto overflow-visible">
        
        <!-- 1. Haupt CTA: Mitglied werden -->
        <div class="relative flex-1">
          <div 
            class="relative group transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
            :class="[
              showCta ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
            ]"
          >
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div class="relative bg-white/90 dark:bg-gray-900/90 border border-white dark:border-gray-800 rounded-full p-1 shadow-xl backdrop-blur-md pointer-events-auto">
              <Button
                :to="localePath('membership')"
                :label="$t('nav.buttons.membership')"
                variant="primary"
                block
                size="lg"
                class="rounded-full py-3"
                icon="i-heroicons-user-plus"
              />
            </div>
          </div>
        </div>

        <!-- 2. Dynamischer Spacer -->
        <div 
          class="transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
          :class="[ (!showCta && !props.isMenuOpen) ? 'flex-1' : 'w-0' ]"
        />

        <!-- 3. Back to Top Wrapper -->
        <div 
          class="transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-end overflow-visible"
          :class="[
            showBackToTop ? 'w-12 ml-3 opacity-100' : 'w-0 ml-0 opacity-0 pointer-events-none'
          ]"
        >
          <div 
            class="shrink-0 transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
            :class="showBackToTop ? 'translate-x-0 rotate-0' : 'translate-x-20 rotate-180'"
          >
            <div class="relative group">
              <div class="absolute -inset-1 bg-gray-400 rounded-full blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
              <div class="relative bg-white/90 dark:bg-gray-900/90 border border-white dark:border-gray-800 rounded-full p-1 shadow-xl backdrop-blur-md pointer-events-auto">
                <button
                  class="w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark-900 text-white shadow-sm hover:bg-brand-dark-800 transition-all active:scale-95"
                  aria-label="Nach oben scrollen"
                  @click="scrollToTop"
                >
                  <UIcon name="i-heroicons-arrow-up" class="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
