<script setup lang="ts">
const { headerMenu, navButtons, socialLinks } = useNavigation()
const route = useRoute()
const localePath = useLocalePath()

const isMobileMenuOpen = ref(false)

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(() => route.fullPath, () => {
  closeMenu()
})

const handleScrollOrResize = () => {
  if (isMobileMenuOpen.value) {
    closeMenu()
  }
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
      before:shadow-[0_15px_20px_-5px_rgba(0,0,0,0.15)]"
    >

      <AppCorner class="absolute -left-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block" :angle="180" />
      <AppCorner class="absolute -right-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block scale-x-[-1]" :angle="180" />


      <AppCorner
        class="hidden lg:block absolute top-0 right-1/2 mr-[48px] w-[26px] h-[26px] top-[72px] text-white dark:text-gray-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
        :angle="180"
      />
      <AppCorner
        class="hidden lg:block absolute top-0 left-1/2 ml-[48px] w-[26px] h-[26px] top-[72px] text-white dark:text-gray-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
        :angle="90"
      />


      <div class="pointer-events-auto w-full bg-white dark:bg-gray-900 rounded-b-3xl px-6 lg:px-8 flex flex-col transition-all duration-300 ease-in-out shadow-xl">

        <div class="w-full flex items-start justify-between shrink-0 relative py-2 lg:py-3">

          <div class="hidden lg:flex self-center">
            <UNavigationMenu
              :items="headerMenu"
              highlight
              highlight-color="secondary"
              orientation="horizontal"
            />
          </div>


          <NuxtLink
            :to="localePath('/')"
            class="flex items-center gap-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10"
            @click="closeMenu"
          >
            <img
              src="/tc-hardt-logo-desktop.svg"
              alt="TC Hardt"
              class="hidden lg:block h-[110px] w-auto transition-all duration-300 -mt-4 relative z-10"
            >

            <div class="lg:hidden flex items-center gap-3">
              <img
                src="/tc-hardt-logo.svg"
                alt="TC Hardt"
                class="h-10 w-auto"
              >
              <div class="flex flex-col leading-tight">
                <span class="font-bold text-xl text-gray-900 dark:text-white">TC Hardt</span>
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400">1976 e.V.</span>
              </div>
            </div>
          </NuxtLink>


          <div class="flex items-center gap-3 ml-auto self-center">

            <div class="hidden lg:flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-3 mr-1">
              <template v-for="(social, index) in socialLinks" :key="index">
                <UButton
                  v-if="social.icon"
                  :to="social.href"
                  target="_blank"
                  variant="ghost"
                  color="gray"
                  size="xs"
                  :icon="social.icon"
                  class="hover:text-primary-500"
                />
              </template>

              <UColorModeButton
                size="xs"
                variant="ghost"
                color="gray"
              />
              <LanguageSwitcher
                size="xs"
                variant="ghost"
                color="gray"
              />
            </div>


            <div class="flex items-center gap-2">
              <UButton
                v-for="(btn, index) in navButtons"
                :key="index"
                :to="localePath(btn.to)"
                :label="btn.label"
                :color="(btn.color as any) || 'primary'"
                :variant="(btn.variant as any) || 'solid'"
                :target="btn.target"
                class="hidden sm:flex font-bold"
              />
            </div>

            <button
              class="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none text-gray-900 dark:text-white"
              aria-label="Menu öffnen"
              @click="toggleMenu"
            >
              <span class="relative w-6 h-5 block" aria-hidden="true">
                <span
                  class="absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out"
                  :class="isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'"
                />
                <span
                  class="absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out top-2"
                  :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
                />
                <span
                  class="absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out"
                  :class="isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'"
                />
              </span>
            </button>

          </div>
        </div>


        <div
          class="lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out"
          :class="isMobileMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <div class="pb-6 pt-2 flex flex-col gap-6">
              <UNavigationMenu
                :items="headerMenu"
                orientation="vertical"
                :ui="{ link: { active: 'text-primary font-bold', base: 'py-3' } }"
              />

              <USeparator />

              <div class="flex flex-col gap-3">
                <UButton
                  v-for="(btn, index) in navButtons"
                  :key="index"
                  :to="localePath(btn.to)"
                  :label="btn.label"
                  :color="(btn.color as any) || 'primary'"
                  :variant="(btn.variant as any) || 'solid'"
                  block
                  size="xl"
                  @click="closeMenu"
                />
              </div>

              <USeparator />

              <div class="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-400">

                <div class="flex items-center justify-center gap-4 pt-2">

                  <div class="flex items-center gap-2">
                    <template v-for="(social, index) in socialLinks" :key="index">
                      <UButton
                        v-if="social.icon"
                        :href="social.href"
                        target="_blank"
                        variant="ghost"
                        :icon="social.icon"
                      />
                    </template>
                  </div>

                  <div class="h-4 w-px bg-gray-200 dark:bg-gray-700"/>

                  <div class="flex items-center gap-2">
                    <UColorModeButton />
                    <LanguageSwitcher />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  </header>
</template>
