<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="bg-tennis-950 text-gray-300 text-xs py-2 hidden lg:block border-b border-white/10">
    <UContainer class="flex justify-between items-center">

      <div class="flex items-center gap-6">
        <a
          href="https://maps.app.goo.gl/em8mhm3wfSaVeRrc8"
          target="_blank"
          class="flex items-center gap-2 hover:text-white transition-colors"
        >
          <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-highlight-500" />
          <span>Birkmannsweg 16, MG</span>
        </a>
        <a href="mailto:info@tc-hardt.de" class="flex items-center gap-2 hover:text-white transition-colors">
          <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-highlight-500" />
          <span>info@tc-hardt.de</span>
        </a>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
          <UButton
            to="https://www.instagram.com/tc_hardt_1976/"
            target="_blank"
            variant="ghost"
            size="xs"
            icon="i-simple-icons-instagram"
            class="hover:text-highlight-500"
          />
          <UButton
            to="https://www.facebook.com/TCHardt1976"
            target="_blank"
            variant="ghost"
            size="xs"
            icon="i-simple-icons-facebook"
            class="hover:text-highlight-500"
          />
        </div>

        <LanguageSwitcher class="mr-2" />
        <UColorModeButton class="mr-2" />
      </div>

    </UContainer>
  </div>
</template>
