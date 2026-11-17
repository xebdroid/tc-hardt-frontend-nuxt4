<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const flagIcons: Record<string, string> = {
  de: 'i-circle-flags-de',
  en: 'i-circle-flags-gb'
}

const items = computed(() =>
  locales.value.map(l => ({
    code: l.code,
    label: l.name,
    icon: flagIcons[l.code] || 'i-circle-flags-de',
    to: switchLocalePath(l.code),
    disabled: locale.value === l.code
  }))
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="language-switcher">
    <Button
      variant="ghost"
      class="trigger"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <BaseIcon :name="flagIcons[locale] || 'i-circle-flags-de'" class="flag-icon" />
      <span class="code-label">
        {{ locale === 'de' ? 'DE' : 'EN' }}
      </span>
      <BaseIcon
        name="i-heroicons-chevron-down-20-solid"
        class="chevron-icon"
        :class="{ 'is-open': isOpen }"
      />
    </Button>

    <div v-if="isOpen" class="menu">
      <NuxtLink
        v-for="item in items"
        :key="item.code"
        :to="item.to"
        class="menu-item"
        :class="{ 'is-disabled': item.disabled }"
        @click="closeDropdown"
      >
        <BaseIcon :name="item.icon" class="flag-icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.trigger {
  font-weight: 700;
}

.flag-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.code-label {
  display: none;
  margin-left: 0.25rem;

  @include up("sm") {
    display: inline;
  }
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
  transition: transform var(--transition-fast);

  &.is-open {
    transform: rotate(180deg);
  }
}

.menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  min-width: 9rem;
  background-color: var(--color-pure-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
  padding: 0.25rem;
  z-index: var(--z-dropdown);

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-800);
  }
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-brand-dark-800);
  text-decoration: none;
  transition: background-color var(--transition-fast);

  @include dark {
    color: var(--color-gray-200);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--color-gray-100);

    @include dark {
      background-color: var(--color-gray-800);
    }
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
