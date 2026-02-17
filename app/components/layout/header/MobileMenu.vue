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
    <div class="overflow-hidden">
      <div class="pb-8 pt-4 flex flex-col gap-6">

        <UNavigationMenu
          :items="headerMenu"
          orientation="vertical"
          :ui="{
            // 1. Text: Basis, Hover & Active Farben definieren
            link: 'py-3 text-lg font-normal text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 aria-[current=page]:text-primary-600 dark:aria-[current=page]:text-primary-400 transition-colors',

            // 2. Icon: Exakt gleiche Farben, aber mit 'group-' davor, damit sie beim Hover über die Zeile reagieren
            linkLeadingIcon: 'text-brand-dark-800 dark:text-brand-dark-100 group-hover:text-primary-500 dark:group-hover:text-brand-light-400 group-aria-[current=page]:text-primary-600 dark:group-aria-[current=page]:text-primary-400 transition-colors',

            // 3. Child Text
            childLink: 'py-2 text-lg text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 aria-[current=page]:text-primary-600 dark:aria-[current=page]:text-primary-400 transition-colors',

            // 4. Child Icons
            childLinkIcon: 'text-brand-dark-800 dark:text-brand-dark-100 group-hover:text-primary-500 dark:group-hover:text-brand-light-400 group-aria-[current=page]:text-primary-600 dark:group-aria-[current=page]:text-primary-400 transition-colors'
          }"
        />

        <USeparator />

        <div class="flex flex-col gap-4">
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
                  class="text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors"
                />
              </template>
            </div>
            <template v-if="showAppearanceModeButton || showLanguageSwitch">
              <div class="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <div class="flex items-center gap-2">
                <UColorModeButton
                  v-if="showAppearanceModeButton"
                  size="lg"
                  :ui="{
                    leadingIcon: 'text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors'
                  }"
                />
                <LanguageSwitcher
                  v-if="showLanguageSwitch"
                  size="lg"
                />
              </div>
            </template>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
