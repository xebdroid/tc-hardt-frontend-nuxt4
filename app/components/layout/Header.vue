<script setup lang="ts">
import InverseCorner from '~/components/layout/InverseCorner.vue'
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'
import HeaderLogo from '~/components/layout/header/Logo.vue'
import HeaderHamburger from '~/components/layout/header/Hamburger.vue'
import Button from '~/components/base/Button.vue'
import HeaderMobileMenu from '~/components/layout/header/MobileMenu.vue'
import { useUIStore } from '~/stores/ui'

import { onMounted, onUnmounted, ref, watch } from 'vue'

const showColorModeButton = ref(false);
const showLanguageSwitch = ref(false);

const { headerMenu, navButtons, socialLinks } = useNavigation()
const route = useRoute()
const uiStore = useUIStore()

const isMobileMenuOpen = computed(() => uiStore.isMobileMenuOpen)
const closeMenu = () => { uiStore.closeMobileMenu() }
const toggleMenu = () => { uiStore.toggleMobileMenu() }

watch(() => route.fullPath, closeMenu)

// Body Scroll Lock, wenn das mobile Menü offen ist
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleResize = () => {
  if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  // Sicherstellen, dass der Scroll-Lock aufgehoben wird, wenn die Komponente unmountet
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="fixed top-0 lg:top-4 left-0 right-0 z-50 pointer-events-none w-full">

    <div
      class="relative lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex justify-center
      before:content-[''] before:block before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2
      before:w-[97px] before:h-[113px] before:rounded-[10px] before:bg-white dark:before:bg-gray-900 before:hidden before:lg:block
      before:shadow-[0_25px_15px_-10px_rgba(0,0,0,0.15)]"
    >

      <InverseCorner class="absolute -left-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block" :angle="0" />
      <InverseCorner class="absolute -right-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block" :angle="-90" />
      <InverseCorner class="hidden lg:block absolute top-0 right-1/2 mr-[48px] w-[26px] h-[26px] top-[72px] text-white dark:text-gray-900" :angle="0" />
      <InverseCorner class="hidden lg:block absolute top-0 left-1/2 ml-[48px] w-[26px] h-[26px] top-[72px] text-white dark:text-gray-900" :angle="-90" />

      <div class="pointer-events-auto w-full bg-white dark:bg-gray-900 rounded-b-3xl px-6 lg:px-8 flex flex-col transition-all duration-300 ease-in-out shadow-xl">

        <div class="w-full flex items-start justify-between shrink-0 relative py-2 lg:py-3">

          <div class="hidden lg:flex flex-1 items-center self-center min-w-0 lg:pr-20">
            <UNavigationMenu
              :items="headerMenu"
              orientation="horizontal"
              content-orientation="vertical"
              class="w-full justify-start"
              :ui="{
                content: 'w-auto min-w-max',
                childLink: 'whitespace-nowrap text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors',
                link: 'text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors'
              }"
            >
              <template #item="{ item }">
                <UIcon
                  v-if="item.icon && !item.noDesktopIcon"
                  :name="item.icon"
                  class="w-5 h-5 shrink-0"
                />
                <span v-if="!item.isHome" class="truncate">{{ item.label }}</span>
                <UIcon
                  v-if="item.children?.length"
                  name="i-heroicons-chevron-down-20-solid"
                  class="w-4 h-4 ml-1 shrink-0 text-brand-dark-800 dark:text-brand-dark-100 group-hover:text-primary-500 dark:group-hover:text-brand-light-400 transition-colors duration-200 group-data-[state=open]:rotate-180"
                />
              </template>
            </UNavigationMenu>
          </div>

          <HeaderLogo class="shrink-0 mx-auto" @click="closeMenu" />

          <div class="flex-1 flex items-center justify-end gap-3 lg:pl-20 self-center">

            <div class="hidden lg:flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-3 mr-1">
              <template v-for="(social, index) in socialLinks" :key="index">
                <UButton
                  v-if="social.icon"
                  :to="social.href"
                  target="_blank"
                  variant="ghost"
                  size="xs"
                  :icon="social.icon"
                  class="text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors"
                />
              </template>

              <UColorModeButton
                v-if="showColorModeButton"
                size="xs"
                variant="ghost"
                :ui="{
                  leadingIcon: 'text-brand-dark-800 dark:text-brand-dark-100 dark:hover:text-brand-light-400 transition-colors'
                }"
              />

              <LanguageSwitcher
                v-if="showLanguageSwitch"
                size="xs"
                variant="ghost"
                class="text-brand-dark-800 dark:text-brand-dark-100 dark:hover:text-brand-light-400 transition-colors"
              />
            </div>

            <div class="flex items-center gap-2">
              <Button
                v-for="(btn, index) in navButtons"
                :key="index"
                class="hidden sm:flex"
                :to="btn.to"
                :label="btn.label"
                :target="btn.target"
                :variant="(btn.variant as any) || 'outline'"
                size="md"
              />
            </div>

            <HeaderHamburger :is-open="isMobileMenuOpen" @toggle="toggleMenu" />

          </div>
        </div>

        <HeaderMobileMenu
          :is-open="isMobileMenuOpen"
          :header-menu="headerMenu"
          :nav-buttons="navButtons"
          :social-links="socialLinks"
          :show-appearance-mode-button="showColorModeButton"
          :show-language-switch="showLanguageSwitch"
          @close="closeMenu"
        />

      </div>
    </div>

    <!-- Backdrop / Overlay für Mobile Menu -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-brand-dark-950/80 dark:bg-black/80 backdrop-blur-sm z-[-1] pointer-events-auto lg:hidden"
        @click="closeMenu"
      />
    </Transition>
  </header>
</template>
