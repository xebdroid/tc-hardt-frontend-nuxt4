<script setup lang="ts">
import CtaButton from './CtaButton.vue'
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'

const props = defineProps<{
  isOpen: boolean
  headerMenu: any[]
  navButtons: any[]
  socialLinks: any[]
}>()

const emit = defineEmits(['close'])
const localePath = useLocalePath()
</script>

<template>
  <div
    class="lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out"
    :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
  >
    <div class="overflow-hidden">
      <div class="pb-8 pt-4 flex flex-col gap-6">

        <UNavigationMenu
          :items="headerMenu"
          orientation="vertical"
        />

        <USeparator />

        <div class="flex flex-col gap-4">
          <template v-for="(btn, index) in navButtons" :key="index">
            <CtaButton
              v-if="!btn.hidden"
              :to="localePath(btn.to)"
              :label="btn.label"
              :target="btn.target"
              :color="btn.color"
              :variant="btn.variant"
              block
              size="xl"
              @click="emit('close')"
            />
          </template>
        </div>

        <USeparator />

        <div class="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center justify-center gap-4 pt-2">
            <div class="flex items-center gap-2">
              <template v-for="(social, index) in socialLinks" :key="index">
                <UButton
                  v-if="social.icon"
                  :href="social.href"
                  target="_blank"
                  variant="ghost"
                  :icon="social.icon"
                  size="lg"
                />
              </template>
            </div>
            <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"/>
            <div class="flex items-center gap-2">
              <UColorModeButton size="lg" />
              <LanguageSwitcher size="lg" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
