<script setup lang="ts">
// Wir holen die Daten aus dem Composable
const { socialLinks, addressInfo, contactInfo } = useNavigation()
</script>

<template>
  <div class="bg-tennis-800 text-gray-300 text-xs py-2 hidden lg:block border-b border-white/10">
    <UContainer class="flex justify-between items-center">

      <div class="flex items-center gap-6">
        <a
          :href="addressInfo.href"
          target="_blank"
          class="flex items-center gap-2 hover:text-white transition-colors"
        >
          <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-highlight-500" />
          <span>{{ addressInfo.label }}</span>
        </a>

        <a :href="contactInfo.mailto" class="flex items-center gap-2 hover:text-white transition-colors">
          <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-highlight-500" />
          <span>{{ contactInfo.email }}</span>
        </a>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 border-r border-white/10 pr-4 mr-2">

          <UButton
            v-for="(social, index) in socialLinks"
            :key="index"
            :to="social.href"
            target="_blank"
            variant="ghost"
            size="xs"
            :icon="social.icon"
            class="hover:text-highlight-500"
          />
        </div>

        <LanguageSwitcher class="mr-2" />
        <UColorModeButton class="mr-2" />
      </div>

    </UContainer>
  </div>
</template>
