<script setup lang="ts">
export interface RadioOption {
  value: string
  label: string
}

interface Props {
  modelValue?: string
  items: RadioOption[]
  name?: string
}

const fallbackId = useId()

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  name: undefined
})

const groupName = computed(() => props.name || `radio-${fallbackId}`)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="base-radio-group" role="radiogroup">
    <label
      v-for="item in items"
      :key="item.value"
      class="radio-item"
    >
      <input
        type="radio"
        :name="groupName"
        :value="item.value"
        :checked="modelValue === item.value"
        class="radio-input"
        @change="emit('update:modelValue', item.value)"
      >
      <span class="radio-indicator" />
      <span class="radio-label">{{ item.label }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.base-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-indicator {
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-gray-300);
  background-color: var(--color-pure-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);

  &::after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--radius-full);
    background-color: var(--color-pure-white);
    transform: scale(0);
    transition: transform var(--transition-fast);
  }

  .radio-input:checked + & {
    background-color: var(--color-brand-dark-800);
    border-color: var(--color-brand-dark-800);

    &::after {
      transform: scale(1);
    }
  }

  .radio-input:focus-visible + & {
    outline: 2px solid var(--color-brand-dark-800);
    outline-offset: 2px;
  }
}

.radio-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--color-gray-700);

  @include dark {
    color: var(--color-gray-200);
  }
}
</style>
