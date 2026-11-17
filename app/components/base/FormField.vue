<script setup lang="ts">
interface Props {
  label?: string
  name?: string
  required?: boolean
  error?: string
  hint?: string
}

defineProps<Props>()
</script>

<template>
  <div class="base-form-field">
    <div v-if="label || hint" class="label-row">
      <label v-if="label" :for="name" class="label" :class="{ 'is-required': required }">
        {{ label }}
      </label>
      <span v-if="hint" class="hint">{{ hint }}</span>
    </div>

    <div class="control">
      <slot />
    </div>

    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.base-form-field {
  display: flex;
  flex-direction: column;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.375rem;
}

.label {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--color-gray-700);

  @include dark {
    color: var(--color-gray-200);
  }

  &.is-required::after {
    content: "*";
    margin-left: 0.125rem;
    color: var(--color-error-500);
  }
}

.hint {
  font-size: 0.75rem;
  color: var(--color-gray-400);
}

.error {
  margin: 0.375rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--color-error-500);
}
</style>
