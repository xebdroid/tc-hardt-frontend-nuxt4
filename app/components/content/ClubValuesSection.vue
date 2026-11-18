<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

export interface ClubValueItem {
  icon: string
  title: string
  description: string
}

interface Props {
  values: ClubValueItem[]
  imageSrc?: string
  imageAlt?: string
}

withDefaults(defineProps<Props>(), {
  imageSrc: '/img/home/unsere-werte.jpg',
  imageAlt: 'Tennis Community TC Hardt'
})
</script>

<template>
  <div class="club-values-section">
    <div class="values-media">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="values-img"
      >
    </div>
    <div class="values-col">
      <div class="values-grid">
        <div
          v-for="(val, i) in values"
          :key="i"
          class="value-card"
        >
          <div class="value-icon-wrap">
            <BaseIcon :name="val.icon" class="value-icon" />
          </div>
          <div>
            <h4 class="value-title">
              {{ val.title }}
            </h4>
            <p class="value-desc">
              {{ val.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.club-values-section {
  margin-top: var(--space-10);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-12);

  @include up("lg") {
    flex-direction: row;
    gap: var(--space-24);
  }
}

.values-media,
.values-col {
  width: 100%;

  @include up("lg") {
    width: 50%;
  }
}

.values-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 4px solid var(--color-white);

  @include dark {
    border-color: var(--color-gray-800);
  }
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  height: 100%;

  @include up("sm") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
  transition: border-color var(--transition-fast);

  @include dark {
    background-color: rgb(30 41 59 / 0.5);
    border-color: var(--color-gray-700);
  }

  &:hover {
    border-color: var(--color-brand-light-200);
  }
}

.value-icon-wrap {
  flex-shrink: 0;
}

.value-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-highlight-500);
}

.value-title {
  margin: 0;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  font-size: 1.125rem;

  @include dark {
    color: var(--color-white);
  }
}

.value-desc {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  color: var(--color-gray-600);
  line-height: 1.375;

  @include dark {
    color: var(--color-gray-400);
  }
}
</style>
