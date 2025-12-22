<script setup lang="ts">
// Wir entfernen den Import von NavigationMenuItem vorerst, um TS-Fehler zu vermeiden
const { t } = useI18n()
const localePath = useLocalePath()

// items als computed, damit Sprache wechselt
const items = computed(() => [
  {
    label: t('nav.club') || 'Der Verein',
    icon: 'i-heroicons-building-library',
    children: [
      {
        label: t('nav.about') || 'Über uns',
        to: localePath('about'),
        icon: 'i-heroicons-information-circle',
        description: 'Unsere Geschichte & Werte'
      },
      {
        label: t('nav.board') || 'Vorstand',
        to: localePath('board'),
        icon: 'i-heroicons-users',
        description: 'Die Köpfe hinter dem Verein'
      },
      {
        label: t('nav.sponsoring') || 'Sponsoren',
        to: localePath('sponsoring'),
        icon: 'i-heroicons-currency-euro',
        description: 'Unsere starken Partner'
      }
    ]
  },
  {
    label: t('nav.sport') || 'Sport & Teams',
    icon: 'i-heroicons-trophy',
    children: [
      {
        label: t('nav.teams') || 'Mannschaften',
        to: localePath('teams'),
        icon: 'i-heroicons-user-group',
        description: 'Erwachsene, Jugend & Senioren'
      },
      {
        label: t('nav.training') || 'Training',
        to: localePath('training'),
        icon: 'i-heroicons-academic-cap',
        description: 'Tennisschule & Kurse'
      }
    ]
  },
  {
    label: t('nav.contact') || 'Kontakt',
    icon: 'i-heroicons-envelope',
    to: localePath('contact')
  }
])
</script>

<template>
  <UNavigationMenu
    :items="items"
    class="w-full flex justify-center"
    :ui="{
      item: {
        padding: 'px-3 py-2',
        font: 'font-medium text-sm'
      }
    }"
  />
</template>
