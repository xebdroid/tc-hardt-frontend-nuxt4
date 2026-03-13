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
const route = useRoute()

// Tracken, welches Submenü offen ist (Akkordeon-Logik manuell)
const openSection = ref<string | null>(null)

// Hilfsfunktion: Ist ein Menüpunkt oder eines seiner Kinder aktiv?
const isItemActive = (item: any) => {
  if (item.to && route.path === item.to) return true
  if (item.children) {
    return item.children.some((child: any) => route.path === child.to)
  }
  return false
}

// Hilfsfunktion: Hat ein Kind-Element spezielle Highlight-Klassen? (z.B. Jubiläum)
const getChildStyles = (child: any) => {
  const isActive = route.path === child.to
  
  if (isActive) {
    return {
      link: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
      icon: 'text-primary-500',
      label: 'text-primary-600 dark:text-primary-400'
    }
  }

  // Prüfen auf "Jubiläum" Highlight (anhand der Klasse oder des Pfads)
  const isJubilee = child.to?.includes('jubilee') || (child.class && child.class.includes('accent'))
  
  if (isJubilee) {
    return {
      link: 'text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-950/20',
      icon: 'text-accent-500',
      label: 'text-accent-600 dark:text-accent-400'
    }
  }

  return {
    link: 'text-brand-dark-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
    icon: 'text-gray-400',
    label: 'text-brand-dark-800 dark:text-gray-200'
  }
}

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
              class="group flex items-center gap-2 py-2 px-3 rounded-xl transition-colors"
              active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
              inactive-class="text-brand-dark-800 dark:text-brand-dark-100 hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="emit('close')"
            >
              <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5 shrink-0" />
              <span
                class="text-lg font-medium break-word-hyphens"
                v-html="formatLabel(item.label)"
              />
            </NuxtLink>

            <!-- Kategorie mit Unterpunkten -->
            <div v-else class="flex flex-col gap-1">
              <button
                class="flex items-center justify-between py-2 px-3 rounded-xl transition-colors w-full text-left"
                :class="isItemActive(item) 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                  : 'text-brand-dark-800 dark:text-brand-dark-100 hover:bg-gray-50 dark:hover:bg-gray-800'"
                @click="toggleSection(item.label)"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    v-if="item.icon"
                    :name="item.icon"
                    class="w-5 h-5 shrink-0"
                  />
                  <span
                    class="text-lg font-medium break-word-hyphens"
                    v-html="formatLabel(item.label)"
                  />
                </div>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 transition-transform duration-300"
                  :class="{ 'rotate-90': openSection === item.label }"
                />
              </button>

              <!-- Untermenü mit weicher Animation -->
              <div
                class="grid transition-[grid-template-rows] duration-300 ease-in-out"
                :class="openSection === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              >
                <div class="overflow-hidden">
                  <!-- Untermenü mit Einrückung und vertikaler Linie -->
                  <div class="flex flex-col gap-1 py-2 ml-4 pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.label"
                      :to="child.to"
                      class="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
                      :class="getChildStyles(child).link"
                      @click="emit('close')"
                    >
                      <UIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="w-4 h-4 shrink-0"
                        :class="getChildStyles(child).icon"
                      />
                      <span
                        class="text-sm font-bold leading-tight break-word-hyphens"
                        :class="getChildStyles(child).label"
                        v-html="formatLabel(child.label)"
                      />
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
