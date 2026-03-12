<script setup lang="ts">
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

// Tracken, welches Submenü offen ist (Akkordeon-Logik manuell)
const openSection = ref<string | null>(null)

const toggleSection = (label: string) => {
  if (openSection.value === label) {
    openSection.value = null
  } else {
    openSection.value = label
  }
}

// Wenn das Menü geschlossen wird, auch Sektionen schließen
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    openSection.value = null
  }
})

// Hilfsfunktion für den Umbruchschutz beim Jubiläum
const formatLabel = (label: string) => {
  if (label.includes('TC Hardt')) {
    return label.replace('TC Hardt', 'TC&nbsp;Hardt')
  }
  return label
}
</script>

<template>
  <div
    class="lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out"
    :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
  >
    <div class="overflow-hidden flex flex-col max-h-[calc(100dvh-120px)]">
      <!-- Scrollbarer Bereich für das Hauptmenü -->
      <div class="overflow-y-auto flex-1 px-1">
        <div class="pb-4 pt-4 flex flex-col gap-1">
          <template v-for="item in headerMenu" :key="item.label">
            <!-- Normaler Link -->
            <NuxtLink
              v-if="!item.children || item.children.length === 0"
              :to="item.to"
              class="group flex items-center gap-2 py-1 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              @click="emit('close')"
            >
              <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5 text-brand-dark-700 dark:text-gray-400 group-hover:text-primary-500" />
              <span
                class="text-lg font-medium text-brand-dark-800 dark:text-brand-dark-100 group-hover:text-primary-500 break-word-hyphens"
                v-html="formatLabel(item.label)"
              />
            </NuxtLink>

            <!-- Kategorie mit Unterpunkten -->
            <div v-else class="flex flex-col gap-1">
              <button
                class="flex items-center justify-between py-1 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left"
                @click="toggleSection(item.label)"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    v-if="item.icon"
                    :name="item.icon"
                    class="w-5 h-5 transition-colors"
                    :class="openSection === item.label ? 'text-primary-500' : 'text-brand-dark-700 dark:text-gray-400'"
                  />
                  <span
                    class="text-lg font-medium transition-colors break-word-hyphens"
                    :class="openSection === item.label ? 'text-primary-500' : 'text-brand-dark-800 dark:text-brand-dark-100'"
                    v-html="formatLabel(item.label)"
                  >
                  </span>
                </div>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 transition-transform duration-300 text-gray-400"
                  :class="{ 'rotate-90 text-primary-500': openSection === item.label }"
                />
              </button>

              <!-- Untermenü mit weicher Animation -->
              <div
                class="grid transition-[grid-template-rows] duration-300 ease-in-out"
                :class="openSection === item.label ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
              >
                <div class="overflow-hidden">
                  <!-- Untermenü als kompaktes 2-spaltiges Grid -->
                  <div
                    class="grid grid-cols-2 gap-2 py-2 transition-all duration-500 delay-100"
                    :class="openSection === item.label ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'"
                  >
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.label"
                      :to="child.to"
                      class="flex items-center gap-2.5 p-3 rounded-xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary-100/50 dark:border-primary-800/30 hover:border-primary-300 dark:hover:border-primary-700 transition-all shadow-sm group/child"
                      :class="child.class"
                      @click="emit('close')"
                    >
                      <UIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="w-5 h-5 shrink-0 transition-colors"
                        :class="child.class ? 'text-current' : 'text-primary-500 group-hover/child:text-primary-600'"
                      />
                      <span
                        class="text-sm font-bold leading-tight transition-colors break-word-hyphens"
                        :class="child.class ? 'text-current' : 'text-brand-dark-800 dark:text-gray-200 group-hover/child:text-primary-600'"
                        v-html="formatLabel(child.label)"
                      >
                      </span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Fixierter Bereich für CTA-Buttons und Social Links -->
      <div class="shrink-0 flex flex-col gap-3 pt-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div class="flex flex-col gap-2">
          <Button
            v-for="(btn, index) in navButtons.slice().reverse()"
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
                  class="text-brand-dark-800 dark:text-brand-dark-100 hover:text-primary-500 dark:hover:text-brand-light-400 transition-colors"
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
