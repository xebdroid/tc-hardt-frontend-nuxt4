<script setup lang="ts">
import logoImage from '~/assets/logo.png'

const title = 'TC Hardt - Tennis in Mönchengladbach'
const description = 'Dein Tennisclub im Herzen von Mönchengladbach. 7 Ascheplätze, Gastronomie und eine starke Gemeinschaft.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

useHead({
  htmlAttrs: { lang: 'de' },
  link: [{ rel: 'icon', href: '/favicon.ico' }]
})

const links = [
  { label: 'Home', to: '/' },
  { label: 'Über uns', to: '/ueber-uns' },
  { label: 'Vorstand', to: '/vorstand' },
  { label: 'Mannschaften', to: '/mannschaften' },
  { label: 'Training', to: '/training' },
  { label: 'Sponsoring', to: '/sponsoring' },
  { label: 'Kontakt', to: '/kontakt' }
]
</script>

<template>
  <UApp>
    <UHeader mode="drawer" :toggle="{ color: 'neutral', variant: 'ghost', class: 'text-white' }" :ui="{
      wrapper: 'sticky top-0 z-50 bg-tennis-800 border-b border-tennis-700',
      container: 'bg-tennis-800',
      left: 'flex-1',
      center: 'flex-none',
      right: 'flex-1 justify-end'
    }">
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="h-10 w-10 bg-white rounded-full flex items-center justify-center p-1">
            <img src="/logo.png" alt="TC Hardt" class="h-full w-auto" />
          </div>
          <span class="font-bold text-xl text-white hidden sm:block">TC Hardt</span>
        </NuxtLink>
      </template>

      <template #default>
        <nav class="hidden lg:flex items-center gap-8">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" active-class="text-tennis-400 font-bold"
            class="text-sm font-medium text-gray-200 hover:text-white transition-colors uppercase tracking-wider">
            {{ link.label }}
          </NuxtLink>
        </nav>
      </template>

      <template #right>
        <UButton to="/kontakt" label="Mitglied werden" color="white" variant="solid"
          class="hidden sm:flex font-bold text-tennis-900" />
      </template>

      <template #content="{ close }">
        <div class="bg-tennis-800 h-full p-6 flex flex-col gap-6">
          <div class="h-10 w-10 bg-white rounded-full flex items-center justify-center p-1">
            <img src="/logo.png" alt="TC Hardt" class="h-full w-auto" />
          </div>
          <nav class="flex flex-col gap-4">
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
              class="text-lg font-medium text-white border-b border-tennis-700 pb-2" @click="close">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter class="bg-gray-50 border-t border-gray-200 mt-auto">
      <template #left>
        <span class="text-sm text-gray-500">© {{ new Date().getFullYear() }} TC Hardt e.V.</span>
      </template>
    </UFooter>
  </UApp>
</template>
