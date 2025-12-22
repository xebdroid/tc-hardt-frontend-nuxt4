<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()
const { t } = useI18n()

// Wir nutzen 'computed', damit die Übersetzungen beim Sprachwechsel funktionieren
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('nav.club'),
    icon: 'i-heroicons-building-library',
    children: [
      {
        label: t('nav.about'),
        to: localePath('about'),
        description: t('nav.about_desc'),
        icon: 'i-heroicons-information-circle'
      },
      {
        label: t('nav.board'),
        to: localePath('board'),
        description: t('nav.board_desc'),
        icon: 'i-heroicons-users'
      },
      {
        label: t('nav.sponsoring'),
        to: localePath('sponsoring'),
        description: t('nav.sponsoring_desc'),
        icon: 'i-heroicons-currency-euro'
      }
    ]
  },
  {
    label: t('nav.sport'),
    icon: 'i-heroicons-trophy',
    children: [
      {
        label: t('nav.teams'),
        to: localePath('teams'),
        description: t('nav.teams_desc'),
        icon: 'i-heroicons-user-group'
      },
      {
        label: t('nav.training'),
        to: localePath('training'),
        description: t('nav.training_desc'),
        icon: 'i-heroicons-academic-cap'
      }
    ]
  },
  {
    label: t('nav.contact'),
    icon: 'i-heroicons-envelope',
    to: localePath('contact')
  }
])
</script>

<template>
  <UHeader
    mode="slideover"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }"
  >
    <template #title>
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img
          src="/img/logo.png"
          alt="TC Hardt"
          class="h-8 w-auto"
        >
        <span class="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
          TC Hardt
        </span>
      </NuxtLink>
    </template>


    <UNavigationMenu :items="items" />

    <template #right>
      <UButton
        :to="localePath('contact')"
        :label="t('nav.member')"
        color="primary"
        variant="solid"
        class="hidden sm:flex font-bold"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2"
      />

      <div class="mt-6">
        <UButton
          :to="localePath('contact')"
          :label="t('nav.member')"
          color="primary"
          block
          size="xl"
          class="font-bold"
        />
      </div>
    </template>
  </UHeader>
</template>
