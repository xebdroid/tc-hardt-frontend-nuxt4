<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const title = 'TC Hardt - Tennis in Mönchengladbach'
const description = 'Dein Tennisclub im Herzen von Mönchengladbach.'

useSeoMeta({ title, description })

// 2. Hole dir das aktuelle Locale aus i18n
const { locale } = useI18n()
const localePath = useLocalePath() // Hast du ja schon repariert

// 3. Optional: HTML Lang & Dir Attribute automatisch setzen (empfohlen in Docs)
const lang = computed(() => locales[locale.value]?.code || 'de')
const dir = computed(() => locales[locale.value]?.dir || 'ltr')

useHead({
  htmlAttrs: { lang, dir },
  link: [{ rel: 'icon', href: '/favicon.ico' }]
})

const links = computed(() => [
  { label: useNuxtApp().$i18n.t('nav.home'), to: '/' },
  { label: useNuxtApp().$i18n.t('nav.about'), to: '/ueber-uns' },
  { label: useNuxtApp().$i18n.t('nav.board'), to: '/vorstand' },
  { label: useNuxtApp().$i18n.t('nav.teams'), to: '/mannschaften' },
  { label: useNuxtApp().$i18n.t('nav.training'), to: '/training' },
  { label: useNuxtApp().$i18n.t('nav.sponsoring'), to: '/sponsoring' },
  { label: useNuxtApp().$i18n.t('nav.contact'), to: '/kontakt' }
])
</script>

<template>
  <UApp>
    <UHeader mode="drawer" :toggle="{ color: 'gray', variant: 'ghost' }" :ui="{
      wrapper: 'sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800',
      container: 'max-w-7xl mx-auto'
    }">

      <template #left>
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3">
          <div
            class="h-10 w-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center p-1 border border-gray-200 dark:border-gray-700">
            <img src="/img/logo.png" alt="TC Hardt" class="h-full w-auto" />
          </div>
          <span class="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
            TC Hardt
          </span>
        </NuxtLink>
      </template>

      <template #default>
        <nav class="hidden lg:flex items-center gap-6">
          <NuxtLink v-for="link in links" :key="link.to" :to="localePath(link.to)"
            active-class="text-primary-500 font-bold"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors uppercase tracking-wide">
            {{ link.label }}
          </NuxtLink>
        </nav>
      </template>

      <template #right>
        <LanguageSwitcher class="mr-2" />

        <UColorModeButton class="mr-2" />

        <UButton :to="localePath('/kontakt')" :label="$t('nav.member')" color="primary" variant="solid"
          class="hidden sm:flex font-bold" />
      </template>

      <template #content="{ close }">
        <div class="h-full p-6 flex flex-col gap-6 bg-white dark:bg-gray-900">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <img src="/img/logo.png" alt="TC Hardt" class="h-8 w-auto" />
              <span class="font-bold text-xl text-gray-900 dark:text-white">TC Hardt</span>
            </div>
            <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="close" />
          </div>

          <nav class="flex flex-col gap-4">
            <NuxtLink v-for="link in links" :key="link.to" :to="localePath(link.to)"
              class="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 hover:text-primary-500"
              @click="close">
              {{ link.label }}
            </NuxtLink>
          </nav>

          <div class="mt-auto flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-6">
            <UColorModeButton />
            <UButton :label="$t('nav.member')" :to="localePath('/kontakt')" color="primary" @click="close" />
          </div>
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter class="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <template #left>
        <span class="text-sm text-gray-500">© {{ new Date().getFullYear() }} TC Hardt e.V.</span>
      </template>
      <template #right>
        <div class="flex gap-4">
          <NuxtLink to="/impressum" class="text-sm text-gray-500 hover:text-primary-500">Impressum</NuxtLink>
          <NuxtLink to="/datenschutz" class="text-sm text-gray-500 hover:text-primary-500">Datenschutz</NuxtLink>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
