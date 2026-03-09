<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import * as locales from '@nuxt/ui/locale'
import CookieModal from '~/components/base/CookieModal.vue'
import LoadingLayer from '~/components/base/LoadingLayer.vue'

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

const appIsLoading = ref(true)
const nuxtApp = useNuxtApp()

const MAX_LOADING_TIME = 45000

const waitForAssets = async () => {
  const monitoredAssets: Record<string, any> = {};

  const addAssetToMonitor = (name: string, promise: Promise<any>) => {
    monitoredAssets[name] = { status: 'pending', promise };
    promise.then(
      () => {
        monitoredAssets[name].status = 'fulfilled';
      },
      (reason) => {
        monitoredAssets[name].status = 'rejected';
      }
    );
    return promise;
  };

  const assetLoadPromises = [];

  // 1. Fonts-Promise
  assetLoadPromises.push(addAssetToMonitor('fonts', document.fonts.ready));

  // 2. Bilder-Promises (Gefiltert!)
  const criticalImages = Array.from(document.images).filter(img => {
    // Filtere leere Bilder und Bilder mit Lazy-Loading heraus
    const hasSrc = img.src && img.src.trim() !== '';
    const isLazy = img.loading === 'lazy' || img.hasAttribute('data-src');
    return hasSrc && !isLazy;
  });

  criticalImages.forEach((img, index) => {
    // Einen sauberen Namen fürs Log extrahieren
    const fileName = img.src.split('/').pop()?.split('?')[0] || `Bild_${index}`;
    const assetName = `image_${fileName}`;

    if (img.complete) {
      // Wenn das Bild schon im Cache ist, erzeugen wir ein direkt aufgelöstes Promise
      assetLoadPromises.push(addAssetToMonitor(assetName, Promise.resolve()));
      return;
    }

    const imgPromise = new Promise((resolve) => {
      // Sobald geladen ODER ein Fehler auftritt, lösen wir auf.
      // Fehlerhafte Bilder dürfen das Overlay nicht blockieren!
      img.onload = resolve;
      img.onerror = resolve;
    });

    assetLoadPromises.push(addAssetToMonitor(assetName, imgPromise));
  });

  // 3. Das reguläre Promise: Wartet auf alles
  const allAssetsLoaded = Promise.all(assetLoadPromises).then(() => {
    return 'loaded';
  });

  // 4. Das Notfall-Promise: Läuft nach Zeit X ab
  const timeoutFallback = new Promise((resolve) => {
    setTimeout(() => {
      resolve('timeout');
    }, MAX_LOADING_TIME);
  });

  // 5. Der Wettlauf!
  await Promise.race([allAssetsLoaded, timeoutFallback]);
}

onMounted(async () => {
  const startTime = performance.now()
  await nextTick()
  await waitForAssets()
  appIsLoading.value = false
  const endTime = performance.now()
  const duration = (endTime - startTime) / 1000
  console.log(`Loading overlay was visible for ${duration.toFixed(2)} seconds.`)
})

// Optional: Hooks für Nuxt Page Transitions
nuxtApp.hook('page:start', () => {
  appIsLoading.value = true
})

nuxtApp.hook('page:finish', async () => {
  await nextTick()
  await waitForAssets()
  appIsLoading.value = false
})
</script>

<template>
  <div>
    <LoadingLayer
      :is-loading="appIsLoading"
      :use-random-text="true"
    />
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
