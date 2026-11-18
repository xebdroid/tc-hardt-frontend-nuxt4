<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import MemorialPlaque from '~/components/memorial/MemorialPlaque.vue'

interface Props {
  portraitSrc?: string
  name?: string
}

withDefaults(defineProps<Props>(), {
  portraitSrc: '/img/memorial/reinhard.jpg',
  name: 'Reinhard'
})
</script>

<template>
  <div class="memorial-section">
    <Section
      variant="secondary-light"
      rounded
      padding-top="lg"
      padding-bottom="lg"
      class="section-box"
    >
      <Headline
        alignment="center"
        title="In stillem Gedenken an unseren Freund Reinhard"
        title-class="memorial-headline-title"
        description="Ein treuer Wegbegleiter, Tennisfreund und geschätzter Teil unserer Vereinsfamilie."
        margin-bottom="md"
      />

      <div class="content-row">
        <div class="plaque-col">
          <MemorialPlaque />
        </div>

        <div class="portrait-col">
          <div class="portrait-card">
            <div class="portrait-media">
              <NuxtImg
                :src="portraitSrc"
                :alt="name"
                width="480"
                height="600"
                fit="cover"
                format="webp"
                quality="80"
                densities="1x"
                class="portrait-img"
                loading="lazy"
                decoding="async"
              />
              <div class="portrait-shade" />
            </div>

            <div class="portrait-caption">
              <p class="caption-text">
                In lieber Erinnerung an {{ name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.memorial-section {
  margin-block: var(--space-8);

  @include up("sm") {
    margin-block: 3.5rem;
  }

  @include up("lg") {
    margin-block: var(--space-20);
  }
}

.section-box {
  position: relative;
  z-index: 10;
}

:deep(.memorial-headline-title) {
  font-size: 1.5rem;
  line-height: 2rem;
  color: var(--color-brand-dark-900);

  @include up("sm") {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  @include up("lg") {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}

.content-row {
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: var(--space-8);
  max-width: 64rem;
  margin-inline: auto;

  @include up("lg") {
    flex-direction: row;
    gap: var(--space-10);
  }
}

.plaque-col {
  width: 100%;
  display: flex;
  flex-direction: column;

  @include up("lg") {
    width: 58.333333%;
  }
}

.portrait-col {
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  margin-inline: auto;

  @include up("sm") {
    width: auto;
  }

  @include up("lg") {
    width: 41.666667%;
    margin-inline: 0;
  }
}

.portrait-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.625rem;
  border-radius: var(--radius-xl);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgb(155 213 239 / 0.7);
  transition: transform 300ms ease;

  @include up("sm") {
    padding: 0.875rem;
  }

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    transform: scale(1.01);
  }
}

.portrait-media {
  overflow: hidden;
  border-radius: var(--radius-lg);
  flex: 1;
  position: relative;
  background-color: var(--color-gray-100);
  min-height: 260px;

  @include up("sm") {
    min-height: 300px;
  }

  @include dark {
    background-color: var(--color-gray-900);
  }
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  position: absolute;
  inset: 0;
}

.portrait-shade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rem;
  background-image: linear-gradient(to top, rgb(0 0 0 / 0.4), transparent);
  pointer-events: none;
}

.portrait-caption {
  padding-top: var(--space-3);
  padding-bottom: 0.25rem;
  text-align: center;
}

.caption-text {
  margin: 0;
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--color-brand-dark-900);
  font-weight: 500;

  @include up("sm") {
    font-size: 1.125rem;
  }

  @include dark {
    color: var(--color-white);
  }
}
</style>
