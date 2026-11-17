<script setup lang="ts">
interface Props {
  modelValue?: boolean
  defaultValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultValue: false,
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const internalValue = ref(props.defaultValue)

const isChecked = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value
)

function toggle() {
  if (props.disabled) return
  const next = !isChecked.value
  internalValue.value = next
  emit('update:modelValue', next)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isChecked"
    :aria-label="ariaLabel"
    :disabled="disabled"
    class="base-switch"
    :class="[
      `size-${size}`,
      {
        'is-checked': isChecked,
        'is-disabled': disabled
      }
    ]"
    @click="toggle"
  >
    <span class="thumb" />
  </button>
</template>

<style lang="scss" scoped>
.base-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  border: 2px solid transparent;
  background-color: var(--color-gray-200);
  padding: 0;
  cursor: pointer;
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  @include dark {
    background-color: var(--color-gray-700);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-dark-600);
    outline-offset: 2px;
  }

  &.is-checked {
    background-color: var(--color-brand-dark-600);

    @include dark {
      background-color: var(--color-brand-dark-400);
    }
  }

  &.is-disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  /* Sizes (1:1 Nuxt UI v4 USwitch) */
  &.size-sm {
    width: 2rem; /* w-8 */
    height: 1.125rem;
    .thumb {
      width: 0.875rem;
      height: 0.875rem;
    }
    &.is-checked .thumb {
      transform: translateX(0.875rem);
    }
  }

  &.size-md {
    width: 2.25rem; /* w-9 */
    height: 1.25rem;
    .thumb {
      width: 1rem;
      height: 1rem;
    }
    &.is-checked .thumb {
      transform: translateX(1rem);
    }
  }

  &.size-lg {
    width: 2.5rem; /* w-10 */
    height: 1.375rem;
    .thumb {
      width: 1.125rem;
      height: 1.125rem;
    }
    &.is-checked .thumb {
      transform: translateX(1.125rem);
    }
  }
}

.thumb {
  pointer-events: none;
  display: block;
  border-radius: var(--radius-full);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-lg);
  transform: translateX(0);
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
