<script setup lang="ts">
import { computed } from 'vue'
import * as locales from '@nuxt/ui/locale'
import CookieModal from '~/components/base/CookieModal.vue'

const store = useConsentStore()

const title = 'TC Hardt - Tennis in Mönchengladbach'
const description = 'Dein Tennisclub im Herzen von Mönchengladbach.'

useSeoMeta({ title, description })

const { locale } = useI18n()
const lang = computed(() => locales[locale.value]?.code || 'de')
const dir = computed(() => locales[locale.value]?.dir || 'ltr')

useHead({
  htmlAttrs: { lang, dir },
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    // WICHTIG: Preload für die wichtigsten Schriftarten, verhindert das Text-Zucken
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/EurostileBold.woff2', crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Eurostile-ExtendedTwo.woff2', crossorigin: 'anonymous' }
  ],
  bodyAttrs: {
    class: 'font-sans antialiased bg-gray-50 dark:bg-gray-950'
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#5aa9d4" :height="3" />

    <UApp>
      <div :class="{ 'pointer-events-none': store.isModalOpen }">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>

      <CookieModal />
    </UApp>
  </div>
</template>
