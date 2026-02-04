<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import CookieModal from '~/components/base/CookieModal.vue'

const title = 'TC Hardt - Tennis in Mönchengladbach'
const description = 'Dein Tennisclub im Herzen von Mönchengladbach.'

useSeoMeta({ title, description })

const { locale } = useI18n()
const lang = computed(() => {
  const currentLocale = locale.value as keyof typeof locales
  return locales[currentLocale]?.code || 'de'
})

const dir = computed(() => {
  const currentLocale = locale.value as keyof typeof locales
  return locales[currentLocale]?.dir || 'ltr'
})

useHead({
  htmlAttrs: { lang, dir },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  bodyAttrs: {
    class: 'font-sans antialiased'
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <CookieModal />
  </UApp>
</template>
