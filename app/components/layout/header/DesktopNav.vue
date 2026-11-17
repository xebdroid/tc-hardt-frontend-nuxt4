<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'
import type { CustomNavigationMenuItem } from '~/composables/useNavigation'

defineProps<{
  items: CustomNavigationMenuItem[]
}>()

const route = useRoute()
const openLabel = ref<string | null>(null)
let closeTimer: ReturnType<typeof setTimeout> | null = null

function cancelClose() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function openItem(label: string) {
  cancelClose()
  openLabel.value = label
}

function scheduleClose() {
  cancelClose()
  closeTimer = setTimeout(() => {
    openLabel.value = null
  }, 120)
}

function toggleItem(label: string) {
  if (openLabel.value === label) {
    openLabel.value = null
  } else {
    openLabel.value = label
  }
}

function closeAll() {
  cancelClose()
  openLabel.value = null
}

function isItemActive(item: CustomNavigationMenuItem) {
  if (item.to && route.path === item.to) return true
  if (item.children) {
    return item.children.some(child => child.to && route.path === child.to)
  }
  return false
}

watch(() => route.fullPath, closeAll)
</script>

<template>
  <nav class="desktop-nav" aria-label="Hauptnavigation">
    <ul class="nav-list">
      <li
        v-for="item in items"
        :key="item.label"
        class="nav-item"
        @mouseenter="item.children?.length ? openItem(item.label) : undefined"
        @mouseleave="item.children?.length ? scheduleClose() : undefined"
      >
        <!-- Einfacher Link ohne Unterpunkte -->
        <NuxtLink
          v-if="!item.children || item.children.length === 0"
          :to="item.to"
          class="nav-link"
          :class="{ 'is-active': isItemActive(item) }"
          :aria-label="item.isHome ? item.label : undefined"
        >
          <BaseIcon
            v-if="item.icon && !item.noDesktopIcon"
            :name="item.icon"
            class="nav-icon"
          />
          <span v-if="!item.isHome" class="nav-label">{{ item.label }}</span>
        </NuxtLink>

        <!-- Punkt mit Dropdown-Untermenü -->
        <template v-else>
          <button
            type="button"
            class="nav-link"
            :class="{
              'is-active': isItemActive(item),
              'is-open': openLabel === item.label
            }"
            :aria-expanded="openLabel === item.label"
            @click="toggleItem(item.label)"
          >
            <BaseIcon
              v-if="item.icon && !item.noDesktopIcon"
              :name="item.icon"
              class="nav-icon"
            />
            <span v-if="!item.isHome" class="nav-label">{{ item.label }}</span>
            <BaseIcon
              name="i-heroicons-chevron-down-20-solid"
              class="chevron-icon"
              :class="{ 'is-open': openLabel === item.label }"
            />
          </button>

          <Transition name="dropdown-fade">
            <div
              v-if="openLabel === item.label"
              class="dropdown-bridge"
              @mouseenter="cancelClose"
              @mouseleave="scheduleClose"
            >
              <div class="dropdown-panel">
                <ul class="child-list">
                  <li
                    v-for="child in item.children"
                    :key="child.label"
                    class="child-item"
                  >
                    <NuxtLink
                      :to="child.to"
                      class="child-link"
                      :class="{ 'is-active': route.path === child.to }"
                      @click="closeAll"
                    >
                      <BaseIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="child-icon"
                      />
                      <div class="child-text">
                        <span class="child-label">{{ child.label }}</span>
                        <p v-if="child.description" class="child-desc">
                          {{ child.description }}
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </template>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.desktop-nav {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
  padding-block: 0.5rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5625rem;
  margin-inline: 1px;
  border-radius: var(--radius-sm);
  border: 0;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--color-brand-dark-800);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--transition-fast), background-color var(--transition-fast);

  @include dark {
    color: var(--color-brand-dark-100);
  }

  &.is-active {
    background-color: var(--color-gray-100);

    @include dark {
      background-color: var(--color-gray-800);
    }
  }

  &:hover,
  &.is-open {
    color: var(--color-brand-dark-500);

    &:not(.is-active) {
      background-color: rgb(241 245 249 / 0.5);
    }

    @include dark {
      color: var(--color-brand-light-400);

      &:not(.is-active) {
        background-color: rgb(30 41 59 / 0.5);
      }
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-dark-600);
    outline-offset: 2px;
  }
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
  flex-shrink: 0;
  transition: transform 200ms ease, color var(--transition-fast);

  &.is-open {
    transform: rotate(180deg);
  }
}

.dropdown-bridge {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 0.25rem;
  z-index: var(--z-header);
}

.dropdown-panel {
  min-width: max-content;
  background-color: var(--color-pure-white);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
  padding: 0.5rem;

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-800);
  }
}

.child-list {
  display: grid;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.child-link {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  white-space: nowrap;
  color: var(--color-brand-dark-800);
  transition: background-color var(--transition-fast), color var(--transition-fast);

  @include dark {
    color: var(--color-brand-dark-100);
  }

  &:hover,
  &.is-active {
    background-color: rgb(241 245 249 / 0.7);
    color: var(--color-brand-dark-500);

    @include dark {
      background-color: var(--color-gray-800);
      color: var(--color-brand-light-400);
    }
  }
}

.child-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
  color: var(--color-gray-400);
  transition: color var(--transition-fast);

  .child-link:hover &,
  .child-link.is-active & {
    color: currentColor;
  }
}

.child-text {
  min-width: 0;
}

.child-label {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
}

.child-desc {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--color-gray-500);

  @include dark {
    color: var(--color-gray-400);
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
  transform-origin: top center;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
