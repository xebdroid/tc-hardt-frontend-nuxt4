<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button, { type ButtonVariant, type ButtonSize } from '~/components/base/Button.vue'
import type { SpacingSize, RoundedSide } from '~/types'

export type SectionVariant =
  | 'default'
  | 'gray' | 'gray-light'
  | 'primary' | 'primary-light'
  | 'secondary' | 'secondary-light'
  | 'highlight' | 'highlight-light'
  | 'accent' | 'accent-light'

export interface CtaAction {
  label: string
  to: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  trailingIcon?: string
  target?: string
}

interface Props {
  title: string
  tagline?: string
  description?: string
  titleTag?: 'h2' | 'h3'
  titleSize?: 'h2' | 'h3'
  variant?: SectionVariant
  paddingTop?: SpacingSize
  paddingBottom?: SpacingSize
  marginBottom?: SpacingSize
  overlapTop?: boolean
  overlapBottom?: boolean
  rounded?: RoundedSide
  outerContainer?: boolean
  actions?: CtaAction[]
}

withDefaults(defineProps<Props>(), {
  tagline: undefined,
  description: undefined,
  titleTag: 'h2',
  titleSize: 'h2',
  variant: 'secondary-light',
  paddingTop: 'md',
  paddingBottom: 'xl',
  marginBottom: undefined,
  overlapTop: false,
  overlapBottom: true,
  rounded: 'top',
  outerContainer: true,
  actions: () => []
})
</script>

<template>
  <Section
    :variant="variant"
    :padding-top="paddingTop"
    :padding-bottom="paddingBottom"
    :margin-bottom="marginBottom"
    :overlap-top="overlapTop"
    :overlap-bottom="overlapBottom"
    :rounded="rounded"
    :outer-container="outerContainer"
    class="base-cta-section"
  >
    <div class="cta-inner">
      <Headline
        :title="title"
        :tagline="tagline"
        :tag="titleTag"
        :size="titleSize"
        alignment="center"
        margin-bottom="none"
      />

      <p v-if="description" class="cta-desc">
        {{ description }}
      </p>

      <div v-if="actions.length > 0 || $slots.default" class="cta-actions">
        <Button
          v-for="(action, idx) in actions"
          :key="idx"
          v-bind="action"
        />
        <slot />
      </div>
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.base-cta-section {
  text-align: center;
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-inline: auto;
}

.cta-desc {
  color: var(--color-gray-700);
  margin: var(--space-4) auto 0;
  max-width: 42rem;
  line-height: 1.625;

  @include dark {
    color: var(--color-gray-300);
  }
}

.cta-actions {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}
</style>
