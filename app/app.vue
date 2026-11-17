<script setup lang="ts">
import { computed } from 'vue'
import CookieModal from '~/components/base/CookieModal.vue'
import ScrollToTop from '~/components/base/ScrollToTop.vue'
import MobileStickyCTA from '~/components/base/MobileStickyCTA.vue'
import ToastContainer from '~/components/base/ToastContainer.vue'
import { useConsentStore } from '~/stores/consent'
import { useUIStore } from '~/stores/ui'

const store = useConsentStore()
const uiStore = useUIStore()

const title = 'Tennis in Mönchengladbach'
const description = 'Dein Tennisclub im Herzen von Mönchengladbach. Erlebe Tennis, Gemeinschaft und Familienspaß am Birkmannsweg.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/img/logo.png',
  ogSiteName: 'TC Hardt e.V.',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: '/img/logo.png',
})

const { locale } = useI18n()
const lang = computed(() => locale.value || 'de')
const dir = 'ltr'

defineOrganization({
  name: 'Tennisclub Hardt e.V.',
  url: 'https://tc-hardt.de',
  logo: 'https://tc-hardt.de/img/logo.png',
  address: {
    streetAddress: 'Birkmannsweg 16',
    addressLocality: 'Mönchengladbach',
    postalCode: '41169',
    addressCountry: 'DE'
  },
  email: 'info@tc-hardt.de',
  sameAs: [
    'https://www.facebook.com/TCHardt',
    'https://www.instagram.com/tc_hardt_ev/'
  ]
})

useHead({
  htmlAttrs: { lang, dir },
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/EurostileBold.woff2', crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Eurostile-ExtendedTwo.woff2', crossorigin: 'anonymous' }
  ]
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#5aa9d4" :height="3" />

    <div :class="{ 'is-modal-locked': store.isModalOpen }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <CookieModal />
    <ScrollToTop />
    <MobileStickyCTA :is-menu-open="uiStore.isMobileMenuOpen" />
    <ToastContainer />
  </div>
</template>

<style lang="scss" scoped>
.is-modal-locked {
  pointer-events: none;
}
</style>
