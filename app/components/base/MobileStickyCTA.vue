<script setup lang="ts">
import Button from '~/components/base/Button.vue'

const props = defineProps<{
  isMenuOpen: boolean
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// Scroll-State für den Back-to-Top Teil
const scrollY = ref(0)
const isScrollVisible = computed(() => scrollY.value > 400)

function handleScroll() {
  scrollY.value = window.scrollY
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Seiten, auf denen der MITGLIED-CTA NICHT erscheinen soll
const blacklistedPages = ['membership', 'imprint', 'privacy']
const isBlacklisted = computed(() => {
  const currentName = route.name?.toString() || ''
  return blacklistedPages.some(page => currentName.includes(page))
})

/**
 * Sichtbarkeits-Logik
 */
// Soll der Mitglied-CTA generell sichtbar sein?
const showCta = computed(() => {
  if (props.isMenuOpen || isBlacklisted.value) return false
  if (route.name?.toString().includes('index')) return scrollY.value > 200
  return true
})

// Soll der Back-to-Top generell sichtbar sein?
const showBackToTop = computed(() => {
  if (props.isMenuOpen) return false
  return isScrollVisible.value
})
</script>

<template>
  <div class="sm:hidden">
    <!-- Stabiler Container ohne eigene Transition -->
    <div class="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
      <div class="flex items-center justify-end max-w-md mx-auto pointer-events-auto overflow-visible">
        
        <!-- Haupt CTA: Mitglied werden (Rein mechanisches Rausgleiten) -->
        <div 
          class="relative flex-1 group transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
          :class="[
            showCta ? 'translate-x-0' : '-translate-x-[120%] pointer-events-none'
          ]"
        >
          <div class="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative bg-white/90 dark:bg-gray-900/90 border border-white dark:border-gray-800 rounded-full p-1 shadow-xl backdrop-blur-md">
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

        <!-- Dynamischer Spacer: Hält Back-to-Top rechts, wenn CTA ausgeblendet ist -->
        <div 
          class="transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
          :class="[ (!showCta && !isMenuOpen) ? 'flex-1' : 'w-0' ]"
        />

        <!-- Back to Top Wrapper: Rein mechanisches Rausgleiten + Drehung -->
        <div 
          class="transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-end overflow-visible"
          :class="[
            showBackToTop ? 'w-12 ml-3 rotate-0 translate-x-0' : 'w-0 ml-0 rotate-180 translate-x-32 pointer-events-none'
          ]"
        >
          <div class="relative group shrink-0">
            <div class="absolute -inset-1 bg-gray-400 rounded-full blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
            <div class="relative bg-white/90 dark:bg-gray-900/90 border border-white dark:border-gray-800 rounded-full p-1 shadow-xl backdrop-blur-md">
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
</template>
