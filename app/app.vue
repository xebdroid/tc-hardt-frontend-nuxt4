<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const title = 'TC Hardt - Tennis in Mönchengladbach'
const description = 'Dein Tennisclub im Herzen von Mönchengladbach.'

useSeoMeta({ title, description })

const { locale } = useI18n()
const lang = computed(() => locales[locale.value]?.code || 'de')
const dir = computed(() => locales[locale.value]?.dir || 'ltr')

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
    <NuxtLayout name="default" />
  </UApp>
</template>
