<script setup lang="ts">
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'
import ColorModeButton from '~/components/base/ColorModeButton.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

const props = defineProps<{
  isOpen: boolean
  headerMenu: any[]
  navButtons: any[]
  socialLinks: any[]
  showAppearanceModeButton: boolean
  showLanguageSwitch: boolean
}>()

const emit = defineEmits(['close'])
const route = useRoute()

const openSection = ref<string | null>(null)

const isItemActive = (item: any) => {
  if (item.to && route.path === item.to) return true
  if (item.children) {
    return item.children.some((child: any) => route.path === child.to)
  }
  return false
}

const getChildStateClass = (child: any) => {
  if (route.path === child.to) return 'is-active'
  const isJubilee = child.to?.includes('jubilee') || (child.class && child.class.includes('accent'))
  if (isJubilee) return 'is-jubilee'
  return ''
}

const toggleSection = (label: string) => {
  if (openSection.value === label) {
    openSection.value = null
  } else {
    openSection.value = label
  }
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    openSection.value = null
  }
})

const formatLabel = (label: string) => {
  if (label.includes('TC Hardt')) {
    return label.replace('TC Hardt', 'TC&nbsp;Hardt')
  }
  return label
}
</script>

<template>
  <div
    class="mobile-menu"
    :class="{ 'is-open': isOpen }"
  >
    <div class="menu-inner">
      <div class="scroll-area">
        <div class="nav-items">
          <template v-for="item in headerMenu" :key="item.label">
            <!-- Normaler Link -->
            <NuxtLink
              v-if="!item.children || item.children.length === 0"
              :to="item.to"
              class="menu-link"
              :class="{ 'is-active': route.path === item.to }"
              @click="emit('close')"
            >
              <BaseIcon v-if="item.icon" :name="item.icon" class="item-icon" />
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span class="item-label break-word-hyphens" v-html="formatLabel(item.label)" />
            </NuxtLink>

            <!-- Kategorie mit Unterpunkten -->
            <div v-else class="group-section">
              <button
                type="button"
                class="menu-link is-trigger"
                :class="{ 'is-active': isItemActive(item) }"
                @click="toggleSection(item.label)"
              >
                <div class="trigger-left">
                  <BaseIcon v-if="item.icon" :name="item.icon" class="item-icon" />
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span class="item-label break-word-hyphens" v-html="formatLabel(item.label)" />
                </div>
                <BaseIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="chevron-icon"
                  :class="{ 'is-open': openSection === item.label }"
                />
              </button>

              <!-- Untermenü -->
              <div
                class="sub-grid"
                :class="{ 'is-open': openSection === item.label }"
              >
                <div class="sub-inner">
                  <div class="sub-list">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.label"
                      :to="child.to"
                      class="sub-link"
                      :class="getChildStateClass(child)"
                      @click="emit('close')"
                    >
                      <BaseIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="sub-icon"
                      />
                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <span class="sub-label break-word-hyphens" v-html="formatLabel(child.label)" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Fixierter Bereich für CTA-Buttons und Social Links -->
      <div class="footer-bar">
        <div class="cta-stack">
          <Button
            v-for="(btn, index) in navButtons.slice().reverse()"
            :key="index"
            :to="btn.to"
            :label="btn.label"
            :target="btn.target"
            :variant="(btn.variant as any) || 'outline'"
            block
            size="xl"
          />
        </div>

        <div class="meta-bar">
          <div class="meta-row">
            <div class="social-row">
              <template v-for="(social, index) in socialLinks" :key="index">
                <Button
                  v-if="social.icon"
                  :href="social.href"
                  target="_blank"
                  variant="ghost"
                  :icon="social.icon"
                  size="lg"
                />
              </template>
            </div>
            <template v-if="showAppearanceModeButton || showLanguageSwitch">
              <div class="divider" />
              <div class="social-row">
                <ColorModeButton
                  v-if="showAppearanceModeButton"
                  size="lg"
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

<style lang="scss" scoped>
.mobile-menu {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-in-out;

  &.is-open {
    grid-template-rows: 1fr;
  }

  @include up("lg") {
    display: none;
  }
}

.menu-inner {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100dvh - 120px);
}

.scroll-area {
  overflow-y: auto;
  flex: 1;
  padding-inline: 0.25rem;
}

.nav-items {
  padding-block: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.group-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-lg);
  border: 0;
  background: transparent;
  width: 100%;
  text-align: left;
  text-decoration: none;
  color: var(--color-brand-dark-800);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);

  @include dark {
    color: var(--color-brand-dark-100);
  }

  &.is-trigger {
    justify-content: space-between;
  }

  &:hover:not(.is-active) {
    background-color: var(--color-gray-50);

    @include dark {
      background-color: var(--color-gray-800);
    }
  }

  &.is-active {
    background-color: var(--color-brand-dark-50);
    color: var(--color-brand-dark-600);

    @include dark {
      background-color: rgb(26 40 82 / 0.2);
      color: var(--color-brand-dark-400);
    }
  }
}

.trigger-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.item-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.item-label {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
}

.chevron-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 300ms ease;

  &.is-open {
    transform: rotate(90deg);
  }
}

.sub-grid {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-in-out;

  &.is-open {
    grid-template-rows: 1fr;
  }
}

.sub-inner {
  overflow: hidden;
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-block: 0.5rem;
  margin-left: var(--space-4);
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-gray-100);

  @include dark {
    border-left-color: var(--color-gray-800);
  }
}

.sub-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-brand-dark-800);
  transition: background-color var(--transition-fast), color var(--transition-fast);

  @include dark {
    color: var(--color-gray-200);
  }

  .sub-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--color-gray-400);
  }

  &:hover:not(.is-active):not(.is-jubilee) {
    background-color: var(--color-gray-50);

    @include dark {
      background-color: var(--color-gray-800);
    }
  }

  &.is-active {
    background-color: var(--color-brand-dark-50);
    color: var(--color-brand-dark-600);

    .sub-icon {
      color: var(--color-brand-dark-500);
    }

    @include dark {
      background-color: rgb(26 40 82 / 0.2);
      color: var(--color-brand-dark-400);
    }
  }

  &.is-jubilee {
    color: var(--color-accent-600);

    .sub-icon {
      color: var(--color-accent-500);
    }

    &:hover {
      background-color: var(--color-accent-50);
    }
  }
}

.sub-label {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
}

.footer-bar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-block: var(--space-4);
  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray-100);

  @include dark {
    background-color: var(--color-gray-900);
    border-top-color: var(--color-gray-800);
  }
}

.cta-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  @include up("sm") {
    display: none;
  }
}

.meta-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.social-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.divider {
  height: 1.5rem;
  width: 1px;
  background-color: var(--color-gray-200);

  @include dark {
    background-color: var(--color-gray-700);
  }
}
</style>
