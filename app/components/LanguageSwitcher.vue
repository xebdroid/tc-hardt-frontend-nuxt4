<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const flags: Record<string, string> = {
  de: '🇩🇪',
  en: '🇬🇧'
}

// Items für das DropdownMenu
const items = computed(() => [
  locales.value.map(l => ({
    label: l.name,
    // type: 'link' ist wichtig in Nuxt UI v3 für Navigation
    type: 'link',
    to: switchLocalePath(l.code),
    // Icon oder Avatar
    avatar: {
      src: '',
      alt: flags[l.code] || '🌐',
      text: flags[l.code] || '🌐'
    },
    // Deaktiviert den aktuellen Link
    disabled: locale.value === l.code
  }))
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      class="font-bold"
    >
      <span class="mr-1 text-lg">{{ flags[locale] }}</span>
      <span class="hidden sm:inline">{{ locale === 'de' ? 'Deutsch' : 'English' }}</span>
      <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 ml-1" />
    </UButton>
  </UDropdownMenu>
</template>
