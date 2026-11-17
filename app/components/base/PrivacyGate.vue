<script setup lang="ts">
import AppButton from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

const store = useConsentStore()

defineProps<{
  title?: string
  description?: string
  icon?: string
}>()
</script>

<template>
  <div class="privacy-gate">
    <ClientOnly>
      <slot v-if="store.isMapsAllowed" />

      <div v-else class="gate-box">
        <div class="gate-content">
          <BaseIcon :name="icon || 'i-heroicons-lock-closed'" class="gate-icon" />

          <h3 class="gate-title">
            {{ title || 'Inhalt blockiert' }}
          </h3>

          <p class="gate-desc">
            {{ description || 'Um diesen Inhalt zu sehen, musst du dem Laden von Google Maps zustimmen.' }}
          </p>

          <div class="gate-actions">
            <AppButton
              label="Inhalt laden"
              variant="primary"
              icon="i-heroicons-check"
              @click="store.acceptAll"
            />
            <AppButton
              variant="ghost"
              label="Einstellungen"
              size="xs"
              class="settings-btn"
              @click="store.openModal"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.privacy-gate {
  width: 100%;
  height: 100%;
  position: relative;
}

.gate-box {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  text-align: center;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-gray-200);

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.gate-content {
  position: relative;
  z-index: 10;
  max-width: 28rem;
}

.gate-icon {
  width: 3rem;
  height: 3rem;
  color: var(--color-gray-400);
  margin: 0 auto var(--space-4);
  display: block;
}

.gate-title {
  margin: 0 0 var(--space-2);
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.gate-desc {
  margin: 0 0 var(--space-6);
  font-size: 0.875rem;
  line-height: 1.625;
  color: var(--color-gray-500);

  @include dark {
    color: var(--color-gray-400);
  }
}

.gate-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  justify-content: center;

  @include up("sm") {
    flex-direction: row;
  }
}

.settings-btn {
  margin-top: var(--space-2);

  @include up("sm") {
    margin-top: 0;
  }
}
</style>
