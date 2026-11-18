<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Image from '~/components/base/Image.vue'
import Button from '~/components/base/Button.vue'

interface Props {
  title: string
  tagline?: string
  description: string
  name: string
  role: string
  imageSrc: string
  imageAlt?: string
  email?: string
  emailLabel?: string
  phone?: string
  phoneLabel?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Ihr Ansprechpartner',
  imageAlt: undefined,
  email: undefined,
  emailLabel: 'E-Mail senden',
  phone: undefined,
  phoneLabel: undefined
})

const emit = defineEmits<{
  (e: 'contact', method: 'email' | 'phone'): void
}>()
</script>

<template>
  <Section
    variant="secondary-light"
    padding-top="md"
    padding-bottom="xl"
    overlap-bottom
    rounded="top"
    outer-container
  >
    <div class="contact-person-section">
      <div class="portrait-col">
        <Image
          :src="imageSrc"
          :alt="imageAlt || name"
          variant="portrait"
        />
      </div>

      <div class="body-col">
        <Headline
          :title="title"
          :tagline="tagline"
          mode="dark"
          :use-container="false"
          alignment="none"
          class="headline-responsive"
          margin-bottom="sm"
        />

        <p class="desc-text">
          {{ description }}
        </p>

        <div class="person-meta">
          <p class="person-name">{{ name }}</p>
          <p class="person-role">{{ role }}</p>
        </div>

        <div class="actions-row">
          <Button
            v-if="email"
            :to="`mailto:${email}`"
            variant="primary"
            icon="i-heroicons-envelope"
            :label="emailLabel"
            @click="emit('contact', 'email')"
          />
          <Button
            v-if="phone"
            :to="`tel:${phone}`"
            variant="outline"
            icon="i-heroicons-phone"
            :label="phoneLabel || phone"
            @click="emit('contact', 'phone')"
          />
        </div>
      </div>
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.contact-person-section {
  display: grid;
  gap: var(--space-12);
  align-items: center;

  @include up('md') {
    grid-template-columns: auto 1fr;
    gap: 0;
  }
}

.portrait-col {
  display: flex;
  justify-content: center;

  @include up('md') {
    padding-inline: var(--space-24);
  }
}

.body-col {
  text-align: center;

  @include up('md') {
    text-align: left;
  }
}

.headline-responsive {
  align-items: center;
  text-align: center;
  margin-inline: auto;

  @include up('md') {
    align-items: flex-start;
    text-align: left;
    margin-inline: 0;
  }
}

.desc-text {
  margin: 0 auto var(--space-8);
  color: var(--color-gray-600);
  font-size: 1.125rem;
  line-height: 1.625;
  max-width: 42rem;

  @include up('md') {
    margin-inline: 0;
  }
}

.person-meta {
  margin-bottom: var(--space-10);
  color: var(--color-brand-dark-900);
}

.person-name {
  margin: 0 0 var(--space-1);
  font-weight: 900;
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.person-role {
  margin: 0;
  color: var(--color-brand-light-600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
}

.actions-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);

  @include up('md') {
    justify-content: flex-start;
  }
}
</style>
