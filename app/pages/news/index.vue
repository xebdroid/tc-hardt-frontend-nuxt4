<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import NewsList from '~/components/news/NewsList.vue'
import Headline from '~/components/base/Headline.vue'
import Hero from '~/components/base/Hero.vue'

useHead({ title: 'Aktuelles | TC Hardt' })
</script>

<template>
  <div>

    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Aktuelles"
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'none'"
        />
      </template>
    </Hero>

    <Section
      variant="secondary-light"
      margin-top="sm"
      margin-bottom="md"
      :padding-top="{ base: 'xs', sm:'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', sm:'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      :outer-container="{ base: false, md: true}"
      rounded
    >
      <NewsList />
    </Section>
  </div>
</template>
