<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  modelValue?: string
  items: SelectOption[]
  placeholder?: string
  size?: 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: 'Bitte wählen...',
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-select" :class="`size-${size}`">
    <select
      :value="modelValue ?? ''"
      :disabled="disabled"
      class="select-el"
      :class="{ 'is-placeholder': !modelValue }"
      @change="onChange"
    >
      <option value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <span class="trailing">
      <BaseIcon name="i-heroicons-chevron-down" class="chevron-icon" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.base-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.select-el {
  width: 100%;
  appearance: none;
  border-radius: var(--radius-sm);
  border: 0;
  background-color: var(--color-pure-white);
  color: var(--color-gray-900);
  box-shadow: inset 0 0 0 1px var(--color-gray-300);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  cursor: pointer;
  transition: box-shadow var(--transition-fast);

  @include dark {
    background-color: var(--color-gray-900);
    color: var(--color-white);
    box-shadow: inset 0 0 0 1px var(--color-gray-700);
  }

  &.is-placeholder {
    color: var(--color-gray-400);
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--color-brand-dark-800);
  }
}

.trailing {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  pointer-events: none;
  color: var(--color-gray-400);
}

.chevron-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
