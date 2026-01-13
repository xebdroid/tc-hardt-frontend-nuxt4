<script setup lang="ts">
import InverseCorner from '~/components/layout/InverseCorner.vue'
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'
import HeaderLogo from '~/components/layout/header/Logo.vue'
import HeaderHamburger from '~/components/layout/header/Hamburger.vue'
import HeaderCtaButton from '~/components/layout/header/CtaButton.vue'
import HeaderMobileMenu from '~/components/layout/header/MobileMenu.vue'

import { onMounted, onUnmounted, ref, watch } from 'vue'

const { headerMenu, navButtons, socialLinks } = useNavigation()
const route = useRoute()
const localePath = useLocalePath()

const isMobileMenuOpen = ref(false)
const closeMenu = () => { isMobileMenuOpen.value = false }
const toggleMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }

watch(() => route.fullPath, closeMenu)

const handleScrollOrResize = () => {
  if (isMobileMenuOpen.value) closeMenu()
}

onMounted(() => {
  window.addEventListener('resize', handleScrollOrResize)
  window.addEventListener('scroll', handleScrollOrResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleScrollOrResize)
  window.removeEventListener('scroll', handleScrollOrResize)
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

      <InverseCorner class="absolute -left-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block" :angle="180" />
      <InverseCorner class="absolute -right-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block scale-x-[-1]" :angle="180" />
      <InverseCorner class="hidden lg:block absolute top-0 right-1/2 mr-[48px] w-[26px] h-[26px] top-[72px] text-white dark:text-gray-900" :angle="180" />
      <InverseCorner class="hidden lg:block absolute top-0 left-1/2 ml-[48px] w-[26px] h-[26px] top-[72px] text-white dark:text-gray-900" :angle="90" />

      <div class="pointer-events-auto w-full bg-white dark:bg-gray-900 rounded-b-3xl px-6 lg:px-8 flex flex-col transition-all duration-300 ease-in-out shadow-xl">

        <div class="w-full flex items-start justify-between shrink-0 relative py-2 lg:py-3">

          <div class="hidden lg:flex self-center">
            <UNavigationMenu
              :items="headerMenu"
              highlight
              highlight-color="secondary"
              orientation="horizontal"
              :ui="{
                content: 'min-w-[250px]' /* Verbreitert das Popup */
              }"
            >
              <template #item="{ item }">
                <UIcon
                  v-if="item.icon"
                  :name="item.icon"
                  class="w-5 h-5 shrink-0"
                />
                <span v-if="item.icon !== 'i-heroicons-home'" class="truncate">{{ item.label }}</span>
              </template>
            </UNavigationMenu>
          </div>

          <HeaderLogo @click="closeMenu" />

          <div class="flex items-center gap-3 ml-auto self-center">

            <div class="hidden lg:flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-3 mr-1">
              <template v-for="(social, index) in socialLinks" :key="index">
                <UButton
                  v-if="social.icon"
                  :to="social.href"
                  target="_blank"
                  variant="ghost"
                  size="xs"
                  :icon="social.icon"
                  class="hover:text-primary-500"
                />
              </template>
              <UColorModeButton size="xs" variant="ghost" />
              <LanguageSwitcher
                size="xs"
                variant="ghost"
                color="neutral"
              />
            </div>

            <div class="flex items-center gap-2">
              <HeaderCtaButton
                v-for="(btn, index) in navButtons"
                :key="index"
                class="hidden sm:flex"
                :to="localePath(btn.to)"
                :label="btn.label"
                :target="btn.target"
                :color="btn.color"
                :variant="btn.variant"
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
          @close="closeMenu"
        />

      </div>
    </div>
  </header>
</template>
