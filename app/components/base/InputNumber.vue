<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  size?: 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  min: undefined,
  max: undefined,
  step: 1,
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function clamp(val: number) {
  let res = val
  if (props.min !== undefined && res < props.min) res = props.min
  if (props.max !== undefined && res > props.max) res = props.max
  return res
}

function decrement() {
  if (props.disabled) return
  const current = Number(props.modelValue ?? props.min ?? 0)
  emit('update:modelValue', clamp(current - props.step))
}

function increment() {
  if (props.disabled) return
  const current = Number(props.modelValue ?? props.min ?? 0)
  emit('update:modelValue', clamp(current + props.step))
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const parsed = Number(target.value)
  if (!Number.isNaN(parsed)) {
    emit('update:modelValue', clamp(parsed))
  }
}
</script>

<template>
  <div class="base-input-number" :class="`size-${size}`">
    <button
      type="button"
      class="step-btn is-left"
      :disabled="disabled || (min !== undefined && (modelValue ?? 0) <= min)"
      aria-label="Verringern"
      @click="decrement"
    >
      <BaseIcon name="i-heroicons-minus" class="step-icon" />
    </button>

    <input
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      class="number-el"
      @input="onInput"
    >

    <button
      type="button"
      class="step-btn is-right"
      :disabled="disabled || (max !== undefined && (modelValue ?? 0) >= max)"
      aria-label="Erhöhen"
      @click="increment"
    >
      <BaseIcon name="i-heroicons-plus" class="step-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.base-input-number {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.number-el {
  width: 100%;
  border-radius: var(--radius-sm);
  border: 0;
  background-color: var(--color-pure-white);
  color: var(--color-gray-900);
  box-shadow: inset 0 0 0 1px var(--color-gray-300);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.5rem 2.5rem;
  text-align: center;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @include dark {
    background-color: var(--color-gray-900);
    color: var(--color-white);
    box-shadow: inset 0 0 0 1px var(--color-gray-700);
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--color-brand-dark-800);
  }
}

.step-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  border: 0;
  background: transparent;
  color: var(--color-gray-500);
  cursor: pointer;

  &.is-left { left: 0; }
  &.is-right { right: 0; }

  &:hover:not(:disabled) {
    color: var(--color-gray-900);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.step-icon {
  width: 1rem;
  height: 1rem;
}
</style>
