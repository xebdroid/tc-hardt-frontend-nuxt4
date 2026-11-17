<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  icon?: string
  size?: 'md' | 'lg'
  disabled?: boolean
  id?: string
  name?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-input" :class="[`size-${size}`, { 'has-icon': Boolean(icon) }]">
    <span v-if="icon" class="leading">
      <BaseIcon :name="icon" class="leading-icon" />
    </span>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input-el"
      @input="onInput"
    >
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.leading {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  pointer-events: none;
  color: var(--color-gray-400);
}

.leading-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.input-el {
  width: 100%;
  border-radius: var(--radius-sm);
  border: 0;
  background-color: var(--color-pure-white);
  color: var(--color-gray-900);
  box-shadow: inset 0 0 0 1px var(--color-gray-300);
  font-family: var(--font-sans);
  transition: box-shadow var(--transition-fast);

  @include dark {
    background-color: var(--color-gray-900);
    color: var(--color-white);
    box-shadow: inset 0 0 0 1px var(--color-gray-700);
  }

  &::placeholder {
    color: var(--color-gray-400);
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--color-brand-dark-800);

    @include dark {
      box-shadow: inset 0 0 0 2px var(--color-brand-light-400);
    }
  }

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .size-md & {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.375rem 0.625rem;
  }

  .size-lg & {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 0.75rem;
  }

  .has-icon.size-md & {
    padding-left: 2.25rem;
  }

  .has-icon.size-lg & {
    padding-left: 2.5rem;
  }
}
</style>
