<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()
</script>

<template>
  <Teleport to="body">
    <div v-if="toasts.length > 0" class="toast-viewport" aria-live="polite">
      <TransitionGroup name="toast-slide">
        <div
          v-for="item in toasts"
          :key="item.id"
          class="toast-card"
          :class="`color-${item.color || 'primary'}`"
          role="status"
        >
          <div class="toast-content">
            <strong class="toast-title">{{ item.title }}</strong>
            <p v-if="item.description" class="toast-desc">
              {{ item.description }}
            </p>
          </div>
          <button
            type="button"
            class="close-btn"
            aria-label="Schließen"
            @click="remove(item.id)"
          >
            <BaseIcon name="i-heroicons-x-mark" class="close-icon" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.toast-viewport {
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-4);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 24rem;
  width: calc(100vw - 2rem);
}

.toast-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-pure-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-200);
  border-left-width: 4px;

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-800);
  }

  &.color-primary {
    border-left-color: var(--color-brand-dark-800);
  }

  &.color-success {
    border-left-color: var(--color-success-500);
  }

  &.color-warning {
    border-left-color: var(--color-warning-500);
  }

  &.color-error {
    border-left-color: var(--color-error-500);
  }
}

.toast-content {
  min-width: 0;
  flex: 1;
}

.toast-title {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}

.toast-desc {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-300);
  }
}

.close-btn {
  display: inline-flex;
  padding: 0.25rem;
  border: 0;
  background: transparent;
  color: var(--color-gray-400);
  cursor: pointer;
  border-radius: var(--radius-xs);

  &:hover {
    color: var(--color-gray-600);
  }
}

.close-icon {
  width: 1rem;
  height: 1rem;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
