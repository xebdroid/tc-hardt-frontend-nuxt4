<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import Section from '~/components/base/Section.vue'
import db from '~/assets/data/db.json'

const { footerLinks, socialLinks } = useNavigation()
const route = useRoute()

// Das aktuelle Jahr für das Copyright einmal berechnen
const currentYear = new Date().getFullYear()

// Computed Property prüft, ob das Meta-Feld "hideFooterCta" true ist.
// Standardmäßig ist es undefined (falsy), also wird der CTA angezeigt.
const showCta = computed(() => !route.meta.hideFooterCta)
</script>

<template>
  <footer class="mt-auto w-full isolate">
    <UContainer v-if="showCta">
      <Section
        variant="secondary"
        padding-top="sm"
        padding-bottom="sm"
        class="text-center z-10 relative -mb-18 lg:-mb-36"
        rounded
      >
        <div class="inline-flex p-4 rounded-full bg-white mb-6 shadow-sm">
          <UIcon name="i-heroicons-heart" class="w-10 h-10 text-highlight-600" />
        </div>

        <h2 class="text-3xl sm:text-5xl font-heading font-bold text-brand-dark-900 mb-6">
          {{ $t('home.cta_bottom.title') }}
        </h2>

        <p class="text-brand-dark-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {{ $t('home.cta_bottom.description') }}
        </p>

        <Button
          :to="$localePath('membership')"
          size="xl"
          variant="brand-dark"
          cta
          class="shadow-lg"
        >
          {{ $t('nav.buttons.membership') }}
        </Button>
      </Section>
    </UContainer>

    <div
      class="bg-brand-dark-900 text-white pb-12 rounded-t-3xl relative z-0 mt-0"
      :class="showCta ? 'pt-32 lg:pt-52' : 'pt-12 lg:pt-16'"
    >

      <div class="lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 lg:px-0">

        <div class="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 mb-12">

          <div class="flex items-center gap-4">
            <img
              src="/tc-hardt-logo.svg"
              alt="TC Hardt"
              class="h-16 w-auto"
            >
            <div class="flex flex-col leading-none gap-1">
              <span class="font-euro-extended font-bold text-3xl lg:text-2xl text-brand-dark-200">
                {{ $t('footer.logo.name') }}
              </span>
              <span class="font-euro-bold text-base lg:text-xs text-brand-dark-200">
                {{ $t('footer.logo.suffix') }}
              </span>
            </div>
          </div>

          <nav class="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4">
            <NuxtLink
              v-for="(link, index) in footerLinks"
              :key="index"
              :to="link.to"
              :target="link.target || '_self'"
              class="text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="w-full h-px bg-brand-dark-700 mb-8" />

        <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-6">

          <span class="text-sm text-gray-400">
            {{ $t('footer.copyright', { year: currentYear }) }}
          </span>

          <div class="flex items-center gap-6 md:gap-3">
            <Button
              v-for="(social, index) in socialLinks"
              :key="index"
              :to="social.href"
              target="_blank"
              variant="ghost"
              :icon="social.icon"
              size="lg"
              class="text-gray-300 hover:text-white hover:bg-brand-dark-700"
            />
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>
