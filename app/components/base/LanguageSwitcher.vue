<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Mapping: Sprach-Code zu Icon-Name (Circle Flags Collection)
const flagIcons: Record<string, string> = {
  de: 'i-circle-flags-de',
  en: 'i-circle-flags-gb' // oder 'i-circle-flags-us'
}

const items = computed(() => [
  locales.value.map(l => ({
    label: l.name,
    // Wir nutzen 'icon' statt 'avatar' -> das ist sauberer in Nuxt UI
    icon: flagIcons[l.code],
    to: switchLocalePath(l.code),
    type: 'link',
    // Aktive Sprache deaktivieren (grau)
    disabled: locale.value === l.code
  }))
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
  >
    <Button
      variant="ghost"
      class="font-bold"
    >
      <BaseIcon :name="flagIcons[locale]" class="w-5 h-5 mr-1" />

      <span class="hidden sm:inline">
        {{ locale === 'de' ? 'DE' : 'EN' }}
      </span>
      <BaseIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 ml-1 text-brand-dark-800 dark:text-brand-dark-100 dark:hover:text-brand-light-400 transition-colors" />
    </Button>
  </UDropdownMenu>
</template>
