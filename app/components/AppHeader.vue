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
  <header class="fixed top-4 left-0 right-0 z-50 pointer-events-none w-full">

    <div class="relative max-w-5xl mx-auto flex justify-center drop-shadow-md">

      <svg
        class="absolute -left-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block rotate-180"
        viewBox="0 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <mask id="curve-mask-left">
          <rect
            width="26"
            height="26"
            fill="white"
          />
          <path d="M 0 0 C 0 14.359 11.641 26 26 26 L 26 0 Z" fill="black" />
        </mask>
        <rect
          width="26"
          height="26"
          fill="currentColor"
          mask="url(#curve-mask-left)"
        />
      </svg>

      <svg
        class="absolute -right-[26px] top-0 w-[26px] h-[26px] text-white dark:text-gray-900 block rotate-180 scale-x-[-1]"
        viewBox="0 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <mask id="curve-mask-right">
          <rect
            width="26"
            height="26"
            fill="white"
          />
          <path d="M 0 0 C 0 14.359 11.641 26 26 26 L 26 0 Z" fill="black" />
        </mask>
        <rect
          width="26"
          height="26"
          fill="currentColor"
          mask="url(#curve-mask-right)"
        />
      </svg>


      <div class="pointer-events-auto w-full bg-white dark:bg-gray-900 rounded-b-3xl px-6 lg:px-8 flex flex-col transition-all duration-300 ease-in-out">

        <div class="h-20 w-full flex items-center justify-between shrink-0 relative">

          <div class="hidden lg:flex">
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
              src="/img/logo.png"
              alt="TC Hardt"
              class="h-10 lg:h-12 w-auto transition-all"
            >
            <span class="font-bold text-xl text-gray-900 dark:text-white hidden lg:block">TC Hardt</span>
          </NuxtLink>


          <div class="flex items-center gap-3 ml-auto">

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
