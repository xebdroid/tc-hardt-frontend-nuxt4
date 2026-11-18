<script setup lang="ts">
import Hero from '~/components/sections/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'

interface Props {
  title: string
  description?: string
  badge?: string
  backTo?: string
  backLabel?: string
  marginBottom?: 'none' | 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  badge: undefined,
  backTo: undefined,
  backLabel: 'Zurück zur Übersicht',
  marginBottom: undefined
})
</script>

<template>
  <Hero height="small" class="page-hero">
    <template #content>
      <div class="hero-inner">
        <Headline
          :title="title"
          :description="description"
          tag="h1"
          size="h1"
          mode="light"
          alignment="center"
          :margin-bottom="marginBottom ?? (backTo || badge ? 'none' : 'sm')"
        />

        <div v-if="badge" class="hero-badge">
          {{ badge }}
        </div>

        <Button
          v-if="backTo"
          :to="backTo"
          variant="ghost-white"
          :label="backLabel"
          icon="i-heroicons-arrow-left"
        />

        <slot />
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  z-index: 10;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
}

.hero-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  background-color: rgb(255 255 255 / 0.1);
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-gray-200);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(255 255 255 / 0.1);
}
</style>
