<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
// Importiere explizit
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
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  bodyAttrs: {
    class: 'font-sans antialiased bg-gray-50 dark:bg-gray-950'
  }
})
</script>

<template>
  <UApp>
    <div :class="{ 'pointer-events-none': store.isModalOpen }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <CookieModal />
  </UApp>
</template>
