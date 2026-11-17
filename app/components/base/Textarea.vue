<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  rows?: number
  size?: 'md' | 'lg'
  disabled?: boolean
  id?: string
  name?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 4,
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-textarea" :class="`size-${size}`">
    <textarea
      :id="id"
      :name="name"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      class="textarea-el"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.base-textarea {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.textarea-el {
  width: 100%;
  border-radius: var(--radius-sm);
  border: 0;
  background-color: var(--color-pure-white);
  color: var(--color-gray-900);
  box-shadow: inset 0 0 0 1px var(--color-gray-300);
  font-family: var(--font-sans);
  resize: vertical;
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
}
</style>
