<script setup lang="ts">
const localePath = useLocalePath()
// contactInfo holen wir hier jetzt auch dazu für das Mobile Menü
const { headerMenu, navButtons } = useNavigation()
</script>

<template>
  <UHeader
    mode="slideover"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }"
    :ui="{
      root: 'sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800',
      container: 'max-w-7xl mx-auto'
    }"
  >
    <template #title>
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img
          src="/img/logo.png"
          alt="TC Hardt"
          class="h-14 w-auto"
        >
        <span class="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
          TC Hardt
        </span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="headerMenu"
      highlight
      highlight-color="secondary"
      orientation="horizontal"
      class="hidden lg:flex"
    />

    <template #right>
      <UButton
        v-for="(btn, index) in navButtons"
        :key="index"
        :to="localePath(btn.to)"
        :label="btn.label"
        :color="(btn.color as any) || 'primary'"
        :variant="(btn.variant as any) || 'solid'"
        :target="btn.target"
        class="hidden sm:flex font-bold"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="headerMenu"
        orientation="vertical"
        class="-mx-2 mb-6"
      />

      <div class="flex flex-col gap-2">
        <UButton
          v-for="(btn, index) in navButtons"
          :key="index"
          :to="localePath(btn.to)"
          :label="btn.label"
          :color="(btn.color as any) || 'primary'"
          :variant="(btn.variant as any) || 'solid'"
          block
          size="xl"
        />
      </div>
    </template>
  </UHeader>
</template>
