<script setup lang="ts">
import CtaButton from './CtaButton.vue'
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'
import Button from '~/components/base/Button.vue'

const props = defineProps<{
  isOpen: boolean
  headerMenu: any[]
  navButtons: any[]
  socialLinks: any[]
  showAppearanceModeButton: boolean;
  showLanguageSwitch: boolean;
}>()

const emit = defineEmits(['close'])

</script>

<template>
  <div
    class="lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out"
    :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
  >
    <div class="overflow-hidden flex flex-col max-h-[calc(100dvh-100px)]">
      <!-- Scrollbarer Bereich für das Hauptmenü -->
      <div class="overflow-y-auto flex-1 px-1">
        <div class="pb-4 pt-4 flex flex-col gap-6">
          <UNavigationMenu
            :items="headerMenu"
            orientation="vertical"
            type="single"
            collapsible
            :ui="{
              link: 'py-3 text-lg font-normal text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 aria-[current=page]:text-primary-600 dark:aria-[current=page]:text-primary-400 transition-colors',
              linkLeadingIcon: 'text-brand-dark-800 dark:text-brand-dark-100 group-hover:text-primary-500 dark:group-hover:text-brand-light-400 group-aria-[current=page]:text-primary-600 dark:group-aria-[current=page]:text-primary-400 transition-colors',
              childLink: 'py-2 text-lg text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 aria-[current=page]:text-primary-600 dark:aria-[current=page]:text-primary-400 transition-colors',
              childLinkIcon: 'text-brand-dark-800 dark:text-brand-dark-100 group-hover:text-primary-500 dark:group-hover:text-brand-light-400 group-aria-[current=page]:text-primary-600 dark:group-aria-[current=page]:text-primary-400 transition-colors'
            }"
          />
        </div>
      </div>

      <!-- Fixierter Bereich für CTA-Buttons und Social Links -->
      <div class="shrink-0 flex flex-col gap-3 pt-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div class="flex flex-col gap-2">
          <Button
            v-for="(btn, index) in navButtons"
            :key="index"
            class="flex sm:hidden"
            :to="btn.to"
            :label="btn.label"
            :target="btn.target"
            :variant="(btn.variant as any) || 'outline'"
            block
            size="xl"
          />
        </div>

        <div class="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center justify-center gap-3">
            <div class="flex items-center gap-1">
              <template v-for="(social, index) in socialLinks" :key="index">
                <UButton
                  v-if="social.icon"
                  :href="social.href"
                  target="_blank"
                  variant="ghost"
                  :icon="social.icon"
                  size="lg"
                  class="text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors px-2"
                />
              </template>
            </div>
            <template v-if="showAppearanceModeButton || showLanguageSwitch">
              <div class="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <div class="flex items-center gap-1">
                <UColorModeButton
                  v-if="showAppearanceModeButton"
                  size="lg"
                  :ui="{
                    leadingIcon: 'text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors'
                  }"
                  class="px-2"
                />
                <LanguageSwitcher
                  v-if="showLanguageSwitch"
                  size="lg"
                  class="px-2"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
