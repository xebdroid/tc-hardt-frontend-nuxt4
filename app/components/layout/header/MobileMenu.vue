<script setup lang="ts">
import CtaButton from './CtaButton.vue' // Relativer Import im gleichen Ordner
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
      <div class="pb-6 pt-2 flex flex-col gap-6">

        <UNavigationMenu
          :items="headerMenu"
          orientation="vertical"
          :ui="{ link: { active: 'text-primary font-bold', base: 'py-3' } }"
        />

        <USeparator />

        <div class="flex flex-col gap-3">
          <CtaButton
            v-for="(btn, index) in navButtons"
            :key="index"
            :to="localePath(btn.to)"
            :label="btn.label"
            :target="btn.target"
            block
            @click="emit('close')"
          />
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
                />
              </template>
            </div>
            <div class="h-4 w-px bg-gray-200 dark:bg-gray-700"/>
            <div class="flex items-center gap-2">
              <UColorModeButton />
              <LanguageSwitcher />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
